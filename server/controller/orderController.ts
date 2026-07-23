import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { inngest } from "../inngest/index.js";
import Stripe from "stripe";

export const createOrder = async (req: Request, res: Response) => {
    const { items, shippingAddress, paymentMethod } = req.body

    // check if order items are empty
    if (!items || items.length === 0) return res.status(400).json({ message: "No order items" })

    // look up actual prices from the database

    const productIds = items.map((item: any) => item.product)
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } })
    const productMap: Record<string, (typeof products)[0]> = {} //this line means create a map like structure in which there is an key value pair present in map data structure, so in productMap object, store values in key,value pair in which type of key is string and type of value is products array of objects first object

    products.forEach((p: any) => (productMap[p.id] = p))

    // check if product is in stock
    for (const item of items) {
        const product = productMap[item.product]
        if (!product || (product.stock ?? 0) < item.quantity) { // this line means if product is not present or if there is not enough quantity product.stock ?? 0 means if product.stock is null or undefined then 0 < item.quantity will be checked or product.stock < item.quantity will be checked
            return res.status(404).json({ message: "Product out of stock" })
        }
    }

    const orderItems = items.map((item: any) => {
        const dbProduct = productMap[item.product]

        if (!dbProduct) throw new Error(`Product ${item.product} not found`);
        return {
            product: dbProduct.id,
            name: dbProduct.name,
            image: dbProduct.image,
            price: dbProduct.price,
            quantity: item.quantity,
            unit: dbProduct.unit,
        }
    })

    const subtotal = orderItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    const deliveryFee = subtotal > 20 ? 0 : 1.99
    const tax = Math.round(subtotal * 0.08)
    const total = Math.round((subtotal + deliveryFee + tax) * 100) / 100

    const order = await prisma.order.create({
        data: {
            userId: req.user!.id as string,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            subtotal,
            deliveryFee,
            tax,
            total,
            statusHistory: [{ status: "Placed", note: "Order Placed Successfully", timeStamp: new Date() }],
        }
    })
    
    if (paymentMethod === "card") {

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

        // create session
        const session = await stripe.checkout.sessions.create({
            success_url: `${req.headers.origin}/orders?clearCart=true`,
            cancel_url: `${req.headers.origin}/checkout`,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Payment Groceries"
                        }, 
                        unit_amount: Math.round(total * 100)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: {orderId: order.id}
        });
        
        return res.json({url: session.url})
    }

    res.json({ order })

    // decrease stock
    for (const item of orderItems) {
        await prisma.product.update({ where: { id: item.product }, data: { stock: { decrement: item.quantity } } })
    }

    for (const item of orderItems) {
        await inngest.send({ name: "inventory/stock.updated", data: { productId: item.id } })
    }

    await inngest.send({ name: "order/placed", data: { orderId: order.id } })
}

// get user's orders 
export const getUserOrders = async (req: Request, res: Response) => {
    const { status } = req.query

    const where: any = {
        userId: req.user!.id,
        NOT: [{ paymentMethod: "card", isPaid: false }]
    }

    if (status && status !== "All Orders") {
        where.status = status
    }

    const orders = await prisma.order.findMany({ where, include: { deliveryPartner: { select: { name: true, phone: true } } }, orderBy: { createdAt: "desc" } })

    res.status(201).json({ orders })
}

// get single order
export const getOrder = async (req: Request, res: Response) => {
    const id = req.params.id

    const order = await prisma.order.findFirst({ where: { id: id as string, userId: req.user!.id as string }, include: { deliveryPartner: { select: { name: true, phone: true, avatar: true, vehicleType: true } } } })

    if (!order) return res.status(404).json({ message: "Order not found" })

    res.json({ order })
}

// update Order status(admin)
export const updateOrderStatus = async (req: Request, res: Response) => {
    const { status, note } = req.body

    const order = await prisma.order.findUnique({ where: { id: req.params.id as string } })

    if (!order) return res.status(404).json({ message: "Order not found" })

    const history = (Array.isArray(order.statusHistory) ? order.statusHistory : []) as any[];

    history.push({ status, note: note || `Order ${status.toLowerCase()}`, timeStamp: new Date() })

    const updatedOrder = await prisma.order.update({ where: { id: req.params.id as string }, data: { status, statusHistory: history } })

    res.json({ order: updatedOrder })
}

// get all orders for admin
export const getAllOrders = async (req: Request, res: Response) => {
    const allOrders = await prisma.order.findMany({
        where: { NOT: [{ paymentMethod: "card", isPaid: false }] }, include: {
            user: { select: { name: true, email: true } },
            deliveryPartner: { select: { avatar: true, name: true, vehicleType: true, phone: true } }
        }, orderBy: { createdAt: "desc" }
    })

    res.json({ orders: allOrders })
}

// get order location 
export const getOrderLocation = async (req: Request, res: Response) => {
    const order = await prisma.order.findFirst({ where: { id: req.params.id as string, userId: req.user!.id as string }, select: { liveLocation: true, status: true } })

    if (!order) return res.status(404).json({ message: "order not found" })
    res.json({ liveLocation: order.liveLocation, status: order.status })

}
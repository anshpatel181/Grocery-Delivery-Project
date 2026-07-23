import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt"


// Get dashboard data
export const getAdminStats = async (req: Request, res: Response) => {

    const [totalOrders, totalUsers, totalProducts, outOfStock, totalParteners, recentOrders] = await Promise.all([
        prisma.order.count({ where: { NOT: { paymentMethod: "card", isPaid: false } } }),
        prisma.user.count(),
        prisma.product.count(),
        prisma.product.count({ where: { stock: 0 } }),
        prisma.deliveryPartner.count(),
        prisma.order.findMany({ where: { NOT: { paymentMethod: "card", isPaid: false } }, orderBy: { createdAt: "desc" }, take: 8, include: { user: { select: { name: true, email: true } }, deliveryPartner: { select: { name: true, phone: true } } } })
    ])

    res.json({ totalOrders, totalUsers, totalProducts, outOfStock, totalParteners, recentOrders })
}

// get deliverypartners list
export const getPartners = async (req: Request, res: Response) => {
    const deliveryPartners = await prisma.deliveryPartner.findMany({ orderBy: { createdAt: "desc" } })

    res.json({ deliveryPartners })
}

// create new delivery partner profile
export const createPartener = async (req: Request, res: Response) => {

    const { name, email, phone, password, vehicleType } = req.body

    if (!name || !email || !phone || !password) return res.json({ message: "Please provide all required fields" })

    const hashPassword = await bcrypt.hash(password, 10)
    const partner = await prisma.deliveryPartner.create({ data: {name, email: email.toLowerCase(), password: hashPassword, phone, vehicleType} })

    res.status(201).json({partner})
}

// update delivery partner profile
export const updateDeliveryPartner = async (req: Request, res: Response) => {
    const {name, phone, vehicleType, isActive} = req.body

    const data: any = {}   
    
    if(name) data.name = name
    if(phone) data.phone = phone
    if(vehicleType) data.vehicleType = vehicleType
    data.isActive = isActive
    
    try {
        const partner = await prisma.deliveryPartner.update({where: {id: req.params.id as string}, data})

        res.json({partner})
    } catch (error) {
        console.error(error)
        res.status(404).json({message: "Delivery Partner not found"})
    }
}

// assign delivery partner for order
export const assignPartnerForOrder = async (req: Request, res: Response) => {

    const {partnerId} = req.body

    const order = await prisma.order.findUnique({where: {id: req.params.id as string}})
    const availableDeliveryPartner = await prisma.deliveryPartner.findUnique({where: {id: partnerId}})

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    let status = order!.status
    const history: any[] = Array.isArray(order!.statusHistory) ? order!.statusHistory : []

    if(order!.status === "Placed" || order!.status === "Confirmed") {
        status === "Assigned"
        history.push({status, note: `Assigned to ${availableDeliveryPartner?.name}`, timestamp: new Date()})
    }

    await prisma.order.update({where: {id: order!.id}, data: {deliveryOtp: otp, deliveryPartnerId: availableDeliveryPartner!.id, status, statusHistory: history}})
}


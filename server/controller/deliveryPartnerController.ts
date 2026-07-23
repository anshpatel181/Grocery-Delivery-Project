
import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const generateToken = (id: string) => {
    return jwt.sign({ id, role: "delivery" }, process.env.JWT_SECRET as string, {
        expiresIn: "30d"
    })
}

// Login Delivery Partner
export const loginDeliveryPartner = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) return res.status(401).json({ message: "Please provide all required fields" })

    const partner = await prisma.deliveryPartner.findUnique({ where: { email: email.toLowerCase() } })

    if (!partner) return res.status(401).json({ message: "Invalid email or password" })

    if (!partner.isActive) return res.status(403).json({ message: "Your account is deactivated" })

    const isMatch = await bcrypt.compare(password, partner!.password)

    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" })

    const token = generateToken(partner.id)

    const { password: _, ...partnerData } = partner

    res.json({ partner: partnerData, token })
}

// get assigned deliveries
export const getMyDeliveries = async (req: Request, res: Response) => {

    const { status } = req.query

    const where: any = { deliveryPartnerId: req.partner!.id }

    if (status === "active") {
        where.status = { in: ["Assigned", "Out for Delivery", "Packed"] }
    } else if (status === "completed") {
        where.status = { in: ["Delivered", "Cancelled"] }
    }

    const orders = await prisma.order.findMany({ where, include: { user: { select: { name: true, phone: true } } }, orderBy: { createdAt: "desc" } })

    res.json({ orders })
}

// get single delivery detail
export const getSingleDelivery = async (req: Request, res: Response) => {
    const order = await prisma.order.findUnique({ where: { deliveryPartnerId: req.partner!.id, id: req.params.id as string }, include: { user: { select: { name: true, phone: true } } } })

    if (!order) return res.status(404).json({ message: "Delivery not found" })

    res.json({ order })
}

// Complete delivery with OTP
export const completeDelivery = async (req: Request, res: Response) => {
    const { otp } = req.body

    const order = await prisma.order.findFirst({ where: { id: req.params.id as string, deliveryPartnerId: req.partner!.id } })

    if (!order || order.status === "Cancelled" || order.status === "Delivered") return res.status(400).json({ message: "Invalid request" })

    if (order.deliveryOtp !== otp) return res.status(500).json({ message: "Invalid OTP" })

    const history = order.statusHistory as any[]

    history.push({ status: "Delivered", note: "Delivered by partner", timestamp: new Date() })

    const updatedOrder = await prisma.order.update({ where: { id: order.id as string }, data: { status: "Delivered", statusHistory: history, deliveryOtp: "" } })

    res.json({ order: updatedOrder, message: "Delivery completed successfully" })
}

// Cancel delivery
export const cancelDelivery = async (req: Request, res: Response) => {
    const { reason } = req.body

    const order = await prisma.order.findFirst({ where: { id: req.params.id as string, deliveryPartnerId: req.partner!.id } })

    if (order!.status === "Delivered") return res.status(400).json({ message: "Cannot cancel a delivered order" })

    const history = order!.statusHistory as any[]

    history.push({ status: "Cancelled", note: reason || "", timestamp: new Date() })

    const updatedOrder = await prisma.order.update({ where: { id: order!.id }, data: { status: "Cancelled", statusHistory: history } })

    res.json({ order: updatedOrder, message: "Delivery Cancelled" })
}

// update order status by delivery partner
export const updateStatusByPartner = async (req: Request, res: Response) => {
    const { status } = req.body

    const allowedStatus = ["Packed", "Out for Delivery"]

    if(!allowedStatus.includes(status)) return res.status(400).json({message: "Invalid status update"})
    const order = await prisma.order.findFirst({ where: { id: req.params.id as string, deliveryPartnerId: req.partner!.id } })

    if (!order || order!.status === "Cancelled") return res.status(400).json({ message: "Order is cancelled" })

    const history = order!.statusHistory as any[]

    history.push({status, note: `Status updated to ${status}`, timestamp: new Date()})

    const updatedOrder = await prisma.order.update({where: {id: req.params.id as string}, data: {status, statusHistory: history}})

    res.json({order: updatedOrder})
}   

// Update live location
export const updateLocation = async (req: Request, res: Response) => {
    const {lat, lng} = req.body

    const order = await prisma.order.findFirst({where: {id: req.params.id as string, deliveryPartnerId: req.partner!.id, status: {in: ["Assigned", "Packed", "Out for Delivery"]}}})

    await prisma.order.update({where: {id: order!.id as string}, data: {liveLocation: {lat, lng, updatedAt: new Date()}}})

    res.json({success: true})
}
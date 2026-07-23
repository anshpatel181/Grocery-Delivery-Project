import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { prisma } from "../config/prisma.js";

export const partnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ Message: "Unauthorized" })
        const token = authHeader.split(" ")[1]

        if (!token) return res.status(401).json({ Message: "Unauthorized" })

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string }


        if (decodedToken.role !== "delivery") return res.status(403).json({ message: "Access denied. Delivery Partner only." })
        const deliveryPartner = await prisma.deliveryPartner.findUnique({ where: { id: decodedToken.id } })

        if (!deliveryPartner || !deliveryPartner.isActive) return res.status(403).json({ message: "Account is deactivated" })
        req.partner = deliveryPartner
        next();
    } catch (error) {
        console.error(error)
        return res.status(401).json({ message: "Token is not valid" })
    }
}
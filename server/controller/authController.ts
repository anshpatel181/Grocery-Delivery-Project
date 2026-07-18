import jwt from "jsonwebtoken"
import { prisma } from "../config/prisma.js"
import { ErrorRequestHandler, Request, Response } from "express"
import bcrypt from "bcrypt"

// Generate jwt token
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "30d" })
}

// Check if user is admin
const getAdminStatus = (email: string | null | undefined): boolean => {

    if (!email) return false
    const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase()) : []
    return adminEmails.includes(email.toLowerCase())
}

// user register function
export const register = async (req: Request, res: Response) => {

    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) return res.status(400).json({ message: "Please provide all the required details" })

        const existingUser = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })

        if (existingUser) return res.status(400).json({ message: "User already exists with this email" })

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: { name, email: email.toLowerCase(), password: hashedPassword }
        })

        const token = generateToken(user.id)

        const userData: any = { ...user } //this will create copy of all user properties and assign it to userData, so if we change userData nothing will be changed to user object.
        delete userData.password
        userData.isAdmin = getAdminStatus(userData.email)

        res.status(201).json({ user: userData, token })

    } catch (error: any) {
        console.log(error.message)
        return res.status(500).json({ message: error.message })
    }
}

// user register function
export const login = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body

        if (!email || !password) return res.status(400).json({ message: "Please provide all the required details" })

        const existingUser = await prisma.user.findUnique({ where: { email: email.toLowerCase() }, include: {addresses: true} })

        if (!existingUser) return res.status(401).json({ message: "Invalid email or password" })

        const isMatch = await bcrypt.compare(password, existingUser.password)

        if(!isMatch) return res.status(400).json({message: "Invalid email or password"})
        
        const token = generateToken(existingUser.id)

        const userData: any = { ...existingUser }
        delete userData.password
        userData.isAdmin = getAdminStatus(userData.email)

        res.status(201).json({ user: userData, token })

    } catch (error: any) {
        console.log(error.message)
        return res.status(500).json({ message: error.message })
    }
}
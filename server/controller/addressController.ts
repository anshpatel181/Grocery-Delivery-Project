import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";


// get all addresses from user
export const getAllAddress = async (req: Request, res: Response) => {
    try {

        const allAddress = await prisma.address.findMany({ where: { userId: req.user!.id as string }, orderBy: { createdAt: "asc" } })

        res.json({ addresses: allAddress })
    } catch (error: any) {
        console.error(error)
        return res.status(500).json({ message: error.message || "Something went wrong" })
    }
}

// Add the address
export const addAddress = async (req: Request, res: Response) => {

    try {

        const { label, address, city, state, zip, lat, lng, isDefault } = req.body
        if (!lat || !lng) return res.status(400).json({ message: "Location coordinates are required. Please allow location access" })

        const currentAddresses = await prisma.address.findMany({ where: { userId: req.user!.id as string } })

        let makeDefault = isDefault
        if (currentAddresses.length === 0) makeDefault = true

        if (makeDefault) {
            await prisma.address.updateMany({ where: { userId: req.user!.id as string }, data: { isDefault: false } })
        }

        await prisma.address.create({ data: { userId: req.user!.id as string, label, address, city, state, zip, lat: Number(lat), lng: Number(lng), isDefault: makeDefault } })

        const addresses = await prisma.address.findMany({ where: { userId: req.user!.id as string }, orderBy: { createdAt: "asc" } })
        res.json({ addresses })
    } catch (error: any) {
        console.error(error)
        return res.status(500).json({ message: error.message || "Something went wrong" })
    }
}

export const updateAddress = async (req: Request, res: Response) => {

    try {

        const { label, address, city, state, zip, lat, lng, isDefault } = req.body
        if (!lat || !lng) return res.status(400).json({ message: "Location coordinates are required. Please allow location access" })
        
        if(isDefault) {
            await prisma.address.updateMany({where: {userId: req.user!.id as string}, data: {isDefault: false}})
        }

        const data: any = {}

        if(label) data.label = label
        if(address) data.address = address
        if(city) data.city = city
        if(state) data.state = state
        if(zip) data.zip = zip
        if(lat) data.lat = Number(lat)
        if(lng) data.lng = Number(lng)
        if(isDefault) data.isDefault = isDefault

        const updatedAddress = await prisma.address.update({ where: { id: req.params.id as string }, data})

        if(!updatedAddress) return res.status(404).json({message: "Address not found"})
        
        const addresses = await prisma.address.findMany({where: {userId: req.user!.id as string}, orderBy: {createdAt: "asc"}})
        res.json({ addresses })
    } catch (error: any) {
        console.error(error)
        return res.status(500).json({ message: error.message || "Something went wrong" })
    }
}

export const deleteAddress = async (req: Request, res: Response) => {
    
    try {
        await prisma.address.delete({ where: { id: req.params.id as string } })
    } catch (error: any) {
        console.log(error.message)
    }
    
    const addresses = await prisma.address.findMany({where: {userId: req.user!.id as string}, orderBy: {createdAt: "asc"}})
    res.json({ addresses })
}


import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// get discounted products
export const getFlashDeals = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({ where: { stock: { gt: 0 } }, orderBy: { originalPrice: "desc" } })

    const productsWithDiscount = products.map((prod: any) => {
        const discount = prod.price && prod.originalPrice ? Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100) : 0
        return { ...prod, discount }
    })

    res.json({ products: productsWithDiscount.slice(0, 8) })
}

// get all products
export const getProducts = async (req: Request, res: Response) => {
    const { category, search, minPrice, maxPrice, sort } = req.query

    const where: any = {}

    if (category && category !== "all") where.category = category as string
    if (search && search !== "") where.name = { contains: search as string, mode: "insensitive" }
    if (minPrice || maxPrice) {
        where.price = {}
        if (minPrice) where.price.gte = Number(minPrice)
        if (maxPrice) where.price.lte = Number(maxPrice)
    }

    const orderBy: any = {}
    if (sort === "price_asc") orderBy.price = "asc"

    else if (sort === "price_desc") {
        orderBy.price = "desc"
    }

    else orderBy.createdAt = "desc"

    const products = await prisma.product.findMany({ where, orderBy })

    const productsWithDiscount = products.map((prod: any) => {
        const discount = prod.price && prod.originalPrice ? Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100) : 0
        return { ...prod, discount }
    })

    res.json({ products: productsWithDiscount })
}

// get individual product by id
export const getProductById = async (req: Request, res: Response) => {

    const product = await prisma.product.findUnique({ where: { id: req.params.id as string } })

    if (!product) return res.status(404).json({ message: "Product not found" })

    const discount = product.price && product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0

    res.json({product: { ...product, discount }})
}

// Add New Product
export const addProduct = async (req: Request, res: Response) => {
    const product = await prisma.product.create({data: req.body})
    res.status(201).json({product})
}

// Update the Product
export const updateProduct = async (req: Request, res: Response) => {
    const product = await prisma.product.update({where: {id: req.params.id as string}, data: req.body})
    res.json({product})
}

export const deleteProduct = async (req: Request, res: Response) => {
    await prisma.product.update({where: {id: req.params.id as string}, data: {stock: Number(0)}})
    res.json({message: "Product Updated"})
}


import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export const authMiddlware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" })
    }
    const token = authHeader?.split(" ")[1]

    if (!token) return res.status(401).json({ message: "Unauthorized" })

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }

    req.user = { id: decoded.id }
    next();
  } catch (error: any) {
    console.log(error.message)
    next()
  }
};

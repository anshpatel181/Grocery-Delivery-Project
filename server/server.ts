import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import authRouter from "./routes/authRoutes.js"
import productsRouter from "./routes/productRoutes.js"
import uploadRouter from "./routes/uploadRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app = express();

app.use(cors())
app.use(express.json())


app.get("/", (req: Request, res: Response) => {
    res.send("Server is running")
})

app.use("/api/auth", authRouter)
app.use("/api/products", productsRouter)
app.use("/api/upload", uploadRouter)
app.use("/api/orders", orderRouter)
app.use("/api/inngest", serve({ client: inngest, functions }));

// Error handling
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    res.status(500).json({ message: error.message })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
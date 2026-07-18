import express from "express"
import { authMiddlware } from "../middlewares/authMiddleware.js";
import { createOrder, getAllOrders, getOrder, getOrderLocation, getUserOrders, updateOrderStatus } from "../controller/orderController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/", authMiddlware, createOrder)
orderRouter.get("/", authMiddlware, getUserOrders)
orderRouter.get("/all", authMiddlware, adminMiddleware, getAllOrders)
orderRouter.get("/:id", authMiddlware, getOrder)
orderRouter.put("/:id/status", authMiddlware, adminMiddleware, updateOrderStatus)
orderRouter.get("/:id/location", authMiddlware, getOrderLocation)

export default orderRouter
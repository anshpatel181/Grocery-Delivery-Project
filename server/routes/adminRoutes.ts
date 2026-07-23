import express from "express"
import { authMiddlware } from "../middlewares/authMiddleware.js"
import { adminMiddleware } from "../middlewares/adminMiddleware.js"
import { assignPartnerForOrder, createPartener, getAdminStats, getPartners, updateDeliveryPartner } from "../controller/adminController.js"

const adminRoutes = express.Router()

adminRoutes.get("/stats", authMiddlware, adminMiddleware, getAdminStats)
adminRoutes.get("/delivery-partners", authMiddlware, adminMiddleware, getPartners)
adminRoutes.post("/create-partner", authMiddlware,adminMiddleware, createPartener)
adminRoutes.put("/delivery-partners/:id", authMiddlware, adminMiddleware, updateDeliveryPartner)
adminRoutes.put("/orders/:id/assign", authMiddlware, adminMiddleware, assignPartnerForOrder)

export default adminRoutes
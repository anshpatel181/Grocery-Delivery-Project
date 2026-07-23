import express from "express"
import { cancelDelivery, completeDelivery, getMyDeliveries, getSingleDelivery, loginDeliveryPartner, updateLocation, updateStatusByPartner } from "../controller/deliveryPartnerController.js";
import { partnerMiddleware } from "../middlewares/partnerMiddleware.js";

const deliveryPartnerRouter = express.Router();

deliveryPartnerRouter.post("/login", loginDeliveryPartner)
deliveryPartnerRouter.get("/my-deliveries", partnerMiddleware, getMyDeliveries)
deliveryPartnerRouter.get("/my-deliveries/:id", partnerMiddleware, getSingleDelivery)
deliveryPartnerRouter.put("/my-deliveries/:id/complete", partnerMiddleware, completeDelivery)
deliveryPartnerRouter.put("/my-deliveries/:id/cancel", partnerMiddleware, cancelDelivery)
deliveryPartnerRouter.put("/my-deliveries/:id/status", partnerMiddleware, updateStatusByPartner)
deliveryPartnerRouter.put("/my-deliveries/:id/location", partnerMiddleware, updateLocation)


export default deliveryPartnerRouter;
import express from "express"
import { authMiddlware } from "../middlewares/authMiddleware.js"
import { addAddress, deleteAddress, getAllAddress, updateAddress } from "../controller/addressController.js"

const addressRouter = express.Router()

addressRouter.get("/", authMiddlware, getAllAddress)
addressRouter.post("/", authMiddlware, addAddress)
addressRouter.put("/:id", authMiddlware, updateAddress)
addressRouter.delete("/:id", authMiddlware, deleteAddress)

export default addressRouter
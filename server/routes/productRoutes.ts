import express from "express"
import { authMiddlware } from "../middlewares/authMiddleware.js";
import { addProduct, deleteProduct, getFlashDeals, getProductById, getProducts, updateProduct } from "../controller/productController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const productRouter = express.Router();

productRouter.get("/flash-deals", getFlashDeals)
productRouter.get("/", getProducts)
productRouter.get("/:id", getProductById)
productRouter.post("/", authMiddlware, adminMiddleware, addProduct)
productRouter.patch("/:id", authMiddlware, adminMiddleware, updateProduct)
productRouter.delete("/:id", authMiddlware, adminMiddleware, deleteProduct)

export default productRouter
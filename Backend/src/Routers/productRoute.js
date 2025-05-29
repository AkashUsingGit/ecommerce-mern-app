import { Router } from "express";
import { getAllProducts,getProduct, getSearchproduct } from "../Controllers/productController.js";

const router = Router()

router.route("/getAllProducts").get(getAllProducts)
router.route("/getProduct/:id").get(getProduct)
router.route("/getSearchproduct").get(getSearchproduct)

export default router;
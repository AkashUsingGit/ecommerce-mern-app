import { Router } from "express";
import Authorize from "../Utils/authorize.js"
import{
    getCart,
    addToCart,
    decreaseQuantity,
    clearCart,
    removeProductFromCart
} from "../Controllers/cartController.js"

const router = Router()

router.route("/getcart").get(Authorize,getCart)
router.route("/addtocart").post(Authorize,addToCart)
router.route("/decreasequantity/:productId").put(Authorize,decreaseQuantity)
router.route("/removecart/:productId").delete(Authorize,removeProductFromCart)
router.route("/clearcart").delete(Authorize,clearCart)

export default router


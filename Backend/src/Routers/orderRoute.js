import {Router} from "express"

import {createOrder, getOrder, deleteOrder} from "../Controllers/orderController.js"
import Authorize from "../Utils/authorize.js"


const router = Router()

router.route("/createorder").post(Authorize, createOrder)
router.route("/getorder").get(Authorize, getOrder)
router.route("/deleteorder/:orderId").delete(Authorize, deleteOrder)

export default router
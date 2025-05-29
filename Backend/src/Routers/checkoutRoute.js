import { Router } from "express";

import {Checkout} from "../Controllers/checkoutController.js"


const router = Router()

router.route("/payment").post(Checkout)

export default router
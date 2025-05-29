import { Router } from "express";
import Authorize from "../Utils/authorize.js";

import {
    registerUser,
    loginUser,
    logout,
    checkAuth,
    getUser
} from "../Controllers/userController.js"

const router = Router()

router.route("/registerUser").post(registerUser)
router.route("/loginUser").post(loginUser)
router.route("/logoutUser").get(logout)
router.route("/checkAuth").get(checkAuth)
router.route("/getUser").get(Authorize, getUser)

export default router
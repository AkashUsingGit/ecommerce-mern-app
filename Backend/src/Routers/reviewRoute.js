import { Router } from "express"
import { createReview, getReview } from "../Controllers/reviewController.js"
import Authorize from "../Utils/authorize.js"


const router = Router()

router.route("/createreview").post(Authorize, createReview)
router.route("/getreview/:id").get(getReview)

export default router




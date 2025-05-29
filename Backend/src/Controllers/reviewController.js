import {reviewModel} from "../Models/reviewmodel.js";
import {asyncHandler} from "../Utils/asyncHandler.js"
import {apiResponse}  from "../Utils/apiResponse.js"
import {apiError} from "../Utils/apiError.js"


const createReview = asyncHandler(async(req,res)=>{

    const{productId, reviewText, rating} = req.body

    if(!productId || !reviewText || !rating){
        throw new apiError(404,"required data not found")
    }

    console.log(productId,reviewText,rating)

    const {_id, username} = req.user

    if(!_id || !username){
        throw new apiError(404,"user not authorised")
    }

    console.log(_id,username)

    const review = await reviewModel.create({
        productId: productId,
        reviewText : reviewText,
        rating : rating,
        userId : _id,
        username : username
    })

    if(!review){
        throw new apiError(500,"review creation failed")
    }

    console.log(review)

    return res
    .status(200)
    .json(new apiResponse(200,review,"review successfully submitted"))

})

const getReview = asyncHandler(async (req,res)=>{

    const{id} = req.params

    if(!id){
        throw new apiError(401, "Product Id Missing")
    }

    const reviews = await reviewModel.find({productId : id})

    if(!reviews){
        throw new apiError(501, "Error finding reviews")
    }

    console.log(reviews)

    if (reviews.length === 0) {
        return res
        .status(200)
        .json(new apiResponse(200,[],"No reviews found for this product"));
      }
      

    return res
    .status(200)
    .json(new apiResponse(200,reviews,"Reviews found successfully"))

})


export {
    createReview,
    getReview
}

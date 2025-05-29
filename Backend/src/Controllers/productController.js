import {productModel} from "../Models/productmodel.js"
import {asyncHandler} from "../Utils/asyncHandler.js"
import {apiError} from "../Utils/apiError.js"
import {apiResponse} from "../Utils/apiResponse.js"

const getAllProducts = asyncHandler(async(req,res)=>{

    const products = await productModel.find()

    if(!products){
        throw new apiError(500,"product fetch failed")
    }

    return res
    .status(200) 
    .json(new apiResponse(200,products,"product found succesfully"))
   
})

const getProduct = asyncHandler(async(req,res)=>{

    const {id} = req.params

    // console.log("request for product",id)

    const product = await productModel.findById(id).populate("reviews")


    if(!product){
        throw apiError(400, "product fetching failed")
    }

    // console.log("product found", product)

    return res
    .status(200)
    .json(new apiResponse(200,product,"Product found successfully"))

})

const getSearchproduct = asyncHandler(async(req,res)=>{

    const query = req.query.q
    if (!query) return res.status(400).json({ message: "Query missing" });

    const keywords = query.trim().split(" ")

    const regexArray = keywords.map((word)=>({

        $or : [
            { type : {$regex : word, $options : "i"}},
            { category : {$regex : word, $options : "i"}}
        ]
    } 
    ))

    const products = await productModel.find({$and : regexArray})
    
    
    return res
    .status(200)
    .json(new apiResponse(200,products,`query for ${keywords} is successful`))

})

export {
    getAllProducts,
    getProduct,
    getSearchproduct
}
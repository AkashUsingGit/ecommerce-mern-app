import mongoose from "mongoose"
import { Schema } from "mongoose"

const ProductSchema = new Schema({

    title : {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    reviews:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "reviewModel"
        }
    ],
    Image: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    featured:{
        type:Boolean,
        default:false
    },
    productType:{
        type:String,
        required: true
    },
},{timestamps:true}
);

const productModel = mongoose.model("productModel",ProductSchema)

export {productModel}


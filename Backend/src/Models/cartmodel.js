import mongoose from "mongoose"
import { Schema } from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "userModel",
    required: true
  },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "productModel" },
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

const cartModel = mongoose.model("cartModel", cartSchema);

export {cartModel}

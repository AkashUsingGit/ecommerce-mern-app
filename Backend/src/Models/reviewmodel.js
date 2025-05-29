import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", required: true
  },
  username:{
    type: String,
    required: true
  },
  reviewText:{
    type: String,
    required: true
  },
    rating: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
 }
});

const reviewModel = mongoose.model("reviewModel", reviewSchema);

export { reviewModel }

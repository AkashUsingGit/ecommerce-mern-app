import { cartModel } from "../Models/cartmodel.js";
import { asyncHandler } from "../Utils/asyncHandler.js"
import { apiResponse } from "../Utils/apiResponse.js"
import { apiError } from '../Utils/apiError.js'


const getCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const cart = await cartModel.findOne({ userId }).populate("items.productId");
    return res
    .status(200)
    .json(new apiResponse(200,cart || { userId, items: [] }, "cart found successfully"))
})

const addToCart = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
        cart = new cartModel({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ productId, quantity });
    }

    await cart.save();
    return res
    .status(200)
    .json(new apiResponse(200,cart,"cart added successfully"))
}) 

const decreaseQuantity = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const cart = await cartModel.findOne({ userId });
  if (!cart) {
    return res.status(404).json(new apiError(404, "Cart not found"));
  }

  const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

  if (productIndex === -1) {
    return res.status(404).json(new apiError(404, "Product not found in cart"));
  }

  const product = cart.items[productIndex];

  if (product.quantity === 1) {
    // Remove item from cart
    cart.items.splice(productIndex, 1);
  } else {
    // Decrease quantity
    cart.items[productIndex].quantity -= 1;
  }

  await cart.save();

  return res.status(200).json(new apiResponse(200, cart, "Product quantity updated or removed successfully"));
});

const clearCart = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    const cart =  await cartModel.findOneAndDelete({ userId });
    res.status(200).json(new apiResponse(200, cart, "cart cleared successfully"));
}) 

const removeProductFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;
  console.log("userId",userId)
   console.log("productId",productId)

  const cart = await cartModel.findOne({ userId });
  if (!cart) {
    return res.status(404).json(new apiError(404, 'Cart not found'));
  }


  const updatedItems = cart.items.filter(item => item.productId.toString() !== productId);

  cart.items = updatedItems;
  await cart.save();

  return res.status(200).json(
    new apiResponse(200, cart, 'Product removed entirely from cart')
  );
});

export {
    getCart,
    addToCart,
    decreaseQuantity,
    clearCart,
    removeProductFromCart
}

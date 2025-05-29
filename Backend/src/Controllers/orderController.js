import { asyncHandler } from "../Utils/asyncHandler.js";
import { orderModel } from "../Models/ordermodel.js";
import { apiError } from "../Utils/apiError.js"
import { apiResponse } from "../Utils/apiResponse.js"
import { userModel } from "../Models/usermodel.js";


const createOrder = asyncHandler(async (req, res) => {
    console.log("client request has received")
    const { items, address } = req.body;
    const { _id, username, email } = req.user

    if (!items || !address) {
        throw new apiError(400, "either items or address missing")
    }
    console.log(req.user)
    console.log("items :", items)
    console.log("address :", address)

    const productDetail = items.map((item) => {
        return {
            productId: item.productId._id,
            quantity: item.quantity
        }
    })

    const productOrder = await orderModel.create({
        products: productDetail,
        userId: _id,
        username: username,
        fullName: address.fullName,
        phone: address.phone,
        email: email,
        address: address.address,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country,
        paymentMethod: "card"
    })

    if (!productOrder) {
        throw new apiError(500, "error occured while creating order")
    }

    const user = await userModel.findById(_id)

    user.order.push(productOrder._id)

    await user.save()

    return res
        .status(200)
        .json(new apiResponse(200, productOrder, "order created successfully"))

})

const getOrder = asyncHandler(async (req, res) => {

    const { _id } = req.user

    const user = await userModel.findById(_id)
        .populate(
            {
                path: "order",
                select: "_id products paymentMethod",
                populate: {
                    path: "products.productId",
                }
            }
        )

    const cleanOrders = user.order.map((item) => (
        {
            _id: item._id,
            paymentMethod: item.paymentMethod,
            productDetail: item.products.map((p) => ({
                ...p.productId.toObject(),
                quantity: p.quantity
            }))
        }
    ))

    if (!user) {
        throw new apiError(500, "order fetching failed")
    }

    return res
        .status(200)
        .json(new apiResponse(200, cleanOrders, "orders found successfully"))

})

const deleteOrder = asyncHandler(async (req, res) => {

    console.log("request recieve")

    const { orderId } = req.params

    if (!orderId) {
        throw new apiError(404, "order deletion failed")
    }

    const deletedOrder = await orderModel.findByIdAndDelete(orderId)

    const updatedUser  = await userModel.updateMany(
        { order: orderId },
        { $pull: { order: orderId } }
    );

    if (!deletedOrder) {
        throw new apiError(404, "internal server error")
    }

    return res
        .status(200)
        .json(new apiResponse(200, deleteOrder, "order deleted successfully"))

})

export {
    createOrder,
    getOrder,
    deleteOrder
}
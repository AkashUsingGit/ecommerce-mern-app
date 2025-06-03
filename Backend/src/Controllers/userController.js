import { userModel } from "../Models/usermodel.js"
import { asyncHandler } from "../Utils/asyncHandler.js"
import { apiError } from "../Utils/apiError.js"
import { apiResponse } from "../Utils/apiResponse.js"
import jwt from 'jsonwebtoken'

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;


    if (!username || !email || !password) {
        throw new apiError(400, "All fields (username, email, password) are required");
    }

    const existingUser = await userModel.findOne({
        // $or: [{ email }, { username }],
        email
    });

    if (existingUser) {
        throw new apiError(400, "email already exists");
    }

    const user = await userModel.create({ username, email, password });

    if (!user) {
        throw new apiError(400, "Error during user registration")
    }

    return res
    .status(200)
    .json(new apiResponse(200, user, "User registration successful"));

});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    console.log(req.body)

    if (!email || !password) {
        throw new apiError(400, "Field missing")
    }

    const user = await userModel.findOne({ email })

    if (!user) {
        throw new apiError(404, "user not found")
    }

    const verifyPassword = await user.verifyPassword(password)

    if (!verifyPassword) {
        throw new apiError(401, "password verification failed")
    }

    const accessToken = await user.generateAccessToken()

    if (!accessToken) {
        throw new apiError(500, "login failed")
    }

    // const loggedinuser = await userModel.findById(user._id).select("-password")

    user.password = undefined

    const options = {
        httpOnly: true,
        // secure : true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
    }

    return res
        .cookie("accessToken", accessToken, options)
        .json(new apiResponse(200, { user, accessToken }, "logged in succesfully"))

})

const logout = asyncHandler(async (_, res) => {
    console.log(process.env.NODE_ENV)
    return res
        .status(200)
        .clearCookie("accessToken", { httpOnly: true, path: "/" })
        .json(new apiResponse(200, "Logged out successfully"));
})

const checkAuth = asyncHandler(async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.json({ isAuthenticated: false });
        }
        const userdata = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(userdata)
        res.json({ ...userdata, isAuthenticated: true });
    } catch (error) {
        res.json({ isAuthenticated: false, error: "Invalid or expired token" });
    }
});

const getUser = asyncHandler(async (req, res) => {

    if (!req.user) {
        res.json({ message: "false" })
    }

    console.log(req.user)

    const user = await userModel.findById(req.user._id)

    if (!user) {
        apiError(400, "user not found")
    }

    return res
        .status(200)
        .json(new apiResponse(200, user, "user found successfully"))

})



export {
    registerUser,
    loginUser,
    logout,
    checkAuth,
    getUser
}




// "username" : "SinghAkash",
// "email" : "aakashsing07@gmail.com",
// "password" : "257725"

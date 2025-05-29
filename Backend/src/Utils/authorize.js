import jwt from 'jsonwebtoken'
import {apiResponse} from '../Utils/apiResponse.js'
import {apiError} from "..//Utils/apiError.js"
import {asyncHandler} from "../Utils/asyncHandler.js"

const Authorize = asyncHandler((req, res, next)=>{
        // console.log(req.cookies)
        const accessToken = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];

        if (!accessToken) {
            throw new apiError(401,'Access denied, no token provided')
        }
    
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
            if (err) {
                return res
                .status(401)
                .json(new apiResponse(401, accessToken,'Invalid token' ))
            }
    
            req.user = result; 
            next(); 
        });

})

export default Authorize


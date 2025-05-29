import mongoose from "mongoose"
import { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

  const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        default: "user",
        enum: ["user", "admin"], 
      },
    
      order: [{
        type: Schema.Types.ObjectId,
        ref: "orderModel" 
      }]
    },
    { timestamps: true }
  );



userSchema.pre("save", async function(next){

  if(this.isModified('password')){
    try{
        this.password = await bcrypt.hash(this.password,10)
        // console.log('Hashed password:', this.password); 
    }
    catch(error){
        console.error("Error Hashing Password :" , error)
        next(error)
    }
}
next()
})


userSchema.methods.verifyPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
      {
        _id : this._id,
        username : this.username
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
      }
    
    )
}

const userModel = mongoose.model("userModel", userSchema);

export {userModel} 



// "username" : "akash",
//     "email" : "akash123@gmail.com",
//     "password" : "257725772577"
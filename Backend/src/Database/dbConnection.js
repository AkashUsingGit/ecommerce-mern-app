import mongoose from "mongoose";


async function dbConnect(){

    try{
        await  mongoose.connect(process.env.URI)
    }
    catch(error){
        console.log("database Connection Failed :", error)
    }
    
}

export default dbConnect
import { configDotenv } from "dotenv"
import mongoose from "mongoose";

configDotenv();

export const connectDB  = () =>{
    mongoose.connect(process.env.MONGO_URI)
        .then(()=>{console.log("Mongo Db connected")})
        .catch((err)=>{console.log(err.message)})
}
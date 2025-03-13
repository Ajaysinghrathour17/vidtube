import mongoose, { connect, } from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async() =>{
    try {
    const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

    console.log(`\n MongoDB coneect ! DB host: ${connectInstance.connection.host}`);
    
    } catch (error) {
        console.log(`MongoDB connection error`, error);
        process.exit(1)
    }
}


export default connectDB;
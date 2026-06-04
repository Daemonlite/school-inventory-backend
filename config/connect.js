import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/inventory_db");
        console.log("DB connected");
    } catch (error) {
        console.log(error);
    }
};


export default connectDB;
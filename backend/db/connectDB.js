import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const db = await mongoose.connect(process.env.MONGO_URI, )
        console.log("MongoDB connected successfully:", db.connection.host);
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
    
}
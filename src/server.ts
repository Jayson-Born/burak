import dotenv from "dotenv";
dotenv.config();

import mongoose from 'mongoose';
 mongoose.set('strictQuery',true)
mongoose
.connect(process.env.Mongo_URL as string, {})
.then ((data)=> {
    console.log("MongoDB connected successfully")
    const PORT=process.env.PORT ?? 3003;
}) 
.catch((err)=>{ console.log("there is a problem with connection MongoDB")});


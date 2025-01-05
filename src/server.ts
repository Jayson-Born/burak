import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';
 mongoose.set('strictQuery',true)
 import app from "./app";

mongoose
.connect(process.env.MONGO_URL as string, {})
.then ((data)=> {
    console.log("MongoDB connected successfully")
    const PORT=process.env.PORT ?? 3003;
    app.listen(PORT, function(){
        console.info(`The server is successfully runing on port ${PORT}`)
        console.info(`Admin: http://localhost:${PORT}/admin \n`)
    }); 
}) 
.catch((err)=>{ console.log("there is a problem with connection MongoDB")});


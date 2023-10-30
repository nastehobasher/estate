import express from'express'
import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config()
const app = express()

mongoose
.connect(process.env.MONGO)
.then(()=>{
    console.log("connected MongoDb");
})
.catch((err)=>{
    console.log(err);
})
app.listen(3000,()=>{
    console.log("server is runnning on port 3000 !!!");
})
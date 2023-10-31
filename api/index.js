import express from'express'
import mongoose from 'mongoose';
import dotenv from "dotenv"
import userRouter from './routes/user.route.js'
import authRouter from './routes/authroute.js'
dotenv.config()
const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO).then(()=>{
        console.log("connected MongoDb");
    }).catch((err)=>{
        console.log("halkna ku haysata",err);
    })


app.listen(3000,()=>{
    console.log("server is runnning on port 3000 !!!");
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

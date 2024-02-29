import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config(); 


const app =express()

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log('DB is connected');
    })
    .catch((err)=>{
        console.log("Error", err);
    }) 

//Every route should be define(Establish) inside the index.js

app.use('/api/user',userRouter);  //user router is defined  (from user.route.js)

app.use('/api/auth',authRouter);   // auth router is defined

app.use('/api/listing',listingRouter);


//creating the middleware
app.use((err, req, res, next) =>{

    // err = It is coming from the input of the middleware which is the error
    //we sent to the middleware
    //We use "next" to go to the next middleware

    const statusCode = err.statusCode || 500;  // whatever the status code or If there is no status code then get 500.
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success :false,
        statusCode:statusCode,
        message:message
    })
});
//To use this middleware, go to the auth.controller.js file and inside the catch block use next(error)
// 500 -> Internal Server Error

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
});
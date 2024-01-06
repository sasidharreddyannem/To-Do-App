import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errormiddleware } from "./middlewares/errors.js";
import cors from "cors";
import dotenv from 'dotenv'

export const app=express();
dotenv.config();

app.use(express.json())
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}))

app.use( "/api/v1/users",userRouter);

app.use("/api/v1/task",taskRouter);

app.get("/",(req,res)=>{
    res.send("nice working");
})

app.use(errormiddleware)



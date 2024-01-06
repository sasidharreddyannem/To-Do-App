import ErrorHandler from "../middlewares/errors.js";
import {Task} from "../models/task.js";


export const newTask=async(req,res,next)=>{
   try{
    const {title,description}=req.body;
    
   //  console.log("working 1");
    await Task.create({
        title,description,user:req.user,
    })
   //  console.log("working 2");

    res.status(201).json({
        success:true,
        message:"Task added successfully",
    })    

   }catch(error){
       next(error);
   }
    
}

export const getMyTask= async(req,res,next)=>{
   try{
    const userid=req.user._id

    const tasks=await Task.find({user:userid});
 
    res.status(200).json({
     success:true,
     tasks,
    })
   }catch(error){
    next(error);
   }
}

export const updateTask=async(req,res,next)=>{

 try{
    const task=await Task.findById(req.params.id);

    if(!task) return next(new ErrorHandler("Task not found",404));
  
    task.isCompleted=!task.isCompleted;
  
     await task.save();
  
  
     res.status(200).json({
      success:true,
      message:" Task update successfull",
     })
 }catch(error){
    next(error);
 }
}


export const deleteTask= async(req,res,next)=>{
    
   try{
    const task=await Task.findById(req.params.id);

    if(!task) return next(new ErrorHandler("invalid id",404));

    await task.deleteOne();
   res.status(200).json({
    success:true,
    message:"task deleted Successfully"
   })
   }catch(error){
    next(error);
   }
 }
 
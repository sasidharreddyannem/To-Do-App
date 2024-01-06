import {User} from "../models/user.js"
import bcrypt from "bcryptjs";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/errors.js";
export const getAllUsers=async(req,res)=>{
    
  
}

export const login = async(req,res,next)=>{

  try{
    const {email,password}=req.body;
    console.log("login page used");
    
    const user=await User.findOne({email}).select("+password");
     
      if(!user) return next(new ErrorHandler("invalid email or password",400));
    
      const isMatch = await bcrypt.compare(password,user.password);
     if(!isMatch) return next(new ErrorHandler("invalid email or password",400));
      sendCookie(user,res,`welcome back,${user.name}`,200);
  }catch(error){
    next(error);
  }
}


export const register=async(req,res,next)=>{
    console.log("i am called");
  try{
    console.log("i am called");

    const {name,email,password}=req.body;
    console.log(req.body);
  
  let user=await User.findOne({email});

 
   if(user) return next(new ErrorHandler("user already existed",400));
  // console.log(password);
  const hashedPassword= await bcrypt.hash(password, 10);
  user = await User.create({name,email,password: hashedPassword});
  sendCookie(user,res,"Registered Succesfully",201);

  }catch(error){
    next(error);
  }
 }

  
 export const getmyDetails=(req,res,next)=>{
   
  res.status(200).json({
    success:true,
    user:req.user,
  })
}

export const logout=(req,res,next)=>{
  res.status(200).cookie("token","",{expires:new Date(Date.now()),
    sameSite:process.env.NODE_ENV=="Development"?"lax":"none",
    secure:process.env.NODE_ENV=="Development"?false:true,
  }).json({
    success:true,
    user:req.user,
  })
}

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};


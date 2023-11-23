import User from "../models/User.model.js"
import bcrybt from "bcrypt"
import { errorHandler } from "../utils/error.js"

//user controller
export const signup = async(req,res,next)=>{
  const {username , email , password} = req.body
  const hashedPassword = bcrybt.hashSync(password,10)
  const newUser = new User({username,email,password:hashedPassword})
  try{
    await newUser.save()
    res.status(201).json({message:'user created successfully'})
  }catch(error){
    next(error)
  }

}
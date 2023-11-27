import User from "../models/User.model.js"
import bcrybt from "bcrypt"
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

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
export const signin = async(req,res,next)=>{
  const { email , password} = req.body
  try{
    const validUser = await User.findOne({email})
    if(!validUser)return next(errorHandler(404,'user not found'))
    const validPassword = bcrybt.compareSync(password , validUser.password)
  if(!validPassword) return next(errorHandler(401,'wrong credentials!'))
  const token = jwt.sign({id:validUser._id},process.env.JWT_SECTET)
  const{password:pass,...rest}=validUser._doc
  res.cookie('access_token',token,{httpOnly:ture}).status(200).json(rest)
}catch(error){
    next(error)
  }
}
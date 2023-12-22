import User from "../models/User.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from 'bcrypt'
export const test =(req,res)=>{
  res.json({
    message:'api route is working'
  })
}
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async(req,res,next)=>{
  if (req.user.id !== req.params.id) return next(errorHandler(401,'You Can Only Delete Your Own Account'))
    try{
      await User.findByIdAndDelete(req.params.id)
      res.f('access_token')
      res.status(200).json('user has been deleted!')
    }catch(error){
      next(error)
    }
  }

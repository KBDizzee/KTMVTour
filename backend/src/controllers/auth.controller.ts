import { Request, Response, NextFunction } from "express";
import CustomError from "../middlewares/error-handler.middleware";
import User from "../models/user.model";
import 'dotenv/config'
import { checkPassword, HashPassword } from "../utils/bcrypt.utils";
import { generateAccessToken } from "../utils/jwt.utils";
import { JWTPayload } from "../types/global.types";

interface ISignupData{
  email:string,
  password:string,
  username: string,
  profilePicture?:null
}
//register function:
export const register = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const { email, password, username, profilePicture }: ISignupData = req.body;

    if(!email){
      throw new CustomError(`Email required`,400)
    }
    if(!password){
      throw new CustomError(`Password required`,400)
    }
    if(password.length < 8){
      throw new CustomError(`Password must be greater than 8 characters`,400)
    }
    if(!username){
      throw new CustomError(`Username required`,400)
    }
    if(username.length < 3 || username.length > 16){
      throw new CustomError(`Username must be between 3-16 characters`,400)
    }

    const hashedPass = await HashPassword(password)
    
    const user = await User.create({email,password:hashedPass,username,profilePicture})

    const userObject = user.toObject()
    const {password:pass,...userWithoutPass} = userObject

    res.status(201).json({
      message: `User registered`,
      data:userWithoutPass
    })
  } catch (err) {
    next(err);
  }
};

// login function:
export const login = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const {email,password} = req.body

    if(!email){
      throw new CustomError(`Email required`,400)
    }
    if(!password){
      throw new CustomError(`Password required`,400)
    }

    // Validate password:
    const user = await User.findOne({email}).select('+password')
    
    if(!user){
      throw new CustomError(`No user found. Please Sign up instead.`,404)
    }

    const isPassMatch = await checkPassword(password,user.password)

    if(!isPassMatch){
      throw new CustomError(`Invalid credentials`,400)
    }

    const userObject = user.toObject()
    const {password:pass,...userWithoutPass} = userObject

    const payload:JWTPayload = {
      _id:user._id as any,
      email:user.email,
      username:user.username,
      profilePicture:user.profilePicture
    }

    const KTMVTour_token = generateAccessToken(payload)

    res.cookie('KTMVTour_token',KTMVTour_token,{
      httpOnly:true,
      secure: process.env.NODE_ENV === 'DEVELOPMENT' ? false : true,
      maxAge: Number(process.env.COOKIE_EXPIRY) * 24 * 60 * 60 * 1000,
      sameSite:"none"
    })

    res.status(200).json({
      message:`Logged in`,
      data:userWithoutPass,KTMVTour_token
    })
    
  }catch(err){
    next(err)
  }
}

//fetch profile function
export const profile = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const id = req.user._id

    const user = await User.findById(id)

    if(!user){
      throw new CustomError(`User not found`,404)
    }

    res.status(200).json({
      message:`User fetched`,
      data:user
    })
  }catch(err){
    next(err)
  }
} 
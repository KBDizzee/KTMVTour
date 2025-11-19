import { NextFunction, Request, Response } from "express";
import CustomError from "../middlewares/error-handler.middleware";
import { postCommentModel } from "../models/comments.model";


export const commentOnPost = async(req:Request,res:Response,next:NextFunction)=>{
try{
  const userId = req.user._id
  const {postId} = req.params
  const {content} = req.body

  if (!req.user){
    throw new CustomError(`Unauthorised`,403)
  }

  const comment = await postCommentModel(userId.toString(),postId,content)
  
  res.status(201).json({
    message:`Successfully commented`,
    data:comment 
  })
}catch(err:any){
  next(err)
}
}
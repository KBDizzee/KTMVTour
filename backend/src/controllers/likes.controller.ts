import { NextFunction, Request, Response } from "express";
import {
  checkIfLikedModel,
  likeModel,
  unlikeModel,
} from "../models/likes.model";
import CustomError from "../middlewares/error-handler.middleware";

export const likePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const { postId } = req.params;

    if (!userId) {
      throw new CustomError(`Unauthorised`, 403);
    }

    const like = await likeModel(userId.toString(), postId);

    res.status(201).json({
      message: `Post successfully liked`,
      data: like,
    });
  } catch (err: any) {
    next(err);
  }
};

export const unlikePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const { postId } = req.params;

    if (!userId) {
      throw new CustomError(`Unauthorised`, 403);
    }

    const unlike = await unlikeModel(userId.toString(), postId);

    res.status(200).json({
      message: `Post successfully unliked`,
      data: unlike,
    });
  } catch (err: any) {
    next(err);
  }
};

export const checkIfLiked = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const { postId } = req.params;

    if (!userId) {
      throw new CustomError(`Unauthorised`, 403);
    }

    const result = await checkIfLikedModel(userId.toString(), postId);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

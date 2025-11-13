import { NextFunction, Request, Response } from "express";
import CustomError from "../middlewares/error-handler.middleware";
import { uploadFile } from "../utils/cloudinary-service.utils";
import { uploadPhotos, uploadPost } from "../models/post.model";

const folder = "posts";
// create posts function
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction 
) => {
  try {
    const id = req.user._id;
    const { caption,location } = req.body;

    if (!id) {
      throw new CustomError(`Unauthorised`, 401);
    }

    const photos = req.files as Express.Multer.File[];

    if (!photos || photos.length === 0) {
      throw new CustomError(`At least one photo is required`, 400);
    }

    if (photos.length > 10) {
      throw new CustomError(`Maximum 10 photos allowed`, 400);
    }

    const post = await uploadPost(caption, id.toString(),location);

    // we store the photos.path in the db after saving it to cloudinary first. To make this process faster, we use promise.all which is used in ts/js (read defintion);
    // a method used for handling multiple asynchronous operations concurrently.
    // It takes an iterable (typically an array) of Promises as input and returns a single Promise.

    const uploadPhotosToCloudinary = photos.map(async (photo, index) => {
      const { path, public_id } = await uploadFile(photo.path, folder);
      return {
        url: path,
        order: index + 1,
      };
    });

    const allPhotoUrls = await Promise.all(uploadPhotosToCloudinary);

    await uploadPhotos(post.id, allPhotoUrls);

    res.status(201).json({
      message: `Post successfully created`,
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

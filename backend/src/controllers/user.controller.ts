import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import CustomError from "../middlewares/error-handler.middleware";
import { HashPassword } from "../utils/bcrypt.utils";
import { deleteFiles, uploadFile } from "../utils/cloudinary-service.utils";

const folder_name = "Pfps";
//update profile function
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user._id;

    const user = await User.findById(id);

    if (!user) {
      throw new CustomError(`User not found`, 400);
    }

    const { username, email, password } = req.body;
    const profilePicture = req.file as Express.Multer.File;

    const updatedInfo: any = {};

    if (password) {
      if (password.length < 8) {
        throw new CustomError(
          `Password must be greater than 8 characters`,
          400
        );
      }

      //have to hash the updated password
      const updatedPass = await HashPassword(password);
      updatedInfo.password = updatedPass;
    }

    if (username) {
      if (username.length < 3 || username.length > 16) {
        throw new CustomError(`Username must be between 3-16 characters`, 400);
      }
      updatedInfo.username = username;
    }

    if (profilePicture) {
      const oldPfp = user.profilePicture?.public_id

      //upload new pfp:
      const { path, public_id } = await uploadFile(
        profilePicture.path,
        folder_name
      );
      updatedInfo.profilePicture = {
        path,
        public_id,
      };

      // delete the old pfp:
      if (oldPfp) {
        await deleteFiles([oldPfp]);
      }
    }

    if (email) {
      const checkEmailExist = await User.findOne({ email, _id: { $ne: id } });
      if (checkEmailExist) {
        throw new CustomError(`Email is already taken by another account`, 400);
      }
      updatedInfo.email = email;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedInfo, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      message: `Profile Updated. Changes will show when you reload app.`,
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

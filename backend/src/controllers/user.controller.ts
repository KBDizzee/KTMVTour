import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import CustomError from "../middlewares/error-handler.middleware";
import { HashPassword } from "../utils/bcrypt.utils";

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

    const { username, email, password, profilePicture } = req.body;
    const updatedInfo = { username, email, password,profilePicture };

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
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedInfo, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      message: `Profile Updated. Changes will show when you reload app.`,
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

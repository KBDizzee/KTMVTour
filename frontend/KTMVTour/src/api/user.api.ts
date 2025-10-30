import { IUser } from "../types/user.types";
import api from "./index";

export const updateProfileAPI = async (data: IUser | FormData) => {
  try {
    const response = await api.put("/user/updateProfile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err: any) {
    console.error("API Error:", err);
    throw err.response.data;
  }
};

export const deleteProfilePictureAPI = async (): Promise<void> => {
  try {
    const response = await api.put("/user/removeProfilePicture");
    return response.data;
  } catch (err: any) {
    throw err.response.data;
  }
};

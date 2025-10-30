import { IUser } from "../types/user.types";
import api from "./index";

export const updateProfileAPI = async (data: IUser | FormData) => {
  try {
    const response = await api.put("/user/updateProfile", data);
    return response.data;
  } catch (err: any) {
    console.error("API Error:", err);
  }
};

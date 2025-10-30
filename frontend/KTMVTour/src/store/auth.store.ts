import { create } from "zustand";
import { getItem } from "./storage";
import { profileAPI } from "../api/auth.api";

interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture?: {
    path?:string,
    public_id?:string
  } | undefined;
  createdAt?:string
}

interface AuthStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  user: User | null;
  login: (user:User) => void;
  logout: () => void;
  checkAuth: () => void;
  fetchUserProfile: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthenticated: false,
  user:null,

  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setUser: (user:User|null) =>({user}),

  login: (user) => set({ isAuthenticated: true,user }),
  logout: () => set({ isAuthenticated: false,user:null }),

  checkAuth: async () => {
    const authUserData = getItem("user");
    const authTokenData = getItem("KTMVTour_token");

    if (authUserData && authTokenData) {
      set({ isAuthenticated: true });
      await get().fetchUserProfile()
      return true;
    }

    set({ isAuthenticated: false });
    return false;
  },

  fetchUserProfile: async () => {
    try {
      const token = getItem("KTMVTour_token");

      if (!token) {
        return;
      }

      const data = await profileAPI();
      set({ user: data.data }); // data.data because backend returns { message, data: user }
    } catch (err) {
      console.error(`Error fetching profile`, err);
    }
  },
}));

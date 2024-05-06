import axios from "axios";
import { IUser } from "@/interfaces/user.interface";
import { constants } from "@/constants";

export const getAllUsers = async (): Promise<IUser[] | null> => {
  try {
    return await axios.get(`${constants.API_URL}/user`);
  } catch (error) {
    return null;
  }
};

export const getProfileData = async (): Promise<IUser | null> => {
  try {
    const res = await axios.get(`${constants.API_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

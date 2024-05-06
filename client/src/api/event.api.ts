import { getCords } from "@/api/maps.api";
import axios from "axios";
import { constants } from "@/constants";
import dayjs from "dayjs";
import { IEvent } from "@/interfaces/event.interface";

export const addEventHandler = async (
  name: string,
  description: string,
  address: string,
  date: dayjs.Dayjs | null,
  price: string,
): Promise<IEvent | null> => {
  const { lat, lon } = await getCords(address);
  if (!lat || !lon || !date) {
    return null;
  }
  const data = { name, description, date, xCord: lat, yCord: lon, price };
  const res = await axios.post(`${constants.API_URL}/event`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

export const deleteEvent = async (id: number): Promise<void> => {
  try {
    return await axios.delete(`${constants.API_URL}/event/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (e: any) {
    console.log(e);
  }
};

export const unsubscribeEvent = async (
  id: number | undefined,
): Promise<void> => {
  try {
    const res = await axios.delete(
      `${constants.API_URL}/event/unsubscribe/${id}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
    );
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

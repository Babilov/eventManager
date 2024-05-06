import { Dayjs } from "dayjs";

export interface IEvent {
  id?: number;
  name: string;
  description: string;
  date: Date | null | Dayjs;
  price: string;
  xCord?: number;
  yCord?: number;
  address: string;
}

export interface IEventForCreate {
  name: string;
  description: string;
  date: Date | null | Dayjs;
  address: string;
  price: string;
}

import { IEvent, IEventForCreate } from "@/interfaces/event.interface";

export interface IEventListProps {
  events: IEvent[];
  setEvents: (prevData: (prevData: IEvent[]) => IEvent[]) => void;
  isYour: boolean;
}

export interface IEventItemProps extends Omit<IEventListProps, "events"> {
  event: IEvent;
}

export interface IAddEventProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setEvents: (prevData: (prevData: IEvent[]) => IEvent[]) => void;
}

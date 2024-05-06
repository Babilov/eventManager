import { IEvent } from "@/interfaces/event.interface";
import { deleteEvent, unsubscribeEvent } from "@/api/event.api";
import { eventStateRemove } from "@/utils/event.util";

export const handleDelete = async (
  id: number | undefined,
  setEvents: (prevData: (prevData: IEvent[]) => IEvent[]) => void,
) => {
  await eventStateRemove(id, setEvents, deleteEvent);
};

export const handleUnsubscribeEvent = async (
  id: number | undefined,
  setEvents: (prevData: (prevData: IEvent[]) => IEvent[]) => void,
) => {
  await eventStateRemove(id, setEvents, unsubscribeEvent);
};

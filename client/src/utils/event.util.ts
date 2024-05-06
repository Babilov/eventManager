import { IEvent } from "@/interfaces/event.interface";

export const eventStateRemove = async (
  id: number | undefined,
  setEvents: (prevData: (prevData: IEvent[]) => IEvent[]) => void,
  action: (id: number) => Promise<void>,
) => {
  if (id) {
    setEvents((prevData: IEvent[]) =>
      prevData.filter((event: IEvent) => event.id !== id),
    );
    await action(id);
  }
};

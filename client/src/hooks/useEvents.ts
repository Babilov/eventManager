import { useEffect, useState } from "react";
import { IEvent } from "@/interfaces/event.interface";
import { getProfileData } from "@/api/user.api";

export const useEvents = (isYour: boolean) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  useEffect(() => {
    const getEvents = async () => {
      const userData = await getProfileData();
      if (userData) {
        isYour
          ? setEvents(userData.events)
          : setEvents(userData.participatedEvents);
      }
    };
    getEvents();
  }, [isYour]);
  return events;
};

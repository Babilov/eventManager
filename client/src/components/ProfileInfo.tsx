import React, { FC, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";

import { IUser } from "@/interfaces/user.interface";
import EventsList from "@/components/eventComponents/EventsList";
import AddEventModal from "@/components/UI/modal/AddEvent.modal";
import Switcher from "@/components/UI/Switcher";
import { IEvent } from "@/interfaces/event.interface";
import { useEvents } from "@/hooks/useEvents";

const ProfileInfo: FC<{
  user: IUser;
}> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isYour, setIsYour] = useState<boolean>(true);
  const [events, setEvents] = useState<IEvent[]>([]);
  const eventsList: IEvent[] = useEvents(isYour);

  useEffect(() => {
    setEvents(eventsList);
  }, [eventsList]);

  return (
    <div className={"px-5"}>
      <Switcher isYour={isYour} setIsYour={setIsYour} />
      <Typography> Почта: {user.email}</Typography>
      <Button variant={"outlined"} onClick={() => setOpen(true)}>
        Создать событие
      </Button>
      <AddEventModal open={open} setOpen={setOpen} setEvents={setEvents} />
      <EventsList events={events} setEvents={setEvents} isYour={isYour} />
    </div>
  );
};

export default ProfileInfo;

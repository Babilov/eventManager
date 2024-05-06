import React, { FC } from "react";
import { IEvent } from "@/interfaces/event.interface";
import { Typography } from "@mui/material";
import EventItem from "@/components/eventComponents/EventItem";
import { IEventListProps } from "@/interfaces/props.interface";

const EventsList: FC<IEventListProps> = ({ events, setEvents, isYour }) => {
  if (events.length === 0) {
    return <Typography>Здесь пока ничего нет</Typography>;
  }

  return (
    <div>
      {events.map((event: IEvent) => (
        <EventItem
          key={event.id || Date.now()}
          event={event}
          setEvents={setEvents}
          isYour={isYour}
        />
      ))}
    </div>
  );
};

export default EventsList;

import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import EventDate from "@/components/eventComponents/EventDate";
import { FaTrashAlt } from "react-icons/fa";
import { handleDelete, handleUnsubscribeEvent } from "@/services/event.service";
import { IEventItemProps } from "@/interfaces/props.interface";

const EventItem: FC<IEventItemProps> = ({ event, setEvents, isYour }) => {
  const eventDate = new Date(event.date as Date);

  return (
    <div
      className={
        "flex justify-between items-center border border-green-400 my-3 px-5 py-1 rounded-md"
      }
    >
      <div>
        <Typography variant={"h4"}>{event.name}</Typography>
        <Typography variant={"h5"}>{event.description}</Typography>
        <Typography>{event.price}Р</Typography>
        <EventDate eventDate={eventDate} />
        <Typography>{event.address}</Typography>
      </div>
      {isYour ? (
        <Button
          className={"h-fit w-fit"}
          onClick={() => handleDelete(event.id, setEvents)}
        >
          <FaTrashAlt />
        </Button>
      ) : (
        <Button onClick={() => handleUnsubscribeEvent(event.id, setEvents)}>
          Отписаться
        </Button>
      )}
    </div>
  );
};

export default EventItem;

import React, { FC } from "react";
import { Typography } from "@mui/material";

const EventDate: FC<{ eventDate: Date }> = ({ eventDate }) => {
  return (
    <div className={"flex"}>
      <Typography>
        {eventDate.toLocaleDateString()}{" "}
        {eventDate.toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "numeric",
        })}
      </Typography>
    </div>
  );
};

export default EventDate;

import React, { FC, useState } from "react";
import { Button, Modal, TextareaAutosize, Typography } from "@mui/material";
import { Dayjs } from "dayjs";

import MyInput from "@/components/UI/MyInput";
import { addEventHandler } from "@/api/event.api";
import EventDateTimePicker from "@/components/UI/EventDateTimePicker";
import { IAddEventProps } from "@/interfaces/props.interface";

const AddEventModal: FC<IAddEventProps> = ({ open, setOpen, setEvents }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [price, setPrice] = useState<string>("");

  const addEvent = async () => {
    await addEventHandler(name, description, address, date, price);
    setEvents((prevData) => [
      ...prevData,
      {
        name,
        description,
        address,
        date,
        price,
      },
    ]);
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)} className={"flex"}>
      <div
        className={
          "min-h-96 w-96 bg-white m-auto border border-gray-700 px-5 py-2"
        }
      >
        <Typography variant={"h4"} className={"text-center"}>
          Создать событие
        </Typography>
        <MyInput
          label={"Название события"}
          value={name}
          onChange={setName}
          className={"w-full"}
        />
        <div className={"max-h-32 overflow-y-auto"}>
          <TextareaAutosize
            maxRows={3}
            minRows={3}
            className="w-full mt-2 p-2 border border-gray-400 resize-none"
            aria-label="Описание события"
            placeholder="Введите описание события"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <MyInput
          label={"Адрес"}
          value={address}
          onChange={setAddress}
          className={"w-full"}
        />
        <EventDateTimePicker value={date} setValue={setDate} />
        <MyInput
          label={"Цена"}
          value={price}
          onChange={setPrice}
          className={"w-full"}
        />
        <Button
          variant={"outlined"}
          className={"w-full mt-2"}
          sx={{ mt: 1 }}
          onClick={addEvent}
        >
          Создать
        </Button>
      </div>
    </Modal>
  );
};

export default AddEventModal;

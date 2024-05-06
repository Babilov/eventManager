import React, { FC } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

const EventDateTimePicker: FC<{
  value: Dayjs | null;
  setValue: (date: Dayjs | null) => void;
}> = React.memo(({ value, setValue }) => {
  return (
    <div className={"flex mt-2"}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
        <TimeField
          value={value}
          onChange={(newValue) => setValue(newValue)}
          ampm={false}
        />
      </LocalizationProvider>
    </div>
  );
});

export default EventDateTimePicker;

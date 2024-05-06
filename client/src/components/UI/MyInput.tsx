import React, { FC } from "react";
import { TextField, TextFieldVariants } from "@mui/material";

const MyInput: FC<{
  label: string;
  variant?: TextFieldVariants;
  className?: string;
  value: string;
  onChange: (e: string) => void;
}> = ({ label, variant = "standard", className, value, onChange }) => {
  return (
    <TextField
      label={label}
      variant={variant}
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default MyInput;

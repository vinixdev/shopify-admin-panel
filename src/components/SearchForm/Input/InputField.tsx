import { InputBase } from "@mui/material";
import React from "react";

interface InputFieldProps {
  placeholder: string;
  value?: string;
  size?: number;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurHandler?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  field_id?: string;
  required?: boolean;
  type?: string;
}

export default function InputField({
  placeholder,
  size = 25,
  value = "",
  onChangeHandler = (e) => null,
  onBlurHandler = (e) => null,
  name = "",
  field_id = "",
  required = false,
  type = "text",
}: InputFieldProps) {
  return (
    <InputBase
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      placeholder={placeholder}
      defaultValue={value}
      name={name}
      id={field_id}
      required={required}
      type={type}
      sx={[
        {
          "& .MuiInputBase-input": {
            color: "textSecondary.light",
            backgroundColor: "bgSecondary.main",
            borderRadius: 8,
            padding: (theme) => theme.spacing(0.8, 2),
            fontSize: (theme) => theme.spacing(1.6),
            fontWeight: 500,
            width: (theme) => theme.spacing(size),

            // "&:invalid:focus": {
            //   background: "red",
            // },
            // "&:invalid:required": {
            //   background: "red",
            // },
          },
        },
        {
          "& .MuiInputBase-input::placeholder": {
            color: "textSecondary.main",
            opacity: "1",
          },
        },
      ]}
    />
  );
}

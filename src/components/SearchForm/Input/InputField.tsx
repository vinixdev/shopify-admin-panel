import { InputBase, Theme } from "@mui/material";
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
  error?: boolean;
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
  error = false,
}: InputFieldProps) {
  return (
    <InputBase
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      placeholder={placeholder}
      value={value}
      name={name}
      id={field_id}
      required={required}
      type={type}
      error={error}
      onInvalid={() => console.log("invalido")}
      sx={[
        {
          "& .MuiInputBase-input": {
            color: "textSecondary.light",
            backgroundColor: "bgSecondary.main",
            border: "none",
            borderRadius: 8,
            padding: (theme: Theme) => theme.spacing(0.8, 2),
            fontSize: (theme: Theme) => theme.spacing(1.6),
            fontWeight: 500,
            width: (theme: Theme) => theme.spacing(size),

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
            opacity: 1,
          },
        },
        {
          "&": {
            borderRadius: 8,
            borderColor: "transparent",
            borderWidth: (theme: Theme) => theme.spacing(0.3),
            borderStyle: "solid",
          },
        },
        {
          "&.Mui-error": {
            borderColor: "#d32f2f",
            // "& .MuiInputBase-input::placeholder": {
            //   color: "#d32f2f",
            //   opacity: 0.8,
            // },
          },
        },
      ]}
    />
  );
}

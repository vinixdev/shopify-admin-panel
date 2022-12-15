import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useTranslation } from "react-i18next";

interface FilterInputProps {
  handler: (value: string) => void;
}

export default function FilterInput({ handler }: FilterInputProps) {
  const { t } = useTranslation();

  const [value, setValue] = useState<string>("");

  function inputHander(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    handler(e.target.value);
  }
  return (
    <TextField
      variant="standard"
      placeholder={`${t("search")}`}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
      value={value}
      onChange={inputHander}
    />
  );
}

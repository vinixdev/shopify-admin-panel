import React, { useEffect, useState } from "react";
import { Stack, Typography, Slider, Theme } from "@mui/material";

function valuetext(value: number): string {
  return `${value}`;
}

interface OrderStatusBarProps {
  value: number;
  min: number;
  max: number;
  step: number;
  title: string;
  enTitle: string;
}

export default function OrderStatusBar(props: OrderStatusBarProps) {
  //
  const [value, setValue] = useState<number>(props.value);
  const [maxValue, setMaxValue] = useState<number>(props.max);

  useEffect(() => {
    setValue(props.value);
    setMaxValue(props.max);
  }, [props.value, props.max]);

  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Typography
        variant="h5"
        fontWeight={600}
        fontSize={18}
        sx={{ width: "20%" }}
      >
        {props.title}
      </Typography>
      <Slider
        aria-label={props.enTitle}
        value={value}
        max={maxValue}
        min={props.min}
        getAriaValueText={valuetext}
        valueLabelDisplay="on"
        step={props.step}
        marks
        disabled
        sx={{
          "& .MuiSlider-thumb": {
            color: "primary.main",
          },
          "& .MuiSlider-track": {
            color: "primary.main",
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: "primary.main",
          },
          "& .MuiSlider-rail": {
            backgroundColor: (theme: Theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.primary.main
                : theme.palette.primary.main,
            opacity: (theme: Theme) =>
              theme.palette.mode === "dark" ? undefined : 0.7,
          },
        }}
      ></Slider>
    </Stack>
  );
}

import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const BaseAlert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface AlertPropsInterface {
  open: boolean;
  message?: string;
  type: "error" | "info" | "success" | "warning";
  duration?: number;
  handleClose: (e?: React.SyntheticEvent | Event, reason?: string) => void;
}

export default function Alert({
  open,
  message = "خطایی رخ داده است.",
  type,
  duration = 3000,
  handleClose,
}: AlertPropsInterface) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <BaseAlert onClose={handleClose} severity={type}>
        {message}
      </BaseAlert>
    </Snackbar>
  );
}

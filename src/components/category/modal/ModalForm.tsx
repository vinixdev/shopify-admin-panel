import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SxProps,
  Theme,
} from "@mui/material";
import InputField from "../../SearchForm/Input/InputField";

interface ModalFormProps {
  title: string;
  open: boolean;
  sx?: SxProps<Theme> | null;
  children: JSX.Element;
  onCloseHandler?: (e: React.MouseEvent) => void;
  onSubmitHandler?: (e: React.MouseEvent) => void;
}

export default function ModalForm({
  title,
  open,
  sx = null,
  children,
  onCloseHandler = (e) => null,
  onSubmitHandler = (e) => null,
}: ModalFormProps) {
  return (
    <Dialog open={open} onClose={onCloseHandler}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={sx}>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onSubmitHandler}>تایید</Button>
        <Button onClick={onCloseHandler}>بستن</Button>
      </DialogActions>
    </Dialog>
  );
}

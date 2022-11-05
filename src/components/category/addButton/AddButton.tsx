import { Button, ButtonBase } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import React from "react";

interface AddButtonInterface {
  text: string;
  onClickHandler?: (e: React.MouseEvent) => void;
}

export default function AddButton({
  text,
  onClickHandler = (e) => null,
}: AddButtonInterface) {
  return (
    <Button
      onClick={onClickHandler}
      size="small"
      variant="text"
      sx={{
        fontSize: 12,
        display: "flex",
        alignItems: "center",
        gap: 0.1,
        width: "fit-content",
        wordBreak: "keep-all",
      }}
      startIcon={
        <AddCircleRoundedIcon
          fontSize="small"
          sx={{
            marginRight: "-5px",
          }}
        />
      }
    >
      {text}
    </Button>
  );
}

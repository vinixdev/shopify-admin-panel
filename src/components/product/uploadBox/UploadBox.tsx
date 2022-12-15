import React from "react";
import { Typography, Theme, FormControl, InputLabel, Box } from "@mui/material";

interface UploadBoxProps {
  title: string;
  width: string | number;
  height: string | number;
  fontSize?: string | number;
  handler?: (file: File) => void;
  error?: boolean;
}

export default function UploadBox({
  title,
  width,
  height,
  fontSize = 16,
  handler = (file: File) => null,
  error = false,
}: UploadBoxProps) {
  //

  const [previewImg, setPreviewImg] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<boolean>(error);

  React.useEffect(() => {
    setErrors(error);
  }, [error]);

  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        setPreviewImg(reader.result as string);
        // handler(reader.result as string);
      };
      // setPreviewImg(URL.createObjectURL(file));
      // URL.revokeObjectURL(previewImg as string);
      handler(file);
      reader.readAsDataURL(file);
      setErrors(false);
    }
  };

  return (
    <InputLabel
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        width: width,
        height: height,
        borderStyle: "dashed",
        borderWidth: 2.5,
        borderColor: (theme: Theme) => {
          if (!errors) {
            return theme.palette.mode === "dark"
              ? theme.palette.textSecondary.main
              : theme.palette.dividerBg.main;
          }
          return "red";
        },
        wordBreak: "break-all",
      }}
    >
      <Typography
        variant="h6"
        fontSize={fontSize}
        fontWeight={500}
        textAlign={"center"}
        maxWidth={"100%"}
        sx={{
          color: (theme: Theme) => theme.palette.textSecondary.main,
        }}
      >
        {title}
      </Typography>
      <input
        type="file"
        accept="image/*"
        required
        hidden
        onChange={handlePreviewImage}
      />
      {previewImg ? (
        <Box
          component={"img"}
          src={previewImg}
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            zIndex: 99,
          }}
        />
      ) : null}
    </InputLabel>
  );
}

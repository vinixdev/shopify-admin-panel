import { Box } from "@mui/material";
import React from "react";

export default function Content({ children }: React.PropsWithChildren) {
  return <Box padding={2}>{children}</Box>;
}

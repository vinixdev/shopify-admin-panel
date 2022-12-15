import { Skeleton, TableCell, TableRow } from "@mui/material";
import React from "react";

interface LoaderProps {
  rows?: number;
  cells?: number;
}

export default function Loader({ rows = 5, cells = 3 }: LoaderProps) {
  const rowsEl = Array(rows).fill(0);
  const cellsEl = Array(cells).fill(0);
  return (
    <>
      {rowsEl.map((_, i) => (
        <TableRow key={i}>
          {cellsEl.map((_, j) => (
            <TableCell key={j} align="center">
              <Skeleton animation="wave" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

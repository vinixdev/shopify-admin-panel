import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Theme,
  Typography,
  Pagination,
  Box,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import Alert from "../alert/Alert";
import {
  AlertStateInterface,
  ALERT_ACTION_TYPE,
} from "../alert/reducer/alertReducer";
import PaperBox from "./PaperBox";

interface DataListProps {
  title: string;
  data: JSX.Element | JSX.Element[];
  header: string[];
  cells: number;
  rows: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  numOfPages: number;
  loading: boolean;
  alertState: AlertStateInterface;
  alertDispatch: React.Dispatch<ALERT_ACTION_TYPE>;
  filter?: boolean;
  handler?: (value: string) => void;
}

export default function DataList({
  title,
  data,
  cells,
  rows,
  loading,
  header,
  alertState,
  alertDispatch,
  page,
  setPage,
  numOfPages,
  filter = false,
  handler = (value: string) => null,
}: DataListProps) {
  //
  //

  const navigate = useNavigate();
  const location = useLocation();

  function handleChangePage(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
    navigate({
      pathname: location.pathname,
      search: `?page=${value}`,
    });
    // console.log(location.pathname);
  }

  function handleCloseNotify(
    e?: React.SyntheticEvent | Event,
    reason?: string
  ) {
    alertDispatch({
      type: "ALERT_CLOSE",
      payload: null,
    });
  }

  return (
    <PaperBox handler={handler} filter={filter} title={title}>
      <Table sx={{}}>
        <TableHead>
          <TableRow>
            {header.map((item, i) => {
              return (
                <TableCell
                  key={i}
                  sx={{
                    color: (theme: Theme) => theme.palette.textSecondary.main,
                  }}
                  align="center"
                >
                  {item}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? <Loader rows={rows} cells={cells} /> : data}
        </TableBody>

        <Alert
          open={alertState.open}
          message={alertState.message}
          handleClose={handleCloseNotify}
          type={alertState.type}
        />
      </Table>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        paddingY={1}
      >
        <Pagination
          count={numOfPages}
          page={page}
          color="primary"
          onChange={handleChangePage}
        />
      </Box>
    </PaperBox>
  );
}

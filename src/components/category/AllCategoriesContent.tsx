import React from "react";
import {
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
} from "@mui/material";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";

import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import { Link } from "react-router-dom";
import axios from "axios";
import PaperBox from "../partials/PaperBox";
import HttpRequest from "../../services/HttpRequest";
import { CategoryStateInterface } from "./context/CategoryReducer";
import Alert from "../alert/Alert";

export default function AllCategoriesContent() {
  const [categories, setCategories] = React.useState<CategoryStateInterface[]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);

  function handleCloseNotify(
    e?: React.SyntheticEvent | Event,
    reason?: string
  ) {
    setOpen(false);
  }

  React.useEffect(() => {
    const httpRequest = new HttpRequest();
    httpRequest
      .get<CategoryStateInterface[]>("api/v1/categories")
      .then((res) => {
        setCategories(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setOpen(true);
        }
      });
  }, []);

  const loader = (
    <>
      <TableRow>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell align="center">
          <Skeleton animation="wave" />
        </TableCell>
      </TableRow>
    </>
  );

  const categoriesCell = categories.length
    ? categories.map((category) => {
        return (
          <TableRow key={category.id}>
            <TableCell align="center">{category.title}</TableCell>
            <TableCell align="center">{category.slug}</TableCell>
            <TableCell align="center">
              <Link to={"/category/edit"}>
                <IconButton>
                  <BorderColorRoundedIcon />
                </IconButton>
              </Link>

              <IconButton>
                {/* handle click on this icon and send delete http method to server and delete this category. */}
                <DeleteSweepRoundedIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })
    : loader;

  return (
    <PaperBox title={"دسته بندی ها"}>
      <Table sx={{}}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                color: (theme: Theme) => theme.palette.textSecondary.main,
              }}
              align="center"
            >
              عنوان
            </TableCell>
            <TableCell
              sx={{
                color: (theme: Theme) => theme.palette.textSecondary.main,
              }}
              align="center"
            >
              اسلاگ
            </TableCell>
            <TableCell
              sx={{
                color: (theme: Theme) => theme.palette.textSecondary.main,
              }}
              align="center"
            >
              عملیات
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{isLoading ? loader : categoriesCell}</TableBody>
      </Table>

      <Alert open={open} handleClose={handleCloseNotify} type="error" />
    </PaperBox>
  );
}

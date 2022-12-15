import React from "react";
import { IconButton, TableCell, TableRow } from "@mui/material";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";

import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import { Link } from "react-router-dom";
import axios from "axios";

import HttpRequest from "../../services/HttpRequest";
import { CategoryStateInterface } from "./context/CategoryReducer";

import { alertInitialState, alertReducer } from "../alert/reducer/alertReducer";
import { CategoriesResponseInterface } from "./interfaces/interfaces";
import DataList from "../partials/DataList";
import { useTranslation } from "react-i18next";

export default function AllCategoriesContent() {
  const { t } = useTranslation();

  const [categories, setCategories] = React.useState<CategoryStateInterface[]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [alertState, alertDispatch] = React.useReducer(
    alertReducer,
    alertInitialState
  );

  const [page, setPage] = React.useState<number>(1);
  const [numOfPages, setNumOfPages] = React.useState<number>(0);
  const [perPage, setPerPage] = React.useState<number>(5);

  React.useEffect(() => {
    const httpRequest = new HttpRequest();
    httpRequest
      .get<CategoriesResponseInterface>(
        `api/v1/categories?page=${page}&perPage=${perPage}`
      )
      .then((res) => {
        setCategories(res.data.categories);
        setPerPage(res.data.perPage);
        setNumOfPages(Math.ceil(res.data.totalCategories / perPage));
        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          alertDispatch({
            type: "ALERT_ERROR",
            payload: t("default_error"),
          });
        }
      });
  }, [page]);

  const headers = [t("title"), t("slug"), t("operations")];

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
    : [];

  return (
    <DataList
      data={categoriesCell}
      loading={isLoading}
      header={headers}
      alertState={alertState}
      alertDispatch={alertDispatch}
      rows={5}
      cells={3}
      title={t("categories")}
      page={page}
      setPage={setPage}
      numOfPages={numOfPages}
    />
  );
}

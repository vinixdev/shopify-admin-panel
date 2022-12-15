import React from "react";
import { IconButton, TableCell, TableRow } from "@mui/material";

import HttpRequest from "../../services/HttpRequest";
import { alertInitialState, alertReducer } from "../alert/reducer/alertReducer";
import DataList from "../partials/DataList";
import axios from "axios";
import {
  CustomerInterface,
  CustomerResponseInterface,
} from "./interfaces/interfaces";
import { useTranslation } from "react-i18next";

export default function AllCustomers() {
  const { t } = useTranslation();

  const [users, setUsers] = React.useState<CustomerInterface[]>([]);
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
      .get<CustomerResponseInterface>(
        `api/v1/users?page=${page}&perPage=${perPage}`
      )
      .then((res) => {
        setUsers(res.data.users);
        setPerPage(res.data.perPage);
        setNumOfPages(Math.ceil(res.data.totalUsers / perPage));
        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          alertDispatch({
            type: "ALERT_ERROR",
            payload: err.response?.data.message,
          });
        }
      });
  }, [page]);

  const headers = [
    t("firstname"),
    t("lastname"),
    t("email"),
    t("phone"),
    t("created"),
  ];

  const usersCell = users.length
    ? users.map((user) => {
        return (
          <TableRow key={user.id}>
            <TableCell align="center">{user.first_name}</TableCell>
            <TableCell align="center">{user.last_name}</TableCell>
            <TableCell align="center">{user.email}</TableCell>
            <TableCell align="center">{user.phone_number}</TableCell>
            <TableCell align="center">
              {user.created_at.split(" ")[0]}
            </TableCell>
          </TableRow>
        );
      })
    : [];

  return (
    <DataList
      data={usersCell}
      loading={isLoading}
      header={headers}
      alertState={alertState}
      alertDispatch={alertDispatch}
      rows={5}
      cells={5}
      title={t("users")}
      page={page}
      setPage={setPage}
      numOfPages={numOfPages}
    />
  );
}

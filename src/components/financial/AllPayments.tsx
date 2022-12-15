import React from "react";
import { IconButton, TableCell, TableRow } from "@mui/material";

import HttpRequest from "../../services/HttpRequest";
import { alertInitialState, alertReducer } from "../alert/reducer/alertReducer";
import DataList from "../partials/DataList";
import axios from "axios";
import {
  PaymentInterface,
  PaymentResponseInterface,
} from "./interfaces/interfaces";
import { toPersianCurrency } from "../../services/Currency";
import PaymentStatusShow from "./status/PaymentStatusShow";
import { useTranslation } from "react-i18next";

export default function AllPayments() {
  const { t } = useTranslation();

  const [payments, setPayments] = React.useState<PaymentInterface[]>([]);
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
      .get<PaymentResponseInterface>(
        `api/v1/payments?page=${page}&perPage=${perPage}`
      )
      .then((res) => {
        setPayments(res.data.payments);
        setPerPage(res.data.perPage);
        setNumOfPages(Math.ceil(res.data.totalPayments / perPage));
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
    t("method"),
    t("amount_only"),
    t("ref"),
    t("res"),
    t("status"),
  ];

  const paymentsCell = payments.length
    ? payments.map((payment) => {
        return (
          <TableRow key={payment.id}>
            <TableCell align="center">{payment.user.first_name}</TableCell>
            <TableCell align="center">{payment.user.last_name}</TableCell>
            <TableCell align="center">{payment.user.email}</TableCell>
            <TableCell align="center">{payment.method}</TableCell>
            <TableCell align="center">
              {toPersianCurrency(payment.amount)}
            </TableCell>
            <TableCell align="center">{payment.reference}</TableCell>
            <TableCell align="center">{payment.reserve}</TableCell>
            <TableCell align="center">
              <PaymentStatusShow status={payment.status} />
            </TableCell>
          </TableRow>
        );
      })
    : [];

  return (
    <DataList
      data={paymentsCell}
      loading={isLoading}
      header={headers}
      alertState={alertState}
      alertDispatch={alertDispatch}
      rows={5}
      cells={8}
      title={t("payments")}
      page={page}
      setPage={setPage}
      numOfPages={numOfPages}
    />
  );
}

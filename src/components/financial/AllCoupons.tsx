import React from "react";
import { IconButton, TableCell, TableRow } from "@mui/material";

import HttpRequest from "../../services/HttpRequest";
import { alertInitialState, alertReducer } from "../alert/reducer/alertReducer";
import DataList from "../partials/DataList";
import axios from "axios";
import {
  CouponInterface,
  CouponResponseInterface,
} from "./interfaces/interfaces";
import { toPersianCurrency } from "../../services/Currency";
import PaymentShowStatus from "./status/PaymentStatusShow";
import CouponStatusShow from "./status/CouponStatusShow";
import { useTranslation } from "react-i18next";

export default function AllCoupons() {
  const { t } = useTranslation();

  const [coupons, setCoupons] = React.useState<CouponInterface[]>([]);
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
      .get<CouponResponseInterface>(
        `api/v1/coupons?page=${page}&perPage=${perPage}`
      )
      .then((res) => {
        setCoupons(res.data.coupons);
        setPerPage(res.data.perPage);
        setNumOfPages(Math.ceil(res.data.totalCoupons / perPage));
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
    t("code"),
    t("amount_only"),
    t("limit_only"),
    t("expire"),
    t("status"),
  ];

  const couponsCell = coupons.length
    ? coupons.map((coupon) => {
        return (
          <TableRow key={coupon.id}>
            <TableCell align="center">{coupon.code}</TableCell>
            <TableCell align="center">%{coupon.amount}</TableCell>
            <TableCell align="center">{coupon.limit}</TableCell>
            <TableCell align="center">
              {coupon.expires_at.split(" ")[0]}
            </TableCell>
            <TableCell align="center">
              <CouponStatusShow status={coupon.status} />
            </TableCell>
          </TableRow>
        );
      })
    : [];

  return (
    <DataList
      data={couponsCell}
      loading={isLoading}
      header={headers}
      alertState={alertState}
      alertDispatch={alertDispatch}
      rows={5}
      cells={5}
      title={t("coupons")}
      page={page}
      setPage={setPage}
      numOfPages={numOfPages}
    />
  );
}

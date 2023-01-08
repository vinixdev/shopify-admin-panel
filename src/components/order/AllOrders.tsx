import React from "react";
import {
  TableRow,
  TableCell,
  Theme,
  Typography,
  IconButton,
} from "@mui/material";
import TocRoundedIcon from "@mui/icons-material/TocRounded";
import { toPersianCurrency } from "../../services/Currency";
import HttpRequest from "../../services/HttpRequest";
import { alertInitialState, alertReducer } from "../alert/reducer/alertReducer";
import {
  AllOrderInterface,
  OrdersResponseInterface,
} from "./interface/interfaces";
import Status from "./status/Status";
import DataList from "../partials/DataList";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AllOrders() {
  const { t } = useTranslation();

  const [orders, setOrders] = React.useState<AllOrderInterface[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [alertState, alertDispatch] = React.useReducer(
    alertReducer,
    alertInitialState
  );

  const [page, setPage] = React.useState<number>(1);
  const [numOfPages, setNumOfPages] = React.useState<number>(0);
  const [perPage, setPerPage] = React.useState<number>(4);
  const [search, setSearch] = React.useState<string>("");

  const ordersCell = orders.length
    ? orders.map((order) => {
        return (
          <TableRow key={order.id}>
            <TableCell align="center">
              <Typography
                variant="h3"
                fontSize={11}
                textAlign={"center"}
                fontWeight={500}
              >
                {order.user.first_name}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant="h3"
                fontSize={11}
                textAlign={"center"}
                fontWeight={500}
              >
                {order.user.last_name}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant="h3"
                fontSize={9}
                textAlign={"center"}
                fontWeight={500}
                sx={{ direction: "rtl" }}
              >
                {order.user.email}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontSize: (theme: Theme) => theme.spacing(1.2),
              }}
            >
              <Status status={order.status} />
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontSize: (theme: Theme) => theme.spacing(1.2) }}
            >
              <Typography
                variant="h3"
                fontSize={11}
                textAlign={"center"}
                fontWeight={500}
                sx={{
                  direction: "rtl",
                }}
              >
                {toPersianCurrency(order.final_price)}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontSize: (theme: Theme) => theme.spacing(1.2) }}
            >
              {order.created_at.split(" ")[0]}
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontSize: (theme: Theme) => theme.spacing(1.2) }}
            >
              {order.updated_at.split(" ")[0]}
            </TableCell>
            <TableCell align="center">
              <Link to={`/orders/${order.id}/`}>
                <IconButton>
                  <TocRoundedIcon fontSize="small" />
                </IconButton>
              </Link>
            </TableCell>
          </TableRow>
        );
      })
    : [];

  const headers = [
    t("firstname"),
    t("lastname"),
    t("email"),
    t("status"),
    t("final_price"),
    t("created"),
    t("updated"),
    t("operations"),
  ];

  const handleOnChangeFilterInput = (value: string) => {
    setSearch(value);
  };

  React.useEffect(() => {
    const httpRequet = new HttpRequest();
    httpRequet
      .get<OrdersResponseInterface>(
        `api/v1/admin/orders?page=${page}&perPage=${perPage}&search=${search}`
      )
      .then((res) => {
        setOrders(res.data.orders);
        setPerPage(res.data.perPage);
        setNumOfPages(Math.ceil(res.data.totalOrders / perPage));
        setIsLoading(false);
      })
      .catch((err) => {
        alertDispatch({
          type: "ALERT_ERROR",
          payload: t("default_error"),
        });
        setIsLoading(false);
      });
  }, [page, search]);

  return (
    <DataList
      data={ordersCell}
      loading={isLoading}
      header={headers}
      alertState={alertState}
      alertDispatch={alertDispatch}
      rows={5}
      cells={8}
      title={t("orders")}
      page={page}
      setPage={setPage}
      numOfPages={numOfPages}
      filter={true}
      handler={handleOnChangeFilterInput}
    />
  );
}

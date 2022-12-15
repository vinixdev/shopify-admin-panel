import React from "react";
import { IconButton, TableCell, TableRow } from "@mui/material";

import HttpRequest from "../../services/HttpRequest";
import { alertInitialState, alertReducer } from "../alert/reducer/alertReducer";
import DataList from "../partials/DataList";
import axios from "axios";
import { ShipmentInterface, ShipmentResponse } from "./interfaces/interfaces";
import { toPersianCurrency } from "../../services/Currency";
import ShipmentShowStatus from "./status/ShipmentShowStatus";
import { useTranslation } from "react-i18next";

export default function AllShipments() {
  const { t } = useTranslation();

  const [shipments, setShipments] = React.useState<ShipmentInterface[]>([]);
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
      .get<ShipmentResponse>(`api/v1/shipments?page=${page}&perPage=${perPage}`)
      .then((res) => {
        setShipments(res.data.shipments);
        setPerPage(res.data.perPage);
        setNumOfPages(Math.ceil(res.data.totalShipments / perPage));
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
    t("selected_time"),
    t("delivered_time"),
    t("status"),
  ];

  const shipmentsCell = shipments.length
    ? shipments.map((shipment) => {
        return (
          <TableRow key={shipment.id}>
            <TableCell align="center">{shipment.employee.first_name}</TableCell>
            <TableCell align="center">{shipment.employee.last_name}</TableCell>
            <TableCell align="center">{shipment.employee.email}</TableCell>
            <TableCell align="center">
              {shipment.selectedDateTime.split(" ")[0]}
            </TableCell>
            <TableCell align="center">
              {shipment.deliveredAt.split(" ")[0]}
            </TableCell>
            <TableCell align="center">
              <ShipmentShowStatus status={shipment.status} />
            </TableCell>
          </TableRow>
        );
      })
    : [];

  return (
    <DataList
      data={shipmentsCell}
      loading={isLoading}
      header={headers}
      alertState={alertState}
      alertDispatch={alertDispatch}
      rows={5}
      cells={6}
      title={t("shipments")}
      page={page}
      setPage={setPage}
      numOfPages={numOfPages}
    />
  );
}

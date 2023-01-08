import React from "react";
import { IconButton, TableCell, TableRow } from "@mui/material";

import HttpRequest from "../../services/HttpRequest";
import { alertInitialState, alertReducer } from "../alert/reducer/alertReducer";
import DataList from "../partials/DataList";
import axios from "axios";
import { ISetting, SettingResponseInterface } from "./interfaces/interfaces";
import SettingShowScope from "./status/SettingShowScope";
import { useTranslation } from "react-i18next";

export default function AllSettings() {
  //

  const { t } = useTranslation();

  const [settings, setSettings] = React.useState<ISetting[]>([]);
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
      .get<SettingResponseInterface>(
        `api/v1/admin/settings?page=${page}&perPage=${perPage}`
      )
      .then((res) => {
        setSettings(res.data.settings);
        setPerPage(res.data.perPage);
        setNumOfPages(Math.ceil(res.data.totalSettings / perPage));
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

  const headers = [t("key"), t("value"), t("scope"), t("version")];

  const settingsCell = settings.length
    ? settings.map((setting) => {
        return (
          <TableRow key={setting.id}>
            <TableCell align="center">{setting.key}</TableCell>
            <TableCell align="center">{setting.value}</TableCell>
            <TableCell align="center">
              <SettingShowScope status={setting.scope} />
            </TableCell>
            <TableCell align="center">{setting.version}</TableCell>
          </TableRow>
        );
      })
    : [];

  return (
    <DataList
      data={settingsCell}
      loading={isLoading}
      header={headers}
      alertState={alertState}
      alertDispatch={alertDispatch}
      rows={5}
      cells={4}
      title={t("settings")}
      page={page}
      setPage={setPage}
      numOfPages={numOfPages}
    />
  );
}

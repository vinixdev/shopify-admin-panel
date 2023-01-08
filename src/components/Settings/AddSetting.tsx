import React, { useState, useReducer } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import PaperBox from "../partials/PaperBox";
import InputField from "../SearchForm/Input/InputField";
import SettingScope from "./status/SettingScope";
import { alertInitialState, alertReducer } from "../alert/reducer/alertReducer";
import Alert from "../alert/Alert";
import HttpRequest from "../../services/HttpRequest";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function AddSetting() {
  //

  const { t } = useTranslation();

  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [version, setVersion] = useState<string>("");
  const [scope, setScope] = useState<number>(SettingScope.PUBLIC);
  const [errors, setErrors] = useState<string[]>([]);

  const [alertState, alertDispatch] = useReducer(
    alertReducer,
    alertInitialState
  );

  function handleChangeEvent(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "key") {
      setKey(e.target.value);
    } else if (e.target.name === "value") {
      setValue(e.target.value);
    } else if (e.target.name === "version") {
      setVersion(e.target.value);
    } else if (e.target.name === "scope") {
      setScope(+e.target.value);
    }

    if (e.target.value === "") {
      setErrors((prev) => [...prev, e.target.name]);
    } else {
      setErrors((prev) => prev.filter((field) => field !== e.target.name));
    }
  }

  function handleSubmitBtn(e: React.MouseEvent) {
    if (!key || !value || !version) {
      if (!key) {
        setErrors((prev) => [...prev, "key"]);
      }
      if (!value) {
        setErrors((prev) => [...prev, "value"]);
      }
      if (!version) {
        setErrors((prev) => [...prev, "version"]);
      }
      alertDispatch({
        type: "ALERT_ERROR",
        payload: t("fill_fields_error"),
      });
      return;
    }
    const http = new HttpRequest();
    http
      .post("api/v1/admin/settings", {
        key,
        value,
        version,
        scope,
      })
      .then((res) => {
        alertDispatch({
          type: "ALERT_SUCCESS",
          payload: t("success_msg"),
        });
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          alertDispatch({
            type: "ALERT_ERROR",
            payload: err?.response?.data.message || t("default_error"),
          });
        } else {
          console.log(err);
        }
      });
  }

  function handleCloseNotify(
    e?: Event | React.SyntheticEvent<Element, Event> | undefined,
    reason?: string | undefined
  ) {
    alertDispatch({
      type: "ALERT_CLOSE",
      payload: null,
    });
  }

  return (
    <PaperBox title={t("new_setting")}>
      <Box
        component={"form"}
        display="flex"
        flexDirection={"column"}
        // alignItems="center"
        gap={1.5}
        width="fit-content"
      >
        <FormControl>
          <InputField
            onChangeHandler={handleChangeEvent}
            value={key}
            placeholder={t("key")}
            name="key"
            error={errors.includes("key")}
            required
          />
        </FormControl>
        <FormControl>
          <InputField
            onChangeHandler={handleChangeEvent}
            value={value}
            placeholder={t("value")}
            name="value"
            error={errors.includes("value")}
            required
          />
        </FormControl>
        <FormControl>
          <InputField
            onChangeHandler={handleChangeEvent}
            value={version}
            placeholder={t("version")}
            name="version"
            error={errors.includes("version")}
            required
          />
        </FormControl>
        <FormControl sx={{ paddingX: 1 }}>
          <FormLabel id="scope">{t("scope")}</FormLabel>
          <RadioGroup
            row
            value={`${scope}`}
            aria-labelledby="scope"
            name="scope"
            onChange={handleChangeEvent}
          >
            <FormControlLabel
              value={`${SettingScope.PUBLIC}`}
              control={<Radio />}
              label={t("public")}
            />
            <FormControlLabel
              value={`${SettingScope.PRIVATE}`}
              control={<Radio />}
              label={t("private")}
            />
          </RadioGroup>
        </FormControl>
        <Alert
          open={alertState.open}
          message={alertState.message}
          handleClose={handleCloseNotify}
          type={alertState.type}
        />
      </Box>
      <FormControl sx={{ alignSelf: "flex-end", marginX: 1 }}>
        <Button onClick={handleSubmitBtn} variant="contained">
          {t("save")}
        </Button>
      </FormControl>
    </PaperBox>
  );
}

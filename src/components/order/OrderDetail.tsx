import {
  Box,
  Button,
  FormControl,
  NativeSelect,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toPersianCurrency } from "../../services/Currency";
import HttpRequest from "../../services/HttpRequest";
import Alert from "../alert/Alert";
import { alertInitialState, alertReducer } from "../alert/reducer/alertReducer";
import PaperBox from "../partials/PaperBox";
import SubSection from "../partials/SubSection";
import InputSelectCustomize from "../product/Select/SelectInput";
import { AllOrderInterface } from "./interface/interfaces";
import OrderStatus from "./status/OrderStatus";

export default function OrderDetail() {
  const { t } = useTranslation();

  const { orderID } = useParams();
  const [order, setOrder] = useState<AllOrderInterface | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const [alertState, alertDispatch] = useReducer(
    alertReducer,
    alertInitialState
  );

  useEffect(() => {
    const http = new HttpRequest();
    http
      .get<AllOrderInterface>(`api/v1/orders/${orderID}`)
      .then((res) => {
        setOrder(res.data);
        setStatus(res.data.status);
      })
      .catch((err) => {
        setError(err.message);
        alertDispatch({
          type: "ALERT_ERROR",
          payload: t("default_error"),
        });
      });
  }, [orderID]);

  const handleSubmitChangeOrderStatus = (e: React.MouseEvent) => {
    const http = new HttpRequest();
    http
      .patch(`api/v1/orders/${orderID}`, {
        status,
      })
      .then((res) => {
        alertDispatch({
          type: "ALERT_SUCCESS",
          payload: t("success_msg"),
        });
      })
      .catch((err) => {
        alertDispatch({
          type: "ALERT_ERROR",
          payload: err.response.data.message,
        });
      });
  };

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
    <PaperBox title={t("order_detail")}>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <Typography sx={{ marginTop: 1.5, paddingTop: 1 }} variant="body1">
            {t("address")} :‌ {order?.address.city} - {order?.address.state} -{" "}
            {order?.address.zip_code}
          </Typography>
          <SubSection title={t("order_status")}>
            <Box
              sx={{ marginY: 1, display: "flex", alignItems: "center", gap: 1 }}
              component="form"
            >
              <FormControl>
                <NativeSelect
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setStatus(+e.target.value);
                  }}
                  required={true}
                  value={status}
                  input={<InputSelectCustomize />}
                  name={"orderStatus"}
                >
                  <option value={`${OrderStatus.INIT}`}>{t("init")}</option>
                  <option value={`${OrderStatus.PAID}`}>{t("paid")}</option>
                  <option value={`${OrderStatus.CONFIRMED}`}>
                    {t("confirmed")}
                  </option>
                  <option value={`${OrderStatus.INVENTORY}`}>
                    {t("inventory")}
                  </option>
                  <option value={`${OrderStatus.READY}`}>{t("ready")}</option>
                  <option value={`${OrderStatus.SENT}`}>{t("sent")}</option>
                  <option value={`${OrderStatus.DELIVERED}`}>
                    {t("delivered")}
                  </option>
                  <option value={`${OrderStatus.CANCELED}`}>
                    t{"cancelled"}
                  </option>
                  <option value={`${OrderStatus.REFUNDED}`}>
                    t{"refunded"}
                  </option>
                </NativeSelect>
              </FormControl>
              <FormControl>
                <Button
                  onClick={handleSubmitChangeOrderStatus}
                  variant="contained"
                >
                  {t("change_status")}
                </Button>
              </FormControl>
            </Box>
          </SubSection>
          <SubSection title={t("user_info")}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: (theme: Theme) => theme.palette.textSecondary.main,
                    }}
                    align="center"
                  >
                    {t("firstname")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: (theme: Theme) => theme.palette.textSecondary.main,
                    }}
                    align="center"
                  >
                    {t("lastname")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: (theme: Theme) => theme.palette.textSecondary.main,
                    }}
                    align="center"
                  >
                    {t("email")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">{order?.user.first_name}</TableCell>
                  <TableCell align="center">{order?.user.last_name}</TableCell>
                  <TableCell sx={{ direction: "rtl" }} align="center">
                    {order?.user.email}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </SubSection>
          <SubSection title={t("products")}>
            <Table sx={{ marginY: 1 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: (theme: Theme) => theme.palette.textSecondary.main,
                    }}
                    align="center"
                  >
                    {t("pic")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: (theme: Theme) => theme.palette.textSecondary.main,
                    }}
                    align="center"
                  >
                    {t("title")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: (theme: Theme) => theme.palette.textSecondary.main,
                    }}
                    align="center"
                  >
                    {t("price")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: (theme: Theme) => theme.palette.textSecondary.main,
                    }}
                    align="center"
                  >
                    {t("discounted_price")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order?.order_items.map((item) => {
                  return (
                    <TableRow key={item._id}>
                      <TableCell align="center">
                        <Box
                          component={"img"}
                          src={item.product.thumbnailUrl}
                          sx={{
                            maxWidth: (theme: Theme) => theme.spacing(7.5),
                            maxHeight: (theme: Theme) => theme.spacing(7.5),
                            borderRadius: 1,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={
                            {
                              // maxWidth: "min-content",
                            }
                          }
                          variant="h3"
                          fontSize={11}
                          textAlign={"center"}
                          fontWeight={500}
                        >
                          {item.product.title}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: (theme: Theme) => theme.spacing(1.2),
                        }}
                      >
                        <Typography
                          variant="h3"
                          fontSize={11}
                          textAlign={"center"}
                          fontWeight={500}
                          sx={{ direction: "rtl" }}
                        >
                          {toPersianCurrency(item.product.price)}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: (theme: Theme) => theme.spacing(1.2),
                        }}
                      >
                        <Typography
                          variant="h3"
                          fontSize={11}
                          textAlign={"center"}
                          fontWeight={500}
                          sx={{ direction: "rtl" }}
                        >
                          {toPersianCurrency(item.specialPrice)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </SubSection>
        </>
      )}
      <Alert
        open={alertState.open}
        message={alertState.message}
        handleClose={handleCloseNotify}
        type={alertState.type}
      />
    </PaperBox>
  );
}

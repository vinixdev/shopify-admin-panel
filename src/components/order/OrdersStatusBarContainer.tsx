import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HttpRequest from "../../services/HttpRequest";
import { AllOrderInterface } from "./interface/interfaces";
import OrderStatusBar from "./OrderStatusBar";
import OrderStatus from "./status/OrderStatus";

export default function OrderStatusBarContainer() {
  const { t } = useTranslation();

  const [orders, setOrders] = useState<AllOrderInterface[]>([]);

  useEffect(() => {
    const http = new HttpRequest();
    http.get<AllOrderInterface[]>("api/v1/admin/orders/all").then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <Stack padding={1.5} gap={3}>
      <OrderStatusBar
        value={
          orders.filter((order) => order.status === OrderStatus.SENT).length
        }
        min={0}
        max={orders.length}
        step={50}
        title={t("sent")}
        enTitle={"Sended Orders"}
      />
      <OrderStatusBar
        value={
          orders.filter((order) => order.status === OrderStatus.DELIVERED)
            .length
        }
        min={0}
        max={orders.length}
        step={50}
        title={t("delivered")}
        enTitle={"deliverd Orders"}
      />
      <OrderStatusBar
        value={
          orders.filter((order) => order.status === OrderStatus.PAID).length
        }
        min={0}
        max={orders.length}
        step={50}
        title={t("paid")}
        enTitle={"Paid Orders"}
      />
      <OrderStatusBar
        value={
          orders.filter((order) => order.status === OrderStatus.REFUNDED).length
        }
        min={0}
        max={orders.length}
        step={50}
        title={t("refunded")}
        enTitle={"Funded Orders"}
      />
      <OrderStatusBar
        value={
          orders.filter((order) => order.status === OrderStatus.CANCELED).length
        }
        min={0}
        max={orders.length}
        step={50}
        title={t("cancelled")}
        enTitle={"Cancelled Orders"}
      />
      <OrderStatusBar
        value={
          orders.filter((order) => order.status === OrderStatus.CONFIRMED)
            .length
        }
        min={0}
        max={orders.length}
        step={50}
        title={t("confirmed")}
        enTitle={"Confirmed Orders"}
      />
      <OrderStatusBar
        value={
          orders.filter((order) => order.status === OrderStatus.INIT).length
        }
        min={0}
        max={orders.length}
        step={50}
        title={t("init")}
        enTitle={"Init Orders"}
      />
      <OrderStatusBar
        value={
          orders.filter((order) => order.status === OrderStatus.INVENTORY)
            .length
        }
        min={0}
        max={orders.length}
        step={50}
        title={t("inventory")}
        enTitle={"Inventory Orders"}
      />
      <OrderStatusBar
        value={
          orders.filter((order) => order.status === OrderStatus.READY).length
        }
        min={0}
        max={orders.length}
        step={50}
        title={t("ready")}
        enTitle={"Ready Orders"}
      />
    </Stack>
  );
}

import React, { useState, useReducer, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  NativeSelect,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";
import CreatableSelect from "react-select/creatable";

import PaperBox from "../partials/PaperBox";
import InputField from "../SearchForm/Input/InputField";

import { alertInitialState, alertReducer } from "../alert/reducer/alertReducer";
import Alert from "../alert/Alert";
import HttpRequest from "../../services/HttpRequest";
import axios from "axios";
import CouponStatus from "./status/CouponStatus";
import InputSelectCustomize from "../product/Select/SelectInput";
import {
  CategoryInterface,
  ProductInterface,
  UserInterface,
} from "./interfaces/interfaces";
import { MultiValue } from "react-select";
import { useTranslation } from "react-i18next";

export default function AddSetting() {
  const muiTheme = useTheme();

  const { t } = useTranslation();

  const [code, setCode] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [limit, setLimit] = useState<string>("");
  const [status, setStatus] = useState<number>(CouponStatus.ACTIVE);
  const [expire, setExpire] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [firstBuy, setFirstBuy] = useState<boolean>(false);

  const [usersConstraint, setUsersConstraint] = useState<string[]>([]);
  const [productsConstraint, setProductsConstraint] = useState<string[]>([]);
  const [categoriesConstraint, setCategoriesConstraint] = useState<string[]>(
    []
  );

  const [alertState, alertDispatch] = useReducer(
    alertReducer,
    alertInitialState
  );

  const http = new HttpRequest();

  useEffect(() => {
    http.get<UserInterface[]>("api/v1/admin/users/all").then((res) => {
      setUsers(res.data);
    });

    http.get<ProductInterface[]>("api/v1/admin/products/all").then((res) => {
      setProducts(res.data);
    });

    http.get<CategoryInterface[]>("api/v1/admin/categories/all").then((res) => {
      setCategories(res.data);
    });
  }, []);

  function handleChangeEvent(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "code") {
      setCode(e.target.value);
    } else if (e.target.name === "amount") {
      setAmount(e.target.value);
    } else if (e.target.name === "limit") {
      setLimit(e.target.value);
    } else if (e.target.name === "status") {
      setStatus(+e.target.value);
    } else if (e.target.name === "expire") {
      setExpire(e.target.value);
    }

    if (e.target.value === "") {
      setErrors((prev) => [...prev, e.target.name]);
    } else {
      setErrors((prev) => prev.filter((field) => field !== e.target.name));
    }
  }

  function handleUsersQualificationChange(
    items: MultiValue<{ value: string; label: string; color: string }>
  ) {
    setUsersConstraint(items.map((item) => item.value));
  }

  function handleProductsQualificationChange(
    items: MultiValue<{ value: string; label: string; color: string }>
  ) {
    setProductsConstraint(items.map((item) => item.value));
  }

  function handleCategoriesQualificationChange(
    items: MultiValue<{ value: string; label: string; color: string }>
  ) {
    setCategoriesConstraint(items.map((item) => item.value));
  }

  function handleSubmitBtn(e: React.MouseEvent) {
    if (!code || !amount || !expire) {
      if (!code) {
        setErrors((prev) => [...prev, "code"]);
      }
      if (!amount) {
        setErrors((prev) => [...prev, "amount"]);
      }
      if (!expire) {
        setErrors((prev) => [...prev, "expire"]);
      }
      alertDispatch({
        type: "ALERT_ERROR",
        payload: t("fill_fields_error"),
      });
      return;
    }

    http
      .post("api/v1/admin/coupons", {
        code,
        amount,
        limit: limit || 0,
        expire,
        status: status,
        firstBuy: firstBuy,
        qualification: {
          users: usersConstraint || [],
          products: productsConstraint || [],
          categories: categoriesConstraint || [],
        },
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

  const usersQualificationOptions = [
    {
      value: "allUsers",
      label: t("all_users"),
      color: "users",
    },
    ...users.map((user) => ({
      value: user.id,
      label: `${user.first_name} ${user.last_name}`,
      color: "users",
    })),
  ];

  const productsQualificationOptions = [
    {
      value: "allProducts",
      label: t("all_products"),
      color: "products",
    },
    ...products.map((product) => ({
      value: product.id,
      label: `${product.title}`,
      color: "products",
    })),
  ];

  const categoriesQualifictaionOptions = [
    {
      value: "allCategories",
      label: t("all_categories"),
      color: "categories",
    },
    ...categories.map((category) => ({
      value: category.id,
      label: `${category.title}`,
      color: "categories",
    })),
  ];

  return (
    <PaperBox title={t("new_coupon")}>
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
            value={code}
            placeholder={t("code")}
            name="code"
            error={errors.includes("code")}
            required
          />
        </FormControl>
        <FormControl>
          <InputField
            onChangeHandler={handleChangeEvent}
            value={amount}
            placeholder={t("amount")}
            name="amount"
            error={errors.includes("amount")}
            required
          />
        </FormControl>
        <FormControl>
          <InputField
            onChangeHandler={handleChangeEvent}
            value={limit}
            placeholder={t("limit")}
            name="limit"
            error={errors.includes("limit")}
            required
          />
        </FormControl>
        <FormControl>
          <InputField
            onChangeHandler={handleChangeEvent}
            value={expire}
            placeholder={t("expire")}
            name="expire"
            error={errors.includes("expire")}
            type="date"
            required
          />
        </FormControl>
        <FormControl>
          <CreatableSelect
            styles={{
              control: (baseStyle, state) => ({
                ...baseStyle,
                borderRadius: "25px",
                padding: "0px 10px",
                boxSizing: "border-box",
                borderWidth: "1px",
                color: muiTheme.palette.textSecondary.light,
                backgroundColor: muiTheme.palette.bgSecondary.main,
                borderColor:
                  state.isFocused && state.isMulti
                    ? "transparent"
                    : "transparent",
                "&:hover": {
                  outline: 0,
                  borderColor: "transparent",
                },
              }),
              menuList: (baseStyle, state) => ({
                ...baseStyle,
                height: "150px",
              }),
            }}
            isMulti
            onChange={handleUsersQualificationChange}
            placeholder={t("terms_for_users")}
            options={usersQualificationOptions}
            allowCreateWhileLoading={false}
            formatCreateLabel={() => null}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25:
                  muiTheme.palette.mode === "dark"
                    ? muiTheme.palette.bgSecondary.dark
                    : muiTheme.palette.bgSecondary.light,
                primary: "red",
                neutral0:
                  muiTheme.palette.mode === "dark"
                    ? muiTheme.palette.bgSecondary.dark
                    : muiTheme.palette.bgSecondary.light,
              },
            })}
          />
        </FormControl>
        <FormControl>
          <CreatableSelect
            styles={{
              control: (baseStyle, state) => ({
                ...baseStyle,
                borderRadius: "25px",
                padding: "0px 10px",
                boxSizing: "border-box",
                borderWidth: "1px",
                color: muiTheme.palette.textSecondary.light,
                backgroundColor: muiTheme.palette.bgSecondary.main,
                borderColor:
                  state.isFocused && state.isMulti
                    ? "transparent"
                    : "transparent",
                "&:hover": {
                  outline: 0,
                  borderColor: "transparent",
                },
              }),
              menuList: (baseStyle, state) => ({
                ...baseStyle,
                height: "150px",
              }),
            }}
            isMulti
            onChange={handleProductsQualificationChange}
            placeholder={t("terms_for_products")}
            options={productsQualificationOptions}
            allowCreateWhileLoading={false}
            formatCreateLabel={() => null}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25:
                  muiTheme.palette.mode === "dark"
                    ? muiTheme.palette.bgSecondary.dark
                    : muiTheme.palette.bgSecondary.light,
                primary: "red",
                neutral0:
                  muiTheme.palette.mode === "dark"
                    ? muiTheme.palette.bgSecondary.dark
                    : muiTheme.palette.bgSecondary.light,
              },
            })}
          />
        </FormControl>
        <FormControl>
          <CreatableSelect
            styles={{
              control: (baseStyle, state) => ({
                ...baseStyle,
                borderRadius: "25px",
                padding: "0px 10px",
                boxSizing: "border-box",
                borderWidth: "1px",
                color: muiTheme.palette.textSecondary.light,
                backgroundColor: muiTheme.palette.bgSecondary.main,
                borderColor:
                  state.isFocused && state.isMulti
                    ? "transparent"
                    : "transparent",
                "&:hover": {
                  outline: 0,
                  borderColor: "transparent",
                },
              }),
              menuList: (baseStyle, state) => ({
                ...baseStyle,
                height: "150px",
              }),
            }}
            isMulti
            onChange={handleCategoriesQualificationChange}
            placeholder={t("terms_for_categories")}
            options={categoriesQualifictaionOptions}
            allowCreateWhileLoading={false}
            formatCreateLabel={() => null}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25:
                  muiTheme.palette.mode === "dark"
                    ? muiTheme.palette.bgSecondary.dark
                    : muiTheme.palette.bgSecondary.light,
                primary: "red",
                neutral0:
                  muiTheme.palette.mode === "dark"
                    ? muiTheme.palette.bgSecondary.dark
                    : muiTheme.palette.bgSecondary.light,
              },
            })}
          />
        </FormControl>
        <FormControl sx={{ paddingX: 1 }}>
          <FormLabel id="status">{t("status")}</FormLabel>
          <RadioGroup
            row
            value={`${status}`}
            aria-labelledby="status"
            name="status"
            onChange={handleChangeEvent}
          >
            <FormControlLabel
              value={`${CouponStatus.ACTIVE}`}
              control={<Radio />}
              label={t("active")}
            />
            <FormControlLabel
              value={`${CouponStatus.INACTIVE}`}
              control={<Radio />}
              label={t("inactive")}
            />
          </RadioGroup>
        </FormControl>

        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <FormLabel>{t("for_first_purchase")}</FormLabel>
          <Checkbox
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFirstBuy(e.target.checked);
            }}
            checked={firstBuy}
            size="medium"
          />
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

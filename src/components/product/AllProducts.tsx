import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Theme,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import PaperBox from "../partials/PaperBox";
import Alert from "../alert/Alert";
import Loader from "../Loader/Loader";
import { alertInitialState, alertReducer } from "../alert/reducer/alertReducer";
import {
  AllProductsInterface,
  ProductsResponseInterface,
} from "./interfaces/interfaces";
import HttpRequest from "../../services/HttpRequest";
import { toPersianCurrency } from "../../services/Currency";
import Status from "./status/Status";
import DataList from "../partials/DataList";
import { useTranslation } from "react-i18next";

export default function AllProducts() {
  const { t } = useTranslation();

  const [products, setProducts] = React.useState<AllProductsInterface[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [alertState, alertDispatch] = React.useReducer(
    alertReducer,
    alertInitialState
  );

  const [page, setPage] = React.useState<number>(1);
  const [numOfPages, setNumOfPages] = React.useState<number>(0);
  const [perPage, setPerPage] = React.useState<number>(5);
  const [search, setSearch] = React.useState<string>("");

  const handleOnChangeFilterInput = (value: string) => {
    setSearch(value);
  };

  React.useEffect(() => {
    const httpRequest = new HttpRequest();
    httpRequest
      .get<ProductsResponseInterface>(
        `api/v1/admin/products?page=${page}&perPage=${perPage}&search=${search}`
      )
      .then((res) => {
        setProducts(res.data.products);
        setPerPage(res.data.perPage);
        setNumOfPages(Math.ceil(res.data.totalProducts / perPage));
        setIsLoading(false);
      });
  }, [page, search]);

  const handleDeleteProduct = (productID: string) => {
    const httpRequest = new HttpRequest();
    httpRequest.delete(`api/v1/admin/products/${productID}`).then((res) => {
      setProducts((prev) => prev.filter((product) => product.id !== productID));
      alertDispatch({
        type: "ALERT_SUCCESS",
        payload: t("success_msg"),
      });
    });
  };

  const headers = [
    t("pic"),
    t("title"),
    t("price"),
    t("stock_num"),
    t("created"),
    t("status"),
    t("operations"),
  ];

  const productsCell = products.length
    ? products.map((product) => {
        return (
          <TableRow key={product.id}>
            <TableCell align="center">
              <Box
                component={"img"}
                src={product.thumbnail}
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
                {product.title}
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
                {toPersianCurrency(product.price)}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontSize: (theme: Theme) => theme.spacing(1.2),
              }}
            >
              {product.stock}
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontSize: (theme: Theme) => theme.spacing(1.2) }}
            >
              {product.created_at.split(" ")[0]}
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontSize: (theme: Theme) => theme.spacing(1.2) }}
            >
              <Status status={product.status} />
            </TableCell>
            <TableCell align="center">
              <Link to={`/products/edit/${product.id}`}>
                <IconButton>
                  <BorderColorRoundedIcon fontSize="small" />
                </IconButton>
              </Link>

              <IconButton onClick={() => handleDeleteProduct(product.id)}>
                <DeleteSweepRoundedIcon fontSize="small" />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })
    : [];

  return (
    <DataList
      data={productsCell}
      loading={isLoading}
      header={headers}
      alertState={alertState}
      alertDispatch={alertDispatch}
      rows={5}
      cells={7}
      title={t("products")}
      page={page}
      setPage={setPage}
      numOfPages={numOfPages}
      filter
      handler={handleOnChangeFilterInput}
    />
  );
}

import React from "react";
import { IconButton, TableCell, TableRow } from "@mui/material";

import HttpRequest from "../../services/HttpRequest";
import { alertInitialState, alertReducer } from "../alert/reducer/alertReducer";
import DataList from "../partials/DataList";
import axios from "axios";
import {
  CommentInterface,
  CommentInterfaceResponse,
} from "./interfaces/interfaces";
import CommentStatusShow from "./status/CommentStatusShow";
import ShowAdviceToBuy from "./status/ShowAdviceToBuy";
import { useTranslation } from "react-i18next";

export default function AllComments() {
  const { t } = useTranslation();

  const [comments, setComments] = React.useState<CommentInterface[]>([]);
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
      .get<CommentInterfaceResponse>(
        `api/v1/comments?page=${page}&perPage=${perPage}`
      )
      .then((res) => {
        setComments(res.data.comments);
        setPerPage(res.data.perPage);
        setNumOfPages(Math.ceil(res.data.totalComments / perPage));
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
    t("title"),
    t("msg"),
    t("status"),
    t("advice"),
    t("created"),
  ];

  const commentsCell = comments.length
    ? comments.map((comment) => {
        return (
          <TableRow key={comment.id}>
            <TableCell sx={{ fontSize: 12 }} align="center">
              {comment.user.first_name}
            </TableCell>
            <TableCell sx={{ fontSize: 12 }} align="center">
              {comment.user.last_name}
            </TableCell>
            <TableCell sx={{ fontSize: 12 }} align="center">
              {comment.user.email}
            </TableCell>
            <TableCell sx={{ fontSize: 12 }} align="center">
              {comment.title}
            </TableCell>
            <TableCell sx={{ fontSize: 12 }} align="center">
              {comment.body.substring(0, 12)}...
            </TableCell>
            <TableCell sx={{ fontSize: 12 }} align="center">
              <CommentStatusShow status={comment.status} />
            </TableCell>
            <TableCell sx={{ fontSize: 12 }} align="center">
              <ShowAdviceToBuy status={comment.adviceToBuy} />
            </TableCell>
            <TableCell sx={{ fontSize: 12 }} align="center">
              {comment.createdAt.split(" ")[0]}
            </TableCell>
          </TableRow>
        );
      })
    : [];

  return (
    <DataList
      data={commentsCell}
      loading={isLoading}
      header={headers}
      alertState={alertState}
      alertDispatch={alertDispatch}
      rows={5}
      cells={5}
      title={t("comments")}
      page={page}
      setPage={setPage}
      numOfPages={numOfPages}
    />
  );
}

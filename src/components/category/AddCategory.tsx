import React, { useEffect } from "react";
import { Box, Button, FormControl } from "@mui/material";
import axios from "axios";

import PaperBox from "../partials/PaperBox";
import InputField from "../SearchForm/Input/InputField";
import AddButton from "./addButton/AddButton";
import AttributeGroup from "./AttributeGroup";
import {
  CategoryContext,
  CategoryContextInterface,
} from "./context/CategoryContext";
import ModalForm from "./modal/ModalForm";
import HttpRequest from "../../services/HttpRequest";
import { alertInitialState, alertReducer } from "../alert/reducer/alertReducer";
import Alert from "../alert/Alert";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { CategoryStateInterface } from "./context/CategoryReducer";

export default function AddNewCategory() {
  const { t } = useTranslation();

  const { state, dispatch } =
    React.useContext<CategoryContextInterface>(CategoryContext);

  const [alertState, alertDispatch] = React.useReducer(
    alertReducer,
    alertInitialState
  );

  const [open, setOpen] = React.useState<boolean>(false);

  const [title, setTitle] = React.useState<string>("");

  const [slug, setSlug] = React.useState<string>("");

  const [categoryTitle, setCategoryTitle] = React.useState<string>();

  const [categorySlug, setCategorySlug] = React.useState<string>();

  const [formErrors, setFormErrors] = React.useState<Map<string, string>>(
    new Map<string, string>()
  );

  const [error, setError] = React.useState<string>("");

  const { categoryID } = useParams();
  // const [category, setCategory] = React.useState<CategoryStateInterface | null>(
  //   null
  // );
  useEffect(() => {
    if (categoryID) {
      const http = new HttpRequest();
      http
        .get<CategoryStateInterface>(`api/v1/categories/${categoryID}`)
        .then((res) => {
          dispatch({
            type: "SET_CATEGORY",
            payload: res.data,
          });
          setCategoryTitle(res.data.title);
          setCategorySlug(res.data.slug);
        })
        .catch((err) => {
          console.log(err.response.data);
          setError("دسته بندی موردنظر پیدا نشد!");
        });
    } else {
      dispatch({
        type: "RESET_STATE",
        payload: null,
      });
      setCategoryTitle("");
      setCategorySlug("");
      setError("");
    }
  }, [categoryID]);

  const attrGroups = state.groups.length ? (
    state.groups.map((group, i) => {
      return (
        <AttributeGroup id={group.id} key={group.id} title={group.title} />
      );
    })
  ) : (
    <Box>{t("empty_group")}</Box>
  );

  function handleCategoryTitle(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value) {
      formErrors.delete("category_title");
      setFormErrors(formErrors);
      setCategoryTitle(e.target.value);
    } else {
      formErrors.set("category_title", "empty");
      setFormErrors(formErrors);
      setCategoryTitle("");
    }
  }

  function handleCategoryTitleBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (e.target.value) {
      dispatch({
        type: "ADD_NEW_CATEGORY_TITLE",
        payload: {
          title: categoryTitle,
        },
      });
    }
  }

  function handleCategorySlug(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.value) {
      formErrors.delete("category_slug");
      setFormErrors(formErrors);
      setCategorySlug(e.target.value);
    } else {
      setFormErrors(formErrors.set("category_slug", "empty"));
      setCategorySlug("");
    }
  }

  function handleCategorySlugBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (e.target.value) {
      dispatch({
        type: "ADD_NEW_CATEGORY_SLUG",
        payload: {
          slug: categorySlug,
        },
      });
    }
  }

  function handleSaveBtn(e: React.MouseEvent) {
    e.preventDefault();
    if (!categoryTitle && !categorySlug) {
      setFormErrors(formErrors.set("category_title", "empty"));
      setFormErrors(formErrors.set("category_slug", "empty"));
      alertDispatch({
        type: "ALERT_ERROR",
        payload: t("fill_fields_error"),
      });
      return;
    }

    let empty_attr = false;
    let empty_attributes = false;

    state.groups.forEach((group) => {
      group.attributes.forEach((attr) => {
        if (!attr.title || !attr.slug) {
          empty_attr = true;
          return;
        }
      });
    });

    state.groups.forEach((group) => {
      if (group.attributes.length === 0) {
        empty_attributes = true;
        return;
      }
    });

    if (state.groups.length === 0) {
      alertDispatch({
        type: "ALERT_ERROR",
        payload: t("one_group_error"),
      });
      return;
    }

    if (empty_attr) {
      alertDispatch({
        type: "ALERT_ERROR",
        payload: t("fill_filed_attr_error"),
      });
      return;
    }

    if (empty_attributes) {
      alertDispatch({
        type: "ALERT_ERROR",
        payload: t("one_group_attr_error"),
      });
      return;
    }

    const httpRequest = new HttpRequest();
    if (categoryID) {
      httpRequest
        .patch(`api/v1/categories/${categoryID}`, state)
        .then((res) => {
          alertDispatch({
            type: "ALERT_SUCCESS",
            payload: t("success_msg"),
          });
        })
        .catch((err: Error) => {
          if (axios.isAxiosError(err)) {
            alertDispatch({
              type: "ALERT_ERROR",
              payload: t("default_error"),
            });
          }
        });
    } else {
      httpRequest
        .post("api/v1/admin/categories", state, {})
        .then((res) => {
          // show notification with component and clear fields
          dispatch({
            type: "RESET_STATE",
            payload: null,
          });
          alertDispatch({
            type: "ALERT_SUCCESS",
            payload: t("success_msg"),
          });
          setCategorySlug("");
          setCategoryTitle("");
          setTitle("");
          setSlug("");
        })
        .catch((err: Error) => {
          if (axios.isAxiosError(err)) {
            alertDispatch({
              type: "ALERT_ERROR",
              payload: t("default_error"),
            });
          }
        });
    }
  }

  function showModal(e: React.MouseEvent) {
    if (categorySlug && categoryTitle) {
      setOpen(true);
    } else {
      setFormErrors(formErrors.set("category_title", "empty"));
      setFormErrors(formErrors.set("category_slug", "empty"));
      alertDispatch({
        type: "ALERT_ERROR",
        payload: t("fill_fields_error"),
      });
    }
  }

  function closeModal(e: React.MouseEvent) {
    setOpen(false);
  }

  function addNewAttrGroup(e: React.MouseEvent) {
    e.preventDefault();
    if (title && slug) {
      formErrors.delete("group_title");
      formErrors.delete("group_slug");
      setFormErrors(formErrors);
      dispatch({
        type: "ADD_NEW_GROUP",
        payload: {
          title,
          slug,
          attributes: [],
        },
      });
      setOpen(false);
      setTitle("");
      setSlug("");
    } else {
      alertDispatch({
        type: "ALERT_ERROR",
        payload: t("fill_fields_error"),
      });
      if (!title) {
        setFormErrors(formErrors.set("group_title", "empty"));
        setTitle("");
      }
      if (!slug) {
        setFormErrors(formErrors.set("group_slug", "empty"));
        setSlug("");
      }
    }
  }

  function handleCloseAlert(e?: React.SyntheticEvent | Event, reason?: string) {
    alertDispatch({
      type: "ALERT_CLOSE",
      payload: null,
    });
  }

  return (
    <PaperBox title={t("new_category")}>
      {error ? (
        <p>{error}</p>
      ) : (
        <Box
          paddingX={1}
          paddingY={2}
          component={"form"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={2}
        >
          <Box
            width={"100%"}
            component={"div"}
            display={"flex"}
            alignItems={"center"}
            gap={2}
          >
            <FormControl>
              <InputField
                value={categoryTitle}
                placeholder={t("title")}
                required
                error={formErrors.has("category_title")}
                onChangeHandler={handleCategoryTitle}
                onBlurHandler={handleCategoryTitleBlur}
              />
            </FormControl>
            <FormControl>
              <InputField
                value={categorySlug}
                required
                onChangeHandler={handleCategorySlug}
                onBlurHandler={handleCategorySlugBlur}
                error={formErrors.has("category_slug")}
                placeholder={t("slug")}
              />
            </FormControl>
            <Box flexShrink={"0"}>
              <AddButton onClickHandler={showModal} text={t("add_new_group")} />
            </Box>
          </Box>

          <>{attrGroups}</>
          <FormControl sx={{ alignSelf: "flex-end" }}>
            <Button
              onClick={handleSaveBtn}
              type="submit"
              disabled={formErrors.size > 0}
              sx={{
                alignSelf: "flex-end",
                backgroundColor: "primary.main",
                color: "textPrimary.main",
                "&:hover": {
                  backgroundColor: "#4931BE",
                },
                marginTop: 0.5,
              }}
            >
              {t("save")}
            </Button>
          </FormControl>
        </Box>
      )}

      <ModalForm
        title={t("add_new_group")}
        open={open}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
        onCloseHandler={closeModal}
        onSubmitHandler={addNewAttrGroup}
      >
        <>
          <InputField
            value={title}
            onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value) {
                formErrors.delete("group_title");
                setFormErrors(formErrors);
                setTitle(e.target.value);
              } else {
                setTitle("");
                setFormErrors(formErrors.set("group_title", "empty"));
              }
            }}
            placeholder={t("title")}
            size={20}
            error={formErrors.has("group_title")}
          />
          <InputField
            value={slug}
            onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value) {
                formErrors.delete("group_slug");
                setFormErrors(formErrors);
                setSlug(e.target.value);
              } else {
                setSlug("");
                setFormErrors(formErrors.set("group_slug", "empty"));
              }
            }}
            placeholder={t("slug")}
            size={20}
            error={formErrors.has("group_slug")}
          />
        </>
      </ModalForm>

      <Alert
        open={alertState.open}
        message={alertState.message}
        type={alertState.type}
        handleClose={handleCloseAlert}
      />
    </PaperBox>
  );
}

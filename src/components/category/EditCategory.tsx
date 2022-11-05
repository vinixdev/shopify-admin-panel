import React from "react";
import { Box, Button } from "@mui/material";
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

export default function AddNewCategory() {
  const { state, dispatch } =
    React.useContext<CategoryContextInterface>(CategoryContext);

  const [alertState, alertDispatch] = React.useReducer(
    alertReducer,
    alertInitialState
  );

  const [open, setOpen] = React.useState<boolean>(false);

  const [title, setTitle] = React.useState<string>("");

  const [categoryTitle, setCategoryTitle] = React.useState<string>("");

  const [categorySlug, setCategorySlug] = React.useState<string>("");

  const [slug, setSlug] = React.useState<string>("");

  const attrGroups = state.groups.length ? (
    state.groups.map((group, i) => {
      return (
        <AttributeGroup id={group.id} key={group.id} title={group.title} />
      );
    })
  ) : (
    <Box>گروه جدیدی اضافه کنید</Box>
  );

  function handleCategoryTitleBlur(
    e: React.FocusEvent<HTMLInputElement>
  ): void {
    e.preventDefault();
    setCategoryTitle(e.currentTarget.value);
    dispatch({
      type: "ADD_NEW_CATEGORY_TITLE",
      payload: {
        title: e.currentTarget.value,
      },
    });
  }

  function handleCategorySlug(e: React.FocusEvent<HTMLInputElement>) {
    e.preventDefault();
    setCategorySlug(e.currentTarget.value);
    dispatch({
      type: "ADD_NEW_CATEGORY_SLUG",
      payload: {
        slug: e.currentTarget.value,
      },
    });
  }

  function handleSaveBtn(e: React.MouseEvent) {
    e.preventDefault();
    if (!categoryTitle || !categorySlug) {
      return;
    }
    const httpRequest = new HttpRequest();
    httpRequest
      .post("api/v1/categories", state, {})
      .then((res) => {
        // show notification with component and clear fields
        alertDispatch({
          type: "ALERT_SUCCESS",
          payload: "عملیات با موفقیت انجام شد.",
        });
      })
      .catch((err: Error) => {
        if (axios.isAxiosError(err)) {
          alertDispatch({
            type: "ALERT_ERROR",
            payload: "خطایی رخ داده است.",
          });
          console.log(err.message);
        }
      });
  }

  function showModal(e: React.MouseEvent) {
    setOpen(true);
  }
  function closeModal(e: React.MouseEvent) {
    setOpen(false);
  }

  function addNewAttrGroup(e: React.MouseEvent) {
    e.preventDefault();
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
  }

  function handleCloseAlert(e?: React.SyntheticEvent | Event, reason?: string) {
    alertDispatch({
      type: "ALERT_CLOSE",
      payload: null,
    });
  }

  return (
    <PaperBox title="اضافه کردن دسته بندی جدید">
      <Box
        paddingX={1}
        paddingY={2}
        component={"form"}
        display={"flex"}
        alignItems={"center"}
        gap={2}
      >
        <InputField
          value={categoryTitle}
          placeholder="عنوان دسته بندی - فارسی"
          onBlurHandler={handleCategoryTitleBlur}
        />
        <InputField
          value={categorySlug}
          onBlurHandler={handleCategorySlug}
          placeholder="اسلاگ دسته بندی - انگلیسی"
        />
        <Box flexShrink={"0"}>
          <AddButton onClickHandler={showModal} text={"اضافه کردن گروه جدید"} />
        </Box>
      </Box>
      <>{attrGroups}</>
      <Button
        onClick={handleSaveBtn}
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
        ذخیره سازی
      </Button>
      <ModalForm
        title="اضافه کردن گروه جدید"
        open={open}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
        onCloseHandler={closeModal}
        onSubmitHandler={addNewAttrGroup}
      >
        <>
          <InputField
            value={title}
            onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.currentTarget.value)
            }
            placeholder="عنوان گروه وارد کنید - فارسی"
            size={20}
          />
          <InputField
            value={slug}
            onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSlug(e.currentTarget.value)
            }
            placeholder="اسلاگ گروه وارد کنید - انگلیسی"
            size={20}
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

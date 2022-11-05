import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  NativeSelect,
  Stack,
  LinearProgress,
} from "@mui/material";

import { debounce } from "lodash";
import { AxiosProgressEvent } from "axios";

import PaperBox from "../partials/PaperBox";
import InputField from "../SearchForm/Input/InputField";
import UploadBox from "./uploadBox/UploadBox";
import HttpRequest from "../../services/HttpRequest";
import InputSelectCustomize from "./Select/SelectInput";
import ProductCategoryAtteributes from "./ProductCategoryAtteributes";
import { CategoriesInterface, ProductCategory } from "./interfaces/interfaces";
import { editProductReducer, initialState } from "./reducer/editProductReducer";
import Alert from "../alert/Alert";
import Section from "../partials/Section";
import { alertInitialState, alertReducer } from "../alert/reducer/alertReducer";
import EditVariant from "./variant/EditVariant";

export default function EditProduct() {
  // const [categories, setCategories] = React.useState<CategoriesInterface[]>([]);
  // const [selectedCategory, setSelectedCategory] =
  //   React.useState<ProductCategory | null>(null)

  const [state, dispatch] = React.useReducer(editProductReducer, initialState);
  const [progress, setProgress] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);

  const [alertState, alertDispatch] = React.useReducer(
    alertReducer,
    alertInitialState
  );

  // const [alertOption, setAlertOption] = React.useState<AlertOptionInterface>({
  //   message: "",
  //   type: "success",
  //   open: false,
  // });

  const http = new HttpRequest();

  React.useEffect(() => {
    http
      .get<CategoriesInterface[]>(
        "api/v1/categories?select[]=title&select[]=slug"
      )
      .then((res) => {
        // setCategories(res.data);
        dispatch({
          type: "SET_CATEGORIES",
          payload: res.data,
        });
      });
  }, []);

  function handleSelectCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    if (value) {
      http.get<ProductCategory>(`api/v1/categories/${value}`).then((res) => {
        // setSelectedCategory(res.data);
        dispatch({
          type: "SET_SELECTED_CATEGORIES",
          payload: res.data,
        });
      });
    } else {
      // setSelectedCategory(null);
      dispatch({
        type: "SET_SELECTED_CATEGORIES",
        payload: null,
      });
    }
  }

  const changeAtteributeValue = debounce(
    (value: string, groupId: string, attrId: string) => {
      console.log(value);
      // setSelectedCategory((prev) => {
      //   if (prev) {
      //     return {
      //       ...prev,
      //       groups: prev.groups.map((group) => {
      //         if (group.id === groupId) {
      //           group.attributes.map((attr) => {
      //             if (attr.id === attrId) {
      //               attr.value = value;
      //             }
      //             return attr;
      //           });
      //         }
      //         return group;
      //       }),
      //     };
      //   }
      //   return null;
      // });
      dispatch({
        type: "UPDATE_ATTRIBUTE_VALUE",
        payload: {
          value,
          groupId,
          attrId,
        },
      });
    },
    1500
  );

  function handleAtteributeValue(
    value: string,
    groupId: string,
    attrId: string
  ) {
    changeAtteributeValue(value, groupId, attrId);
  }

  function handleCloseAlert() {
    alertDispatch({
      type: "ALERT_CLOSE",
      payload: null,
    });
  }

  function handleSaveBtn(e: React.MouseEvent) {
    e.preventDefault();
    setProgress(0);
    const form = new FormData();
    form.append("thumbnail", state.thumbnail as Blob);
    state.gallery.forEach((img) => {
      form.append("gallery[]", img as Blob);
    });
    http
      .post("api/v1/products", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const amount: number =
              (progressEvent.loaded * 100) / progressEvent.total;
            setProgress(Math.round(amount));
          }
        },
      })
      .then((res) => {
        console.log(res.data);
        alertDispatch({
          type: "ALERT_SUCCESS",
          payload: "عملیات با موفقیت انجام شد.",
        });
      })
      .catch((err) => {
        if (err) {
          alertDispatch({
            type: "ALERT_ERROR",
            payload: "خطایی رخ داده است.",
          });
        }
      });
  }

  return (
    <PaperBox title="اضافه / ویرایش محصول">
      <Box component={"form"} display={"flex"} flexDirection={"column"} gap={1}>
        <Stack direction={"row"} gap={1}>
          <Stack width={"fit-content"} gap={1}>
            <FormControl>
              <InputField required={true} placeholder="عنوان محصول" />
            </FormControl>
            <FormControl>
              <InputField required={true} placeholder="قیمت محصول" />
            </FormControl>
            <FormControl>
              <InputField required={true} placeholder="قیمت ویژه" />
            </FormControl>
            <FormControl>
              <InputField required={true} placeholder="تعداد موجود" />
            </FormControl>
            <FormControl>
              <NativeSelect
                onChange={handleSelectCategory}
                required={true}
                input={<InputSelectCustomize />}
              >
                <option aria-label="None" value="">
                  انتخاب دسته بندی
                </option>
                {state.categories.length
                  ? state.categories.map((category) => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      );
                    })
                  : null}
              </NativeSelect>
            </FormControl>
          </Stack>
          <Stack direction={"row"} gap={1}>
            <UploadBox
              width={"100%"}
              height={"100%"}
              title={"برای آپلود عکس شاخص کلیک کنید"}
              handler={(file: File) =>
                dispatch({ type: "SET_THUMBNAIL", payload: file })
              }
            />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <UploadBox
                  width={"100%"}
                  height={"100%"}
                  title={"برای آپلود عکس گالری کلیک کنید"}
                  fontSize={8}
                  handler={(file: File) =>
                    dispatch({ type: "ADD_ITEM_TO_GALLERY", payload: file })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <UploadBox
                  width={"100%"}
                  height={"100%"}
                  title={"برای آپلود عکس گالری کلیک کنید"}
                  fontSize={8}
                  handler={(file: File) =>
                    dispatch({ type: "ADD_ITEM_TO_GALLERY", payload: file })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <UploadBox
                  width={"100%"}
                  height={"100%"}
                  title={"برای آپلود عکس گالری کلیک کنید"}
                  fontSize={8}
                  handler={(file: File) =>
                    dispatch({ type: "ADD_ITEM_TO_GALLERY", payload: file })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <UploadBox
                  width={"100%"}
                  height={"100%"}
                  title={"برای آپلود عکس گالری کلیک کنید"}
                  fontSize={8}
                  handler={(file: File) =>
                    dispatch({ type: "ADD_ITEM_TO_GALLERY", payload: file })
                  }
                />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
        <LinearProgress
          sx={{
            backgroundColor: "transparent",
            direction: "rtl",
            zIndex: "99999",
            marginY: 1,
          }}
          value={progress}
          variant="determinate"
        />

        <Grid container spacing={2} marginTop={1}>
          {state.selectedCategory
            ? state.selectedCategory.groups.map((group) => {
                return (
                  <Grid key={group.id} item xs={4}>
                    <ProductCategoryAtteributes
                      handler={handleAtteributeValue}
                      title={group.title}
                      slug={group.slug}
                      id={group.id}
                      attributes={group.attributes}
                    />
                  </Grid>
                );
              })
            : null}
        </Grid>

        <Section
          header="متغیرهای محصول"
          btnTitle="اضافه کردن متغیر محصول جدید"
          onClickHandler={(e: React.MouseEvent) => setOpen(true)}
        >
          <></>
        </Section>

        <Section
          header="متغیرهای قیمت"
          btnTitle="اضافه کردن متغیر قیمت جدید"
          onClickHandler={(e: React.MouseEvent) => console.log("Yeah!")}
        >
          <></>
        </Section>

        <FormControl>
          <Button
            type="submit"
            sx={{
              alignSelf: "flex-end",
              backgroundColor: "primary.main",
              color: "textPrimary.main",
              "&:hover": {
                backgroundColor: "#4931BE",
              },
              marginTop: 0.5,
            }}
            onClick={handleSaveBtn}
          >
            ذخیره سازی
          </Button>
        </FormControl>
      </Box>
      <Alert
        type={alertState.type}
        message={alertState.message}
        open={alertState.open}
        handleClose={handleCloseAlert}
      />
      <EditVariant
        open={open}
        onSubmitHandler={(variant: any) => console.log(variant)}
        onCloseHandler={(e: React.MouseEvent) => setOpen(false)}
      />
    </PaperBox>
  );
}

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
import {
  CategoriesInterface,
  CategoriesResponse,
  ProductCategory,
} from "./interfaces/interfaces";
import Alert from "../alert/Alert";
import Section from "../partials/Section";
import { alertInitialState, alertReducer } from "../alert/reducer/alertReducer";
import EditVariant, { VariantItemInterface } from "./variant/EditVariant";
import EditVariantPrice, { VariantPrice } from "./variant/EditVariantPrice";
import Varient from "./variant/Varient";
import {
  EditProductContext,
  EditProductContextInterface,
} from "./context/editProductContext";
import VariantPriceItem from "./variant/VariantPriceItem";
import {
  emptyValidation,
  numberValidation,
  zeroValidation,
} from "./validation/validation";
import { useTranslation } from "react-i18next";
import { EditProductStateInterface } from "./reducer/editProductReducer";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const { t } = useTranslation();

  const { state, dispatch } =
    React.useContext<EditProductContextInterface>(EditProductContext);
  const [progress, setProgress] = React.useState<number>(0);
  const [editVariantOpen, setEditVariantOpen] = React.useState<boolean>(false);
  const [editVariantPriceOpen, setEditVariantPriceOpen] =
    React.useState<boolean>(false);

  const [alertState, alertDispatch] = React.useReducer(
    alertReducer,
    alertInitialState
  );

  const [formErrors, setFormErrors] = React.useState<Map<string, boolean>>(
    new Map<string, boolean>()
  );

  const [title, setTitle] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("");
  const [specialPrice, setSpecialPrice] = React.useState<string>("");
  const [inventory, setInventory] = React.useState<string>("");
  const [categoryId, setCategoryId] = React.useState<string>("");
  // const [categories, setCategories] = React.useState<CategoriesInterface[]>([])
  const [error, setError] = React.useState<string>("");

  const [thumbnailError, setThumbnailError] = React.useState<boolean>(false);

  const http = new HttpRequest();

  const { productID } = useParams();

  React.useEffect(() => {
    if (productID) {
      http
        .get<EditProductStateInterface>(`api/v1/admin/products/${productID}`)
        .then((res) => {
          console.log(res.data);

          dispatch({
            type: "SET_PRODUCT",
            payload: res.data,
          });

          setTitle(res.data.title || "");
          setPrice(`${res.data.price}` || "");
          setSpecialPrice(`${res.data.specialPrice}` || "");
          setInventory(res.data.stock || "");
          setCategoryId(`${res.data.category?.id}` || "");
        })
        .catch((err) => {
          console.log(err.response.data.message);
          console.log(err.response.data.error);
          setError("سفارش موردنظر پیدا نشد!");
          setTitle("");
          setPrice("");
          setSpecialPrice("");
          setInventory("");
          setCategoryId("");
        });
    } else {
      dispatch({
        type: "RESET_STATE",
        payload: null,
      });
      setError("");
      setTitle("");
      setPrice("");
      setSpecialPrice("");
      setInventory("");
      setCategoryId("");
    }
  }, [productID]);

  React.useEffect(() => {
    http.get<CategoriesResponse>("api/v1/admin/categories").then((res) => {
      // setCategories(res.data.categories);
      // console.log(res.data.categories);

      dispatch({
        type: "SET_CATEGORIES",
        payload: res.data.categories,
      });
    });
  }, []);

  const changeAtteributeValue = debounce(
    (value: string, groupId: string, attrId: string) => {
      dispatch({
        type: "UPDATE_ATTRIBUTE_VALUE",
        payload: {
          value,
          groupId,
          attrId,
        },
      });
    },
    500
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

  function handleSubmitVariant(variant: VariantItemInterface) {
    dispatch({
      type: "ADD_VARIANT",
      payload: {
        title: variant.title,
        slug: variant.slug,
        type: variant.type,
      },
    });
    setEditVariantOpen(false);
  }

  function handleSubmitVariantPrice(variantPrice: VariantPrice) {
    dispatch({
      type: "ADD_VARIANT_PRICE",
      payload: variantPrice,
    });
    setEditVariantPriceOpen(false);
  }

  function handleSaveBtn(e: React.MouseEvent) {
    e.preventDefault();
    setProgress(0);

    if (!title) {
      setFormErrors(formErrors.set("title", true));
    }

    if (!price) {
      setFormErrors(formErrors.set("price", true));
    }

    if (!inventory) {
      setFormErrors(formErrors.set("inventory", true));
    }

    if (!categoryId) {
      setFormErrors(formErrors.set("category", true));
    }

    if (title && price && inventory && categoryId !== "None") {
      let empty_attr = false;
      if (state.selectedCategory) {
        state.selectedCategory.groups.forEach((group) => {
          group.attributes.forEach((attr) => {
            if (!attr.value) {
              empty_attr = true;
            }
          });
        });
      }
      if (empty_attr) {
        alertDispatch({
          type: "ALERT_ERROR",
          payload: t("fill_filed_attr_error"),
        });
        return;
      }

      const form = new FormData();

      form.append("title", title);
      form.append("price", `${price}`);
      form.append("stock", `${inventory}`);
      form.append("category", categoryId);

      if (specialPrice) {
        form.append("specialPrice", `${specialPrice}`);
      }
      if (state.thumbnail === null) {
        setThumbnailError(true);
        alertDispatch({
          type: "ALERT_ERROR",
          payload: t("thumbnail_upload_error"),
        });
        return;
      }
      form.append("thumbnail", state.thumbnail as Blob);
      // state.gallery.forEach((img) => {
      //   form.append("gallery", img as Blob);
      // });
      if (state.itemOne) {
        form.append("gallery", state.itemOne);
      }

      if (state.itemTwo) {
        form.append("gallery", state.itemTwo);
      }

      if (state.itemThree) {
        form.append("gallery", state.itemThree);
      }

      if (state.itemFour) {
        form.append("gallery", state.itemFour);
      }

      form.append("attributes", JSON.stringify(state.selectedCategory?.groups));

      form.append("variants", JSON.stringify(state.variants));

      form.append("variantsPrice", JSON.stringify(state.variantsPrice));

      if (productID) {
        http
          .patch(`api/v1/admin/products/${productID}`, form, {})
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
      } else {
        http
          .post("api/v1/admin/products", form, {})
          .then((res) => {
            alertDispatch({
              type: "ALERT_SUCCESS",
              payload: t("success_msg"),
            });
            dispatch({
              type: "RESET_STATE",
              payload: null,
            });
            setTitle("");
            setPrice("");
            setSpecialPrice("");
            setInventory("");
            setCategoryId("");
          })
          .catch((err) => {
            alertDispatch({
              type: "ALERT_ERROR",
              payload: err.response.data.message,
            });
          });
      }
    } else {
      alertDispatch({
        type: "ALERT_ERROR",
        payload: t("fill_fields_error"),
      });
    }
  }

  function handleSelectCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    if (value) {
      formErrors.delete(e.target.name);
      setFormErrors(formErrors);
      setCategoryId(e.target.value);
      http
        .get<ProductCategory>(`api/v1/admin/categories/${value}`)
        .then((res) => {
          dispatch({
            type: "SET_SELECTED_CATEGORIES",
            payload: res.data,
          });
        });
    } else {
      setFormErrors(formErrors.set(e.target.name, true));
      setCategoryId("");
      dispatch({
        type: "SET_SELECTED_CATEGORIES",
        payload: null,
      });
    }
  }

  return (
    <PaperBox title={t("edit_product")}>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <Box
            component={"form"}
            sx={[
              {
                display: "flex",
              },
            ]}
            flexDirection={"column"}
            gap={1}
          >
            <Stack
              direction={"row"}
              sx={[
                (theme) => ({
                  [theme.breakpoints.down("md")]: {
                    flexWrap: "wrap",
                  },
                }),
              ]}
              gap={1}
            >
              <Stack width={"fit-content"} gap={1}>
                <FormControl>
                  <InputField
                    value={title}
                    required={true}
                    placeholder={t("title")}
                    name="title"
                    onChangeHandler={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const isEmpty = emptyValidation(e.target.value);
                      if (isEmpty) {
                        setFormErrors(formErrors.set(e.target.name, true));
                        setTitle("");
                        return;
                      }
                      formErrors.delete(e.target.name);
                      setFormErrors(formErrors);
                      setTitle(e.target.value);
                    }}
                    error={formErrors.has("title")}
                  />
                </FormControl>
                <FormControl>
                  <InputField
                    value={price}
                    required={true}
                    placeholder={t("price")}
                    name="price"
                    onChangeHandler={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const isEmpty = emptyValidation(e.target.value);
                      const isNumber = numberValidation(
                        e.target.value,
                        alertDispatch
                      );
                      const isZero = zeroValidation(
                        e.target.value,
                        alertDispatch
                      );
                      if (isEmpty || isZero || !isNumber) {
                        setFormErrors(formErrors.set(e.target.name, true));
                        setPrice("");
                        return;
                      }
                      formErrors.delete(e.target.name);
                      setFormErrors(formErrors);
                      setPrice(e.target.value);
                    }}
                    error={formErrors.has("price")}
                  />
                </FormControl>
                <FormControl>
                  <InputField
                    value={specialPrice}
                    placeholder={t("special_price")}
                    name="specialPrice"
                    onChangeHandler={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const isNumber = numberValidation(
                        e.target.value,
                        alertDispatch
                      );
                      if (!isNumber) {
                        setFormErrors(formErrors.set(e.target.name, true));
                        setSpecialPrice("");
                        return;
                      }
                      formErrors.delete(e.target.name);
                      setFormErrors(formErrors);
                      setSpecialPrice(e.target.value);
                    }}
                    error={formErrors.has("specialPrice")}
                  />
                </FormControl>
                <FormControl>
                  <InputField
                    value={inventory}
                    required={true}
                    name="inventory"
                    placeholder={t("stock")}
                    onChangeHandler={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const isEmpty = emptyValidation(e.target.value);
                      const isNumber = numberValidation(
                        e.target.value,
                        alertDispatch
                      );
                      const isZero = zeroValidation(
                        e.target.value,
                        alertDispatch
                      );
                      if (isEmpty || isZero || !isNumber) {
                        setFormErrors(formErrors.set(e.target.name, true));
                        setInventory("");
                        return;
                      }
                      formErrors.delete(e.target.name);
                      setFormErrors(formErrors);
                      setInventory(e.target.value);
                    }}
                    error={formErrors.has("inventory")}
                  />
                </FormControl>
                <FormControl>
                  <NativeSelect
                    onChange={handleSelectCategory}
                    required={true}
                    value={categoryId}
                    input={<InputSelectCustomize />}
                    name={"category"}
                    error={formErrors.has("category")}
                  >
                    <option value="">{t("choose_category")}</option>
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
              <Stack
                direction={"row"}
                sx={[
                  (theme) => ({
                    [theme.breakpoints.down("md")]: {
                      height: theme.spacing(30),
                    },
                  }),
                ]}
                gap={1}
              >
                <UploadBox
                  width={"100%"}
                  height={"100%"}
                  title={t("thumbnail_upload")}
                  url={(state.thumbnail as string) || null}
                  handler={(file: File) =>
                    dispatch({ type: "SET_THUMBNAIL", payload: file })
                  }
                  error={thumbnailError}
                />
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <UploadBox
                      width={"100%"}
                      height={"100%"}
                      title={t("gallery_upload")}
                      fontSize={8}
                      url={(state.itemOne as string) || null}
                      handler={(file: File) =>
                        dispatch({ type: "ADD_GALLERY_1", payload: file })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <UploadBox
                      width={"100%"}
                      height={"100%"}
                      title={t("gallery_upload")}
                      url={(state.itemTwo as string) || null}
                      fontSize={8}
                      handler={(file: File) =>
                        dispatch({ type: "ADD_GALLERY_2", payload: file })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <UploadBox
                      width={"100%"}
                      height={"100%"}
                      title={t("gallery_upload")}
                      url={(state.itemThree as string) || null}
                      fontSize={8}
                      handler={(file: File) =>
                        dispatch({ type: "ADD_GALLERY_3", payload: file })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <UploadBox
                      width={"100%"}
                      height={"100%"}
                      title={t("gallery_upload")}
                      url={(state.itemFour as string) || null}
                      fontSize={8}
                      handler={(file: File) =>
                        dispatch({ type: "ADD_GALLERY_4", payload: file })
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

            <Grid container spacing={2} marginTop={1} alignItems={"stretch"}>
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
              header={t("product_variants")}
              btnTitle={t("add_variant")}
              onClickHandler={(e: React.MouseEvent) => setEditVariantOpen(true)}
            >
              <Stack direction={"column"} gap={2}>
                {state.variants.length
                  ? state.variants
                      .map((variant) => {
                        return <Varient key={variant.hash} variant={variant} />;
                      })
                      .reverse()
                  : ""}
              </Stack>
            </Section>

            <Section
              header={t("price_variants")}
              btnTitle={t("add_price_variant")}
              onClickHandler={(e: React.MouseEvent) => {
                if (state.variants.length) {
                  setEditVariantPriceOpen(true);
                } else {
                  alertDispatch({
                    type: "ALERT_ERROR",
                    payload: t("first_add_variant_error"),
                  });
                }
              }}
            >
              <Stack direction={"column"} gap={1}>
                {state.variantsPrice.length
                  ? state.variantsPrice.map((vp) => {
                      return <VariantPriceItem key={vp.hash} vp={vp} />;
                    })
                  : ""}
              </Stack>
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
                {t("save")}
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
            open={editVariantOpen}
            onSubmitHandler={handleSubmitVariant}
            onCloseHandler={(e: React.MouseEvent) => setEditVariantOpen(false)}
          />
          <EditVariantPrice
            open={editVariantPriceOpen}
            variants={state.variants}
            onSubmitHandler={handleSubmitVariantPrice}
            onCloseHandler={() => setEditVariantPriceOpen(false)}
          />
        </>
      )}
    </PaperBox>
  );
}

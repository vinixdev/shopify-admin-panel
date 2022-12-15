import React from "react";
import {
  Box,
  FormControl,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import PriceChangeRoundedIcon from "@mui/icons-material/PriceChangeRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import ModalForm from "../../category/modal/ModalForm";
import InputField from "../../SearchForm/Input/InputField";
import { VariantInterface } from "../reducer/editProductReducer";
import ColorVariant from "./ColorVariant";
import DropdownVariant from "./DropdownVariant";
import {
  EditProductContext,
  EditProductContextInterface,
} from "../context/editProductContext";
import { useTranslation } from "react-i18next";

interface VariantProps {
  variant: VariantInterface;
}

export default function Varient({ variant }: VariantProps) {
  const { t } = useTranslation();

  const [open, setOpen] = React.useState<boolean>(false);
  const [itemTitle, setItemTitle] = React.useState<string>("");
  const [itemValue, setItemValue] = React.useState<string>("");

  const { dispatch } =
    React.useContext<EditProductContextInterface>(EditProductContext);

  function onCloseHandler(e: React.MouseEvent) {
    setOpen(false);
  }

  function onClickHandler(e: React.MouseEvent) {
    setOpen(true);
  }

  function onSubmitHandler(e: React.MouseEvent) {
    dispatch({
      type: "ADD_VARIANT_ITEM",
      payload: {
        title: itemTitle,
        value: itemValue,
        variantId: variant.hash,
      },
    });
    setItemTitle("");
    setItemValue("");
    setOpen(false);
  }

  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} paddingX={1} gap={1}>
        <PriceChangeRoundedIcon />
        <Typography variant="h6" fontSize={14} fontWeight={500}>
          {variant.title}
        </Typography>
        <Tooltip title={t("add_item")} sx={{ marginLeft: "auto" }}>
          <IconButton onClick={onClickHandler}>
            <LibraryAddRoundedIcon />
          </IconButton>
        </Tooltip>

        <ModalForm
          title={t("add_item")}
          open={open}
          onCloseHandler={onCloseHandler}
          onSubmitHandler={onSubmitHandler}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <>
            <FormControl>
              <InputField
                onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setItemTitle(e.target.value)
                }
                value={itemTitle}
                placeholder={t("title")}
              />
            </FormControl>

            {variant.type === "color" ? (
              <FormControl sx={{ alignSelf: "flex-start" }}>
                <InputField
                  onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setItemValue(e.target.value)
                  }
                  type={"color"}
                  placeholder={t("value")}
                  value={itemValue}
                />
              </FormControl>
            ) : (
              <FormControl>
                <InputField
                  onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setItemValue(e.target.value)
                  }
                  type="text"
                  placeholder={t("value")}
                  value={itemValue}
                />
              </FormControl>
            )}
          </>
        </ModalForm>
      </Stack>
      <Box paddingX={1}>
        {variant.items.length
          ? variant.items.map((item) => {
              if (variant.type === "color") {
                return (
                  <ColorVariant
                    key={item.hash}
                    title={item.title}
                    value={item.value}
                  />
                );
              }
              return (
                <DropdownVariant
                  key={item.hash}
                  title={item.title}
                  value={item.value}
                />
              );
            })
          : null}
      </Box>
    </Box>
  );
}

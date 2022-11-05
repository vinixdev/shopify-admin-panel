import React from "react";
import { FormControlLabel, IconButton, Stack, Switch } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import InputField from "../SearchForm/Input/InputField";
import {
  CategoryContext,
  CategoryContextInterface,
} from "./context/CategoryContext";

export interface AttributeProps {
  title: string;
  slug: string;
  filterable: false;
  hasPrice: false;
  groupPk: string;
  id: string;
}

export default function Attribute({
  title,
  slug,
  filterable,
  hasPrice,
  groupPk,
  id,
}: AttributeProps) {
  const { dispatch } =
    React.useContext<CategoryContextInterface>(CategoryContext);

  function removeAttribute(e: React.MouseEvent): void {
    e.preventDefault();
    dispatch({
      type: "REMOVE_ATTRIBUTE",
      payload: {
        groupPk,
        id,
      },
    });
  }

  function onBlurInputHandler(e: React.FocusEvent<HTMLInputElement>) {
    e.preventDefault();

    dispatch({
      type: "UPDATE_ATTERIBUTE",
      payload: {
        [e.currentTarget.name]: e.currentTarget.value,
        name: [e.currentTarget.name],
        attrPk: id,
        groupPk: groupPk,
      },
    });
  }

  function onCheckedHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    dispatch({
      type: "UPDATE_ATTERIBUTE",
      payload: {
        [e.currentTarget.name]: e.currentTarget.checked,
        name: [e.currentTarget.name],
        attrPk: id,
        groupPk: groupPk,
      },
    });
  }

  return (
    <Stack gap={1} direction={"row"} component={"form"} alignItems="center">
      <IconButton onClick={removeAttribute} sx={{ width: "fit-content" }}>
        <CancelRoundedIcon color="primary" />
      </IconButton>
      <InputField
        onBlurHandler={onBlurInputHandler}
        placeholder="عنوان ویژگی - فارسی"
        value={title}
        size={20}
        name="title"
        field_id="title"
      />
      <InputField
        onBlurHandler={onBlurInputHandler}
        name="slug"
        field_id="slug"
        placeholder="اسلاگ ویژگی - انگلیسی"
        value={slug}
        size={20}
      />
      <FormControlLabel
        sx={{
          flexShrink: "0",
        }}
        control={
          <Switch
            onChange={onCheckedHandler}
            name="filterable"
            id="filterable"
            checked={filterable}
            size="small"
          />
        }
        label="قابل فیلتر"
      />
      <FormControlLabel
        sx={{
          flexShrink: "0",
        }}
        control={
          <Switch
            name="hasPrice"
            id="hasPrice"
            checked={hasPrice}
            size="small"
            onChange={onCheckedHandler}
          />
        }
        label="تاثیر روی قیمت"
      />
    </Stack>
  );
}

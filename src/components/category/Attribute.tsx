import React from "react";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
} from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import InputField from "../SearchForm/Input/InputField";
import {
  CategoryContext,
  CategoryContextInterface,
} from "./context/CategoryContext";
import { useTranslation } from "react-i18next";
import { AttributeInterface } from "./context/CategoryReducer";

export interface AttributeProps {
  groupPk: string;
  id: string;
}

export default function Attribute({ groupPk, id }: AttributeProps) {
  const { t } = useTranslation();
  const { state, dispatch } =
    React.useContext<CategoryContextInterface>(CategoryContext);

  const [formErrors, setFormErrors] = React.useState<Map<string, boolean>>(
    new Map<string, boolean>()
  );

  const [titleValue, setTitleValue] = React.useState<string>("");
  const [slugValue, setSlugValue] = React.useState<string>("");

  const [filterableValue, setFilterableValue] = React.useState<boolean>(false);
  const [hasPriceValue, setHasPriceValue] = React.useState<boolean>(false);

  // const [attr, setAttr] = React.useState<AttributeInterface | null>(null);

  React.useEffect(() => {
    const group = state.groups.find((group) => group.id === groupPk);
    const attribute = group?.attributes.find((att) => att.id === id);
    setTitleValue(attribute?.title || "");
    setSlugValue(attribute?.slug || "");
    setFilterableValue(attribute?.filterable || false);
    setHasPriceValue(attribute?.hasPrice || false);
  }, []);

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

  function onChangeInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (e.target.name === "title") {
      setTitleValue(e.target.value);
    }

    if (e.target.name === "slug") {
      setSlugValue(e.target.value);
    }

    if (!e.target.value) {
      setFormErrors(formErrors.set(e.target.name, true));
      return false;
    }

    formErrors.delete(e.target.name);
    setFormErrors(formErrors);
  }

  function onBlurInputHandler(e: React.FocusEvent<HTMLInputElement>) {
    if (e.target.value) {
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
  }

  function onCheckedHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.name === "filterable") {
      setFilterableValue(e.target.checked);
    }
    if (e.target.name === "hasPrice") {
      setHasPriceValue(e.target.checked);
    }
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
    <Stack gap={1} direction={"row"} component={"div"} alignItems="center">
      <IconButton onClick={removeAttribute} sx={{ width: "fit-content" }}>
        <CancelRoundedIcon color="primary" />
      </IconButton>
      <FormControl>
        <InputField
          onChangeHandler={onChangeInputHandler}
          onBlurHandler={onBlurInputHandler}
          placeholder={t("title")}
          value={titleValue}
          size={20}
          required
          name="title"
          field_id="title"
          error={formErrors.has("title")}
        />
      </FormControl>
      <FormControl>
        <InputField
          onChangeHandler={onChangeInputHandler}
          onBlurHandler={onBlurInputHandler}
          name="slug"
          required
          field_id="slug"
          placeholder={t("slug")}
          value={slugValue}
          size={20}
          error={formErrors.has("slug")}
        />
      </FormControl>
      <FormControlLabel
        sx={{
          flexShrink: "0",
        }}
        control={
          <Switch
            onChange={onCheckedHandler}
            name="filterable"
            id="filterable"
            checked={filterableValue}
            size="small"
          />
        }
        label={t("filterabel")}
      />
      <FormControlLabel
        sx={{
          flexShrink: "0",
        }}
        control={
          <Switch
            name="hasPrice"
            id="hasPrice"
            checked={hasPriceValue}
            size="small"
            onChange={onCheckedHandler}
          />
        }
        label={t("hasPrice")}
      />
    </Stack>
  );
}

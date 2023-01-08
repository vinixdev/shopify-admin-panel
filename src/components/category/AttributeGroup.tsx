import React from "react";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  Theme,
} from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import AddButton from "./addButton/AddButton";
import Attribute from "./Attribute";
import {
  CategoryContext,
  CategoryContextInterface,
} from "./context/CategoryContext";
import { useTranslation } from "react-i18next";

export interface AttributeGroupProps {
  title: string;
  id: string;
}

export default function AttributeGroup({ title, id }: AttributeGroupProps) {
  const { t } = useTranslation();

  const { state, dispatch } =
    React.useContext<CategoryContextInterface>(CategoryContext);

  // React.useEffect(() => {}, [state]);

  const attributes = state.groups.length
    ? state.groups
        .find((group) => group.id === id)
        ?.attributes.map((attr) => (
          <Attribute groupPk={id} key={attr.id} id={attr.id} />
        ))
    : "";

  function addNewAttribute(e: React.MouseEvent): void {
    e.preventDefault();
    dispatch({
      type: "ADD_NEW_ATTRIBUTE",
      payload: {
        title: "",
        slug: "",
        filterable: false,
        hasPrice: false,
        id,
      },
    });
  }

  function removeGroup(e: React.MouseEvent): void {
    e.preventDefault();
    dispatch({
      type: "REMOVE_GROUP",
      payload: {
        id,
      },
    });
  }

  return (
    <Stack
      gap={0.5}
      sx={{
        backgroundColor: (theme: Theme) =>
          theme.palette.mode === "light"
            ? theme.palette.bgPrimary.light
            : theme.palette.bgPrimary.dark,
        boxShadow: 3,
        borderRadius: (theme: Theme) => theme.spacing(1),
        padding: 1,
        width: "100%",
      }}
    >
      <IconButton onClick={removeGroup} sx={{ width: "fit-content" }}>
        <CancelRoundedIcon color="primary" />
      </IconButton>
      <Box display={"flex"}>
        <Stack
          width={"40%"}
          direction={"column"}
          paddingX={2}
          paddingY={0.5}
          gap={1.5}
        >
          <Typography fontSize={18} fontWeight={500} variant="h3">
            {title}
          </Typography>
          <Divider />
        </Stack>
        <Stack direction={"row"} alignItems={"baseline"} marginLeft={"auto"}>
          <AddButton onClickHandler={addNewAttribute} text={t("add_attr")} />
        </Stack>
      </Box>
      <Stack paddingY={1} gap={1}>
        {attributes}
      </Stack>
    </Stack>
  );
}

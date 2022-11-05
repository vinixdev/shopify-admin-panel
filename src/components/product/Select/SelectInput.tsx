import { InputBase, NativeSelect, styled, Theme } from "@mui/material";

const InputSelectCustomize = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: theme.palette.textSecondary.light,
    backgroundColor: theme.palette.bgSecondary.main,
    borderRadius: theme.spacing(3.2),
    border: "none",
    padding: theme.spacing(0.8, 2),
    fontSize: theme.spacing(1.6),
    fontWeight: 500,
    width: theme.spacing(23.8),
    "&:focus": {
      borderRadius: theme.spacing(3.2),
    },
    "& option": {
      backgroundColor: theme.palette.bgSecondary.main + " !important",
      color: theme.palette.textSecondary.light,
    },
  },
  "& .MuiNativeSelect-icon": {
    color: theme.palette.textSecondary.light,
  },
}));

export default InputSelectCustomize;

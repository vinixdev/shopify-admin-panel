import React, {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";

// import { ThemeProvider } from "@emotion/react";
import {
  Box,
  CssBaseline,
  GlobalStyles,
  Paper,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

import Panel from "./components/panel/Panel";
import {
  ThemeContext,
  ThemeContextInterface,
} from "./components/theme_switch/context/themeContext";

declare module "@mui/material/styles" {
  interface Theme {}

  interface Palette {
    textPrimary: Palette["primary"];
    textSecondary: Palette["primary"];
    bgPrimary: Palette["primary"];
    bgSecondary: Palette["primary"];
    dividerBg: Palette["primary"];
  }
  interface PaletteOptions {
    textPrimary: PaletteOptions["primary"];
    textSecondary: PaletteOptions["primary"];
    bgPrimary: Palette["primary"];
    bgSecondary: Palette["primary"];
    dividerBg: Palette["primary"];
  }

  interface PaletteColor {
    textPrimary?: string;
    textSecondary?: string;
    bgPrimary?: string;
    bgSecondary?: string;
    dividerBg?: string;
  }
  interface SimplePaletteColorOptions {
    textPrimary?: string;
    textSecondary?: string;
    bgPrimary?: string;
    bgSecondary?: string;
    dividerBg?: string;
  }
  interface ThemeOptions {}
}

function App() {
  const prefersDarkMode: boolean = useMediaQuery(
    "(prefers-color-scheme: dark)"
  );

  const { mode } = React.useContext<ThemeContextInterface>(ThemeContext);

  const theme = createTheme({
    direction: "rtl",
    spacing: 10,
    palette: {
      // mode: prefersDarkMode ? "dark" : "light",
      mode: mode,
      primary: {
        main: "#7B60FF",
        light: "#7B60FF",
        dark: "#7B60FF",
      },
      secondary: {
        main: "#ff58d0",
      },
      warning: {
        main: "#f6cf77",
      },
      info: {
        main: "#40BFFF",
      },
      textPrimary: {
        main: "#fff",
        light: "#212529",
        dark: "#f5f5f5",
      },
      textSecondary: {
        main: "#959799",
        light: "#212121",
        dark: "#f5f5f5",
      },
      bgPrimary: {
        main: "#fff",
        light: "#fff",
        dark: "#212529",
        contrastText: "#212529",
      },
      bgSecondary: {
        main: "#f5f5f5",
        light: "#f5f5f5",
        dark: "#212121",
        contrastText: "#959799",
      },
      dividerBg: {
        main: "#C0C2D4",
        light: "#C0C2D4",
        dark: "#C0C2D4",
        contrastText: "#C0C2D4",
      },
    },
    typography: {
      fontFamily: ["Iransans", "Vazir", "sans-serif"].join(","),
    },
  });

  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  function RTL(props: {
    children:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | ReactFragment
      | ReactPortal
      | null
      | undefined;
  }) {
    return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
  }

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            a: {
              textDecoration: "none",
              color: "#fff",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                color: "#c4c4c4",
              },
            },
            body: {
              height: "100%",
            },
          }}
        />
        <Box
          sx={[
            {
              padding: 2,
              height: "100vh",
              backgroundImage: "linear-gradient(to left, #E7E7EF, #C0C2D4)",
            },
            (theme) => ({
              [theme.breakpoints.down("md")]: {
                padding: 0,
              },
            }),
          ]}
        >
          <Panel />
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;

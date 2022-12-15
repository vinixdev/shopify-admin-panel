import React, {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  Suspense,
  useEffect,
} from "react";

import { Helmet } from "react-helmet";

// import { ThemeProvider } from "@emotion/react";
import {
  Box,
  CssBaseline,
  GlobalStyles,
  Paper,
  ThemeProvider,
  Theme,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { faIR, zhCN } from "@mui/material/locale";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

import Panel from "./components/panel/Panel";
import {
  ThemeContext,
  ThemeContextInterface,
} from "./components/theme_switch/context/themeContext";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import Cookies from "js-cookie";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["fa", "en"],
    fallbackLng: "fa",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
    // lng: "fa",
    // react: { useSuspense: false },
  });

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
  // const prefersDarkMode: boolean = useMediaQuery(
  //   "(prefers-color-scheme: dark)"
  // );

  const { mode } = React.useContext<ThemeContextInterface>(ThemeContext);
  const currentLanguageCode = Cookies.get("i18next") || "fa";

  const theme = createTheme({
    direction: currentLanguageCode === "fa" ? "rtl" : "ltr",
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
      fontFamily:
        currentLanguageCode === "fa"
          ? ["Iransans", "Vazir", "sans-serif"].join(",")
          : ["sans-serif"].join(","),
    },
  });

  // Create rtl cache
  const cacheRtlParam =
    currentLanguageCode === "fa"
      ? {
          key: "muirtl",
          stylisPlugins: [prefixer, rtlPlugin],
        }
      : {
          key: "muiltr",
          // stylisPlugins: [prefixer, rtlPlugin],
        };
  const cacheRtl = createCache(cacheRtlParam);

  // function RTL(props: {
  //   children:
  //     | string
  //     | number
  //     | boolean
  //     | ReactElement<any, string | JSXElementConstructor<any>>
  //     | ReactFragment
  //     | ReactPortal
  //     | null
  //     | undefined;
  // }) {
  //   return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
  // }

  const { t } = useTranslation();

  return (
    <Suspense fallback={"..."}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Helmet>
            <title>{t("main_title")}</title>
            <meta name="description" content="Helmet application" />
          </Helmet>
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
                direction: "ltr",
              },
              "::-webkit-scrollbar ": {
                width: "10px",
                backgroundColor: "transparent",
              },
              "::-webkit-scrollbar-thumb": {
                width: "10px",
                backgroundColor: "#6b52e5",
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
    </Suspense>
  );
}

export default App;

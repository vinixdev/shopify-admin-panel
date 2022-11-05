import { Box, Paper } from "@mui/material";

import Header from "../partials/Header";
import MainContent from "../partials/MainContent";
import Sidebar from "../partials/Sidebar";

export default function Panel() {
  return (
    <Box
      sx={[
        {
          display: "grid",
          gridTemplateColumns: "1fr 5fr",
          gridTemplateRows: "1fr 8fr",
          maxHeight: "90vh",
          width: "90vw",
          margin: "0 auto",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: 5,
        },
        (theme) => ({
          [theme.breakpoints.down("md")]: {
            width: "100vw",
          },
        }),
      ]}
    >
      <Box
        component={"div"}
        sx={{
          gridRow: "1 / -1",
          gridColumn: "1 / 2",
          backgroundColor: "primary.main",
          borderRadius: "0",
          boxShadow: "none",
          width: "20vw",
          overflowY: "scroll",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          scrollbarColor: "#816EDF transparent",
        }}
      >
        <Sidebar />
      </Box>
      <Box
        component={"div"}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "bgPrimary.dark"
              : "bgPrimary.light",
          gridRow: "1 / 2",
          gridColumn: "2 / 3",
          borderRadius: "0",
          boxShadow: "none",
        }}
      >
        <Header />
      </Box>
      <Box
        component={"div"}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "bgSecondary.dark"
              : "bgSecondary.light",
          gridRow: "2 / -1",
          gridColumn: "2 / -1",
          borderRadius: "0",
          boxShadow: "none",
          overflowY: "scroll",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          scrollbarColor: "#aaa transparent",
        }}
      >
        <MainContent />
      </Box>
    </Box>
  );
}

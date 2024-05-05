import React from "react";
import ReactDOM from "react-dom/client";
import Calculator from "./calculator.tsx";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes.ts";
import { Card } from "./cards/card.tsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const router = createHashRouter(
  [
    {
      path: ROUTES.HOME.toString(),
      element: <Calculator />,
    },
    {
      path: ROUTES.CARD.toString(),
      element: <Card />,
    },
  ],
  { basename: "/" },
);

const theme = extendTheme({
  colors: {
    brand: {
      "50": "#FFE7E5",
      "100": "#FFBCB8",
      "200": "#FF9F98",
      "300": "#FF675C",
      "400": "#FF3C2E",
      "500": "#FF1100",
      "600": "#CC0E00",
      "700": "#990A00",
      "800": "#660700",
      "900": "#330300",
    },
    orange: {
      "50": "#FFEFE5",
      "100": "#FFD2B8",
      "200": "#FFB58A",
      "300": "#FF985C",
      "400": "#FF7B2E",
      "500": "#FF5E00",
      "600": "#CC4B00",
      "700": "#993800",
      "800": "#662600",
      "900": "#331300",
    },
    yellow: {
      "50": "#FEF5E7",
      "100": "#FCE3BB",
      "200": "#FAD18F",
      "300": "#F8BF63",
      "400": "#F6AD37",
      "500": "#F49B0B",
      "600": "#C37C09",
      "700": "#925D07",
      "800": "#623E04",
      "900": "#311F02",
    },
    red: {
      "50": "#FFE7E5",
      "100": "#FFBCB8",
      "200": "#FF928A",
      "300": "#FF675C",
      "400": "#FF3C2E",
      "500": "#FF1100",
      "600": "#CC0E00",
      "700": "#990A00",
      "800": "#660700",
      "900": "#330300",
    },
    green: {
      "50": "#F1F4F2",
      "100": "#D7E0DC",
      "200": "#BDCCC5",
      "300": "#A3B8AF",
      "400": "#89A398",
      "500": "#708F81",
      "600": "#597367",
      "700": "#43564E",
      "800": "#2D3934",
      "900": "#161D1A",
    },
    blue: {
      "50": "#EFEFF6",
      "100": "#D1D1E6",
      "200": "#B3B3D5",
      "300": "#9696C5",
      "400": "#7878B5",
      "500": "#5A5AA5",
      "600": "#484884",
      "700": "#363663",
      "800": "#242442",
      "900": "#121221",
    },
    purple: {
      "50": "#F6EFF1",
      "100": "#E6D1D7",
      "200": "#D6B3BD",
      "300": "#C596A3",
      "400": "#B5788A",
      "500": "#A55A70",
      "600": "#844859",
      "700": "#633643",
      "800": "#42242D",
      "900": "#211216",
    },
    pink: {
      "50": "#F7EEED",
      "100": "#EACFCD",
      "200": "#DCB1AD",
      "300": "#CE928D",
      "400": "#C0746D",
      "500": "#B2554D",
      "600": "#8F443D",
      "700": "#6B332E",
      "800": "#47221F",
      "900": "#24110F",
    },
    cyan: {
      "50": "#EFEFF6",
      "100": "#D1D1E6",
      "200": "#B3B3D5",
      "300": "#9696C5",
      "400": "#7878B5",
      "500": "#5A5AA5",
      "600": "#484884",
      "700": "#363663",
      "800": "#242442",
      "900": "#121221",
    },
    teal: {
      "50": "#F1F4F2",
      "100": "#D7E0DC",
      "200": "#BDCCC5",
      "300": "#A3B8AF",
      "400": "#89A398",
      "500": "#708F81",
      "600": "#597367",
      "700": "#43564E",
      "800": "#2D3934",
      "900": "#161D1A",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);

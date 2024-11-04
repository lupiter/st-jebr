import React from "react";
import ReactDOM from "react-dom/client";
import Calculator from "./calculator.tsx";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes.ts";
import { Card } from "./cards/card.tsx";
import { Radar } from "./radar/radar.tsx";
import { Raglan } from "./raglan/raglan.tsx";
import { Provider } from "./components/ui/provider";
import { system } from "./theme.ts";

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
    {
      path: ROUTES.RADAR.toString(),
      element: <Radar />,
    },
    {
      path: ROUTES.RAGLAN.toString(),
      element: <Raglan />,
    },
  ],
  { basename: "/" },
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider value={system}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);

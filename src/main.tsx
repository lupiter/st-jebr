import React from "react";
import ReactDOM from "react-dom/client";
import Calculator from "./calculator.tsx";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes.ts";
import { Card } from "./cards/card.tsx";

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
  { basename: "/" }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

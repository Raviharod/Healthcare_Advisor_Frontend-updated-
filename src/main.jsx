import { StrictMode } from "react";
import {Provider} from "react-redux";
import store from "./store/store.js";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import "./style.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

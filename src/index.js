import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { router } from "./routes/routes";
import './i18n';
import { Loader } from "./components/elements";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>
);

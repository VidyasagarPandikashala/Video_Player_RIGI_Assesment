import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "../src/redux/store/store";
import { Provider } from "react-redux";
import { enableMapSet } from "immer";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
enableMapSet();

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 2000,
  offset: "100px",
  // you can also just use 'scale'
  transition: transitions.FADE,
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </BrowserRouter>
);

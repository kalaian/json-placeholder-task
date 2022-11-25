import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ToastContainer
      position="top-center"
      style={{ width: "500px" }}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      theme="colored"
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <App />
  </Provider>
);

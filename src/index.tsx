import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const loadAssets = () => {
  return new Promise<void>((resolve) => {
    document.addEventListener("DOMContentLoaded", () => {
      const documentAny = document as any;

      if (documentAny.fonts) {
        documentAny.fonts.ready.then(resolve);
      } else {
        resolve();
      }
    });
  });
};

const renderApp = () =>
  loadAssets().then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById("root")
    );
  });

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

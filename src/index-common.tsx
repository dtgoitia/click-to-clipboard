import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// https://stackoverflow.com/questions/19103183/how-to-insert-html-with-a-chrome-extension
export function createAppContainer(): string {
  // Create a container element for the React app
  const id = "clic-to-clipboard-extension";

  const divElement = document.createElement("div");
  document.body.prepend(divElement);
  divElement.setAttribute("id", id);

  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
    #${id} {
      background-color: rgba(255,255,255,0.1);
      position: fixed;
      border-radius: 0.55rem;
      top: 45px;
      right: 0;
      max-width: 12rem;
      height: 300px;
      /* overflow-x: auto; */
      /* overflow-y: auto; */
      z-index: 10000;
    }
    /* #${id}:hover {
      width: 10rem;
    } */
  `;
  document.body.prepend(styleTag);

  return id;
}

export function renderReactAppAtElementWithId(id: string) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById(id),
  );
}

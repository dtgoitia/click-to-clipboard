import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// https://stackoverflow.com/questions/19103183/how-to-insert-html-with-a-chrome-extension
function createAppContainer(): string {
  // Create a container element for the React app
  const id = "clic-to-clipboard-extension";
  const divElement = document.createElement("div");
  document.body.prepend(divElement);
  divElement.setAttribute("id", id);
  return id;
}

function renderReactAppAtElementWithId(id: string) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById(id),
  );
}

const containerId = createAppContainer();
renderReactAppAtElementWithId(containerId);

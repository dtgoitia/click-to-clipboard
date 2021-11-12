import { createAppContainer, renderReactAppAtElementWithId } from "./index-common";

function styleBackgroundPage() {
  document.body.style.backgroundColor = "#272822";
}

styleBackgroundPage();
const containerId = createAppContainer();
renderReactAppAtElementWithId(containerId);

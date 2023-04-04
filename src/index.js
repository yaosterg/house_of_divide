import React from "react";
import { createRoot } from "react-dom/client";
import { Main } from "./components";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
/* Import and destructure main from src/component/index.js 
and anything else you may need here */

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>
);

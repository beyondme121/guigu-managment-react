import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import store from "./redux/store";

ReactDOM.render(
  <Router>
    <App store={store} />
  </Router>,
  document.getElementById("root")
);

store.subscribe(() => {
  ReactDOM.render(
    <Router>
      <App store={store} />
    </Router>,
    document.getElementById("root")
  );
});

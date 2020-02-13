import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App store={store} />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// store.subscribe(() => {
//   ReactDOM.render(
//     <Router>
//       <App store={store} />
//     </Router>,
//     document.getElementById("root")
//   );
// });

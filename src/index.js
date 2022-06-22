import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "./state";
import AppRouter from "./router/AppRouter";
import ModalContext from "./context/ModalContext";
import "./style/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
const { store, persistor } = configureStore();

export const history = createBrowserHistory({ forceRefresh: true });

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ModalContext>
          <Router history={history}>
            <AppRouter />
          </Router>
        </ModalContext>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

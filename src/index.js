import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import thunk from "redux-thunk";
import axios from "axios";

import App from "./App";
import IngredientReducer from "./store/reducers/burgerBuilder";
import OrderReducer from "./store/reducers/orders";
import AuthReducer from "./store/reducers/auth";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

axios.defaults.baseURL = "https://burger-app-4d747.firebaseio.com";

const rootReducer = combineReducers({
  burgerBuilder: IngredientReducer,
  orders: OrderReducer,
  auth: AuthReducer
});

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

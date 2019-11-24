import React from "react";
import { composeWithDevTools } from 'redux-devtools-extension';
import ReactDOM from "react-dom";
import App from "./Main";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index";

const middleWares = [thunk];
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWares)));

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require("./bootstrap");

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

if (document.getElementById("app")) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  , document.getElementById("app"));
}

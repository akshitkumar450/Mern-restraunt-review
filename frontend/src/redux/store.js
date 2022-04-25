import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();

const enhancer = composeEnhancers();

const store = createStore(rootReducer, enhancer);
export default store;

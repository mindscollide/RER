import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import * as actions from "./action_types";
import { configureStore } from "@reduxjs/toolkit";
import { loader_Reducers } from "./reducers";

const AppReducer = combineReducers({
  Loading: loader_Reducers,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === actions.SIGN_OUT) {
    state = undefined;
  }
  return AppReducer(state, action);
};

const store = configureStore(
  { reducer: rootReducer },
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

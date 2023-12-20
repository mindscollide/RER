import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import {
  loader_Reducers,
  authReducer,
  adminReducer,
  globalReducer,
} from "./reducers";
import thunk from "redux-thunk";
import * as actions from "./action_types";
import { composeWithDevTools } from "redux-devtools-extension";

// No need to import combineReducers

const AppReducer = combineReducers({
  Loader: loader_Reducers,
  auth: authReducer,
  admin: adminReducer,
  global: globalReducer,
});
// const rootReducer = (state, action) => {
//   if (action.type === actions.SIGN_OUT) {
//     return undefined; // Reset the entire state
//   }
//   return {
//     ...state,
//     Loading: loader_Reducers(state?.Loading, action),
//     supportedLanguage: adminReducer(state?.supportedLanguage, action),
//     supportedLanguageSelected: adminReducer(state?.supportedLanguageSelected, action),
//     admin_ResponseMessage: adminReducer(state?.admin_ResponseMessage, action),
//     userDetails: authReducer(state?.userDetails, action),
//     auth_ResponseMessage: authReducer(state?.auth_ResponseMessage, action),
//     roles: authReducer(state?.roles, action),
//   };
// };
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

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { loader_Reducers, authReducer, adminReducer } from "./reducers";

import * as actions from "./action_types";

// No need to import combineReducers

const rootReducer = (state, action) => {
  if (action.type === actions.SIGN_OUT) {
    return undefined; // Reset the entire state
  }
  return {
    ...state,
    Loading: loader_Reducers(state?.Loading, action),
    supportedLanguage: adminReducer(state?.supportedLanguage, action),
    supportedLanguageSelected: adminReducer(
      state?.supportedLanguageSelected,
      action
    ),
    admin_ResponseMessage: adminReducer(state?.admin_ResponseMessage, action),
    userDetails: authReducer(state?.userDetails, action),
    auth_ResponseMessage: authReducer(state?.auth_ResponseMessage, action),
    roles: authReducer(state?.roles, action),
  };
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore serializability for now
    }),
});

export const useAppDispatch = () => useDispatch();
export default store;

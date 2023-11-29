import * as actions from "../action_types";

const initialState = {
  Loading: false,
};

const loader_Reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_LOADER_STATES: {
      return {
        ...state,
        Loading: action.response,
      };
    }
    default:
      return { ...state };
  }
};
export default loader_Reducers;

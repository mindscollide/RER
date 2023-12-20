import * as actions from "../action_types";

const initialState = {
  isCountryCityWiseCounter: false,
  isCityWiseBranchService: false,
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_COUNTRY_CITY_WISE_COUNTER: {
      return {
        ...state,
        isCountryCityWiseCounter: action.response,
      };
    }

    case actions.SET_CITY_WISE_BRANCH_SERVICE: {
      return {
        ...state,
        isCityWiseBranchService: action.response,
      };
    }

    default:
      return { ...state };
  }
};

export default globalReducer;

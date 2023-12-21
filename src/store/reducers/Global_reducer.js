import * as actions from "../action_types";

const initialState = {
  isCountryCityWiseCounter: false,
  isCityWiseBranchService: false,
  isCountryWiseCityComponentReducer: false,
  isCountryServiceComponentReducer: false,
  isServiceCountryComponentReducer: false,
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

    case actions.SET_COUNTRY_WISE_CITY_COMPONENT: {
      return {
        ...state,
        isCountryWiseCityComponentReducer: action.response,
      };
    }

    // For country service screen component
    case actions.SET_COUNTRY_SERVICE_SCREEN_COMPONENT: {
      return {
        ...state,
        isCountryServiceComponentReducer: action.response,
      };
    }

    // For service country screen component
    case actions.SET_SERVICE_COUNTRY_SCREEN_COMPONENT: {
      return {
        ...state,
        isServiceCountryComponentReducer: action.response,
      };
    }

    default:
      return { ...state };
  }
};

export default globalReducer;

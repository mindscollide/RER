import * as actions from "../action_types";

const setIsCountryCityWiseCounter = (response) => {
  return {
    type: actions.SET_COUNTRY_CITY_WISE_COUNTER,
    response: response,
  };
};
const setIsCityWiseBranchService = (response) => {
  return {
    type: actions.SET_CITY_WISE_BRANCH_SERVICE,
    response: response,
  };
};

const setIsCountryWiseCityComponent = (response) => {
  return {
    type: actions.SET_COUNTRY_WISE_CITY_COMPONENT,
    response: response,
  };
};

// ===================================GLOBAL ADMIN START ==========================================//

const setIsCountryServiceScreenComponent = (response) => {
  return {
    type: actions.SET_COUNTRY_SERVICE_SCREEN_COMPONENT,
    response: response,
  };
};

// ===================================GLOBAL ADMIN END ==========================================//

export {
  setIsCountryCityWiseCounter,
  setIsCityWiseBranchService,
  setIsCountryWiseCityComponent,
  setIsCountryServiceScreenComponent,
};

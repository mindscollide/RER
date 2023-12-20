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
export { setIsCountryCityWiseCounter, setIsCityWiseBranchService };

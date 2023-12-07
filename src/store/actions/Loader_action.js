import * as actions from "../action_types";
const loader_Actions = (response) => {
  return {
    type: actions.SET_LOADER_STATES,
    response: response,
  };
};
export { loader_Actions };

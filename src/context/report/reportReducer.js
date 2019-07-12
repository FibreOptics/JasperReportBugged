import { LOAD_REPORTS } from "../types";

export default (state, action) => {
  switch (action.type) {
    case LOAD_REPORTS:
      return {
        ...state,
        loading: false,
        reports: action.payload
      };
    default:
      return state;
  }
};

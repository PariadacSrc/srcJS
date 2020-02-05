//Actions
import { LOG_IN_USER, LOG_OUT_USER } from "../actions/authActions";
//Error Action Handler
import { LOG_ERRORS } from "../actions/rootActions";

const initState = {
  token: false,
  authError: null
};

const errorHandler = (state, action) => {
  switch (action.error) {
    case "sessionexpired":
      return { ...state, authError: null, token: false };

    default:
      return { ...state, authError: action.error };
  }
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOG_IN_USER:
      return { ...state, authError: null, token: action.token };
    case LOG_OUT_USER:
      return { ...state, authError: null, token: false };
    case LOG_ERRORS:
      return errorHandler(state, action);
    default:
      return state;
  }
};

export default authReducer;

//Actions
import {
  SET_FORM_ALERT,
  SET_LASTCALL_FORM_ALERT,
  FETCH_FORM_ALERT,
  DELETE_FORM_ALERT,
  RESET_STORE_FORM_ALERT
} from "../actions/formAlertsActions";

const initState = () => {
  return {
    last_call: null,
    content: []
  };
};

const formAlertsReducer = (state = initState(), action) => {
  switch (action.type) {
    case FETCH_FORM_ALERT:
      return {
        ...state,
        content: action.content
      };

    case SET_FORM_ALERT:
      return {
        ...state,
        last_call: action.last_call,
        content: action.content
      };

    case SET_LASTCALL_FORM_ALERT:
      return {
        ...state,
        last_call: action.last_call
      };

    default:
      return state;
  }
};

export default formAlertsReducer;

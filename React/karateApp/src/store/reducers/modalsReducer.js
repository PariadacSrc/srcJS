//Actions
import {
  SET_MODAL,
  SET_LASTCALL_MODAL,
  FETCH_MODAL,
  DELETE_MODAL,
  RESET_STORE_MODAL
} from "../actions/modalsActions";

const initState = () => {
  return {
    last_call: null,
    content: []
  };
};

const modalsReducer = (state = initState(), action) => {
  switch (action.type) {
    case FETCH_MODAL:
      return {
        ...state,
        content: action.content
      };

    case SET_MODAL:
      return {
        ...state,
        last_call: action.last_call,
        content: action.content
      };

    case SET_LASTCALL_MODAL:
      return {
        ...state,
        last_call: action.last_call
      };

    default:
      return state;
  }
};

export default modalsReducer;

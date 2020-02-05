//Actions
import {
  GET_LIST_ATHLETE,
  GET_LIST_ATHLETE_DEBTS,
  RESET_STORE_ATHLETE
} from "../actions/athleteActions";

const initState = () => {
  return {
    triggerComponents: false,
    content: false,
    list: []
  };
};

const athleteReducer = (state = initState(), action) => {
  switch (action.type) {
    case GET_LIST_ATHLETE:
      return {
        ...state,
        content: action.content,
        triggerComponents: true,
        list: action.list
      };
    case GET_LIST_ATHLETE_DEBTS:
      return {
        ...state,
        content: action.content,
        list: action.list
      };
    case RESET_STORE_ATHLETE:
      return initState();
    default:
      return state;
  }
};

export default athleteReducer;

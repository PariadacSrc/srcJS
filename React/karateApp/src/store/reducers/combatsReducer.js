//Actions
import {
  GET_LIST_COMBATS,
  GENERATE_COMBAT,
  RESET_STORE_COMBATS
} from "../actions/combatActions";

const initState = () => {
  return {
    content: false,
    list: false
  };
};

const combatReducer = (state = initState(), action) => {
  switch (action.type) {
    case GET_LIST_COMBATS:
      return {
        ...state,
        content: action.content,
        list: action.list
      };
    case RESET_STORE_COMBATS:
      return initState();
    default:
      return state;
  }
};

export default combatReducer;

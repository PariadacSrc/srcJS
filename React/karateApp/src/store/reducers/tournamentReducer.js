//Actions
import {
  GET_LIST_TOURNAMENT,
  RESET_STORE_TOURNAMENT
} from "../actions/tournamentActions";

const initState = () => {
  return {
    content: false,
    list: []
  };
};

const tournamentReducer = (state = initState(), action) => {
  switch (action.type) {
    case GET_LIST_TOURNAMENT:
      return {
        ...state,
        content: action.content,
        list: action.list
      };
    case RESET_STORE_TOURNAMENT:
      return initState();
    default:
      return state;
  }
};

export default tournamentReducer;

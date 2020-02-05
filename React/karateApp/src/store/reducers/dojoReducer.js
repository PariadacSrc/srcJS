//Actions
import { GET_SINGLE_DOJO, RESET_STORE_DOJO } from "../actions/dojoActions";

const initState = () => {
  return {
    content: false
  };
};

const dojoReducer = (state = initState(), action) => {
  switch (action.type) {
    case GET_SINGLE_DOJO:
      return {
        ...state,
        content: action.content
      };
    case RESET_STORE_DOJO:
      return initState();
    default:
      return state;
  }
};

export default dojoReducer;

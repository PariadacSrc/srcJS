//Actions
import {
  SET_APP_FEATURES,
  RESET_STORE_FEATURES
} from "../actions/featuresActions";

const initState = () => {
  return {
    content: false,
    userid: false,
    role: false
  };
};

const featuresReducer = (state = initState(), action) => {
  switch (action.type) {
    case SET_APP_FEATURES:
      return {
        ...state,
        content: action.content,
        userid: action.user,
        role: action.role
      };
    case RESET_STORE_FEATURES:
      return initState();
    default:
      return state;
  }
};

export default featuresReducer;

import {
  GET_ATHLETE_FORM,
  RESET_STORE_COMPONENT
} from "../actions/componentsActions";

const initState = () => {
  return {
    content: false,
    data: null
  };
};

const componentsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ATHLETE_FORM:
      return {
        ...state,
        content: action.content,
        data: action.data
      };
    case RESET_STORE_COMPONENT:
      return initState();

    default:
      return state;
  }
};

export default componentsReducer;

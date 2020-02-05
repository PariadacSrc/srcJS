//Actions
import {
  COMFIRM_PAYMENT,
  GET_PERSON_PAYMENT,
  GET_LIST_PAYMENT,
  RESET_STORE_PAYMENTS
} from "../actions/paymentsActions";

const initState = () => {
  return {
    content: false,
    list: []
  };
};

const paymentsReducer = (state = initState(), action) => {
  switch (action.type) {
    case COMFIRM_PAYMENT:
      return {
        ...state,
        content: action.content
      };
    case GET_PERSON_PAYMENT:
      return {
        ...state,
        content: action.content
      };
    case GET_LIST_PAYMENT:
      return {
        ...state,
        list: action.content.data ? action.content.data : [],
        content: action.content
      };
    case RESET_STORE_PAYMENTS:
      return initState();
    default:
      return state;
  }
};

export default paymentsReducer;

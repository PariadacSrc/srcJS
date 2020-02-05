//Actions
import {
  REGISTER_SINGLE_USER,
  REGISTER_MULTI_USERS,
  GET_SINGLE_USER,
  GET_LIST_USERS,
  RESET_STORE_USER,
  DELETE_USER,
  RECOVERY_PASSWORD_REQUEST,
  VALIDATE_USER_DATA
} from "../actions/usersActions";

const initState = () => {
  return {
    recordcomplete: false,
    recorddelete: false,
    recordstatus:"complete",
    helperdata: false,
    validations: []
  };
};

const usersReducer = (state = initState(), action) => {
  switch (action.type) {
    case REGISTER_SINGLE_USER:
      return {
        ...state,
        userdata: action.userdata,
        response: action.response,
        recordcomplete: action.recordcomplete,
        recordtype: action.recordtype,
        recordstatus: action.recordstatus,
        error: null
      };
    case REGISTER_MULTI_USERS:
      return {
        ...state,
        recordcomplete: action.recordcomplete,
        helperdata: action.helperdata
      };
    case DELETE_USER:
      return {
        ...state,
        recorddelete: action.recorddelete,
        helperdata: action.helperdata
      };
    case RECOVERY_PASSWORD_REQUEST:
      return {
        ...state,
        helperdata: action.helperdata
      };
    case VALIDATE_USER_DATA:
      const newval = [...state.validations, action.validation];
      return {
        ...state,
        validations: newval
      };
    case RESET_STORE_USER:
      return initState();
    default:
      return state;
  }
};

export default usersReducer;

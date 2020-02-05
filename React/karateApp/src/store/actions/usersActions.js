//Axios Component
import axios from "axios";
//Error Action Handler
import { LOG_ERRORS } from "./rootActions";
//API endpoint
import {
  API_CREATE_USER,
  API_CREATE_PERSON,
  API_GET_PERSON,
  API_SEND_MAIL,
  API_UPDATE_IMG,
  API_UPDATE_PERSON,
  API_DELETE_PERSON,
  API_RECOVERY_PASSWORD_REQUEST,
  API_RECOVERY_PASSWORD_CONFIRMATION,
  API_VALIDATE_PERSON
} from "../../config/apiConfig";

import { fetchFormAlert } from "./formAlertsActions";

//Actions Creators
export const REGISTER_SINGLE_USER = "REGISTER_SINGLE_USER";
export const REGISTER_MULTI_USERS = "REGISTER_MULTI_USERS";
export const GET_SINGLE_USER = "GET_SINGLE_USER";
export const GET_LIST_USERS = "GET_LIST_USERS";
export const RESET_STORE_USER = "RESET_STORE_USER";
export const DELETE_USER = "DELETE_USER";
export const RECOVERY_PASSWORD_REQUEST = "RECOVERY_PASSWORD_REQUEST";
export const VALIDATE_USER_DATA = "VALIDATE_USER_DATA";

function getMsn(type) {
  switch (type) {
    case "username":
      return "That username is taken. Please, try another.";
    case "useremail":
      return "That email is taken. Please try another";
    case "usercategory":
      return "We don´t have any category for your belt, age and gender. Please verify and try again";
    default:
      return "Email or name user has already been taken.  Please try another.";
  }
}

function fetchSingleUser() {
  return {
    type: GET_SINGLE_USER
  };
}

function fetchValidations(data) {
  return data;
}

function recordsSingleUser(state, response,status="complete") {
  return {
    type: REGISTER_SINGLE_USER,
    userdata: state.userdata,
    response: response,
    recordtype: state.recordtype,
    recordstatus:status,
    recordcomplete: true
  };
}

function recordsMultiUsers(status, helper) {
  return {
    type: REGISTER_MULTI_USERS,
    recordcomplete: status,
    helperdata: helper
  };
}

function recordsDelete(status, helper) {
  return {
    type: DELETE_USER,
    recorddelete: status,
    helperdata: helper
  };
}

function fetchLogError(error) {
  return {
    type: LOG_ERRORS,
    error: error
  };
}

function fetchRecovery({ type = RECOVERY_PASSWORD_REQUEST, response }) {
  return {
    type: type,
    helperdata: response
  };
}

//Main API actions

export const confirmActionDelete = () => {
  return (dispatch, getState) => {
    dispatch(
      recordsDelete("confirm", {
        title: "Are you sure you want to delete this record?",
        message: "Is it an action that you cannot reverse"
      })
    );
  };
};

export const getUser = (id, token = false) => {
  return (dispatch, getState) => {
    axios
      .get(API_GET_PERSON)
      .then(response => {
        dispatch(fetchSingleUser());
        return response;
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchLogError(error));
      });
  };
};

export const setUser = (data, token = false) => {

  return (dispatch, getState) => {
    dispatch(recordsSingleUser(data, null,"loading"));
    axios
      .post(API_CREATE_USER, data.maindata)
      .then(response => {
        const mainresponse= response;
        if(data.picturedata){
          data.picturedata.append("token", response.data.token);
          axios
            .post(API_UPDATE_IMG, data.picturedata, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }).then(response=>{
              axios.post(API_SEND_MAIL, { user: data.useremail }).then(response => {
                dispatch(recordsSingleUser(data, mainresponse));
              });
            });
        }else{

          axios.post(API_SEND_MAIL, { user: data.useremail }).then(response => {
            dispatch(recordsSingleUser(data, mainresponse));
          });

        }


      })
      .catch(error => {
        dispatch(fetchLogError(error));
      });
  };
};

const uploadPictures = (
  dispatch,
  pictures,
  token,
  response = { data: { status: "" } }
) => {
  try {
    if (response.data.status !== "Fail") {
      if (pictures.length === 0) {
        dispatch(
          recordsMultiUsers("complete", {
            title: "Operation complete",
            message:
              "Pre-registration in the tournament Calgary Karate Cup 2019 has been successful. Please make the payment to complete the registration process"
          })
        );
      } else {
        dispatch(
          recordsMultiUsers("loading", {
            title: "Loaded Images...",
            message: `Remaining files ${pictures.length}`
          })
        );
        pictures[0].append("token", token);
        axios
          .post(API_UPDATE_IMG, pictures[0], {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(response => {
            const newpictures = pictures.filter((val, key) => {
              return key !== 0;
            });
            uploadPictures(dispatch, newpictures, response);
            return response;
          })
          .catch(error => {
            dispatch(
              recordsMultiUsers("error", {
                title: "Unexpected error",
                message: "Could not complete image upload"
              })
            );
          });
      }
    } else {
      dispatch(
        recordsMultiUsers("error", {
          title: "Server error",
          message: "Unable to process request data"
        })
      );
    }
  } catch (error) {
    console.log(error);
    dispatch(
      recordsMultiUsers("error", {
        title: "System error",
        message: "Unable to process request data"
      })
    );
  }
};

export const setTeamMembers = data => {
  const { athletes, token, pictures, recordtype = "create" } = data;
  return (dispatch, getState) => {
    dispatch(
      recordsMultiUsers("loading", {
        title: "Loaded Athletes Data..."
      })
    );
    let recordaction = "";
    switch (recordtype) {
      case "update":
        recordaction = API_UPDATE_PERSON;
        break;

      default:
        recordaction = API_CREATE_PERSON;
        break;
    }

    axios
      .post(recordaction, { token: token, data: athletes })
      .then(response => {
        uploadPictures(dispatch, pictures, token, response);
        return response;
      })
      .catch(error => {
        dispatch(
          recordsMultiUsers("error", {
            title: "System error",
            message: "Unable to process request data"
          })
        );
      });
  };
};

export const deleteTeamMember = data => {
  return (dispatch, getState) => {
    axios
      .post(API_DELETE_PERSON, data)
      .then(response => {
        dispatch(
          recordsDelete("complete", {
            title: "Operation complete",
            message: "The athletes were registered successfully"
          })
        );
        return response;
      })
      .catch(error => {
        dispatch(
          recordsDelete("error", {
            title: "System error",
            message: "Unable to process request data"
          })
        );
      });
  };
};

export const recoveryPasswordRequest = (data = {}) => {
  return (dispatch, getState) => {
    axios
      .post(API_RECOVERY_PASSWORD_REQUEST, data)
      .then(response => {
        if (response.data.status === "error") {
          dispatch(
            fetchFormAlert({
              id: getState().form_alerts.last_call,
              status: "error",
              form_alert_body:
                "You have enteres an invalid user name/email address"
            })
          );
        } else {
          dispatch(fetchRecovery({ response: "complete_request" }));
        }
      })
      .catch(error => {
        dispatch(fetchRecovery({ response: "error" }));
      });
  };
};

export const recoveryPasswordConfirmation = (data = {}) => {
  return (dispatch, getState) => {
    axios
      .post(API_RECOVERY_PASSWORD_CONFIRMATION, data)
      .then(response => {
        if (response.data.status === "error") {
          dispatch(
            fetchFormAlert({
              id: getState().form_alerts.last_call,
              status: "error",
              form_alert_body: response.data.message
            })
          );
        } else {
          dispatch(fetchRecovery({ response: "complete_confirm" }));
        }
      })
      .catch(error => {
        dispatch(fetchRecovery({ response: "error" }));
      });
  };
};

export const validateUserdata = (data = {}, calldata, call) => {
  return (dispatch, getState) => {
    axios
      .post(API_VALIDATE_PERSON, data)
      .then(response => {
        if (!response.data.content) {
          dispatch(
            fetchFormAlert({
              id: getState().form_alerts.last_call,
              status: "error",
              form_alert_body: getMsn(data.type)
            })
          );
        } else {
          call(calldata);
        }
      })
      .catch(error => {
        dispatch(fetchRecovery({ response: "error" }));
      });
  };
};

export const resetStore = () => {
  return (dispatch, getState) => {
    dispatch({
      type: RESET_STORE_USER
    });
  };
};

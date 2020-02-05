import { setFeatures } from "./featuresActions";
//Axios Component
import axios from "axios";
//Error Action Handler
import { LOG_ERRORS } from "./rootActions";
//API endpoint
import { API_LOGIN_USER } from "../../config/apiConfig";
//ModalActions
import { fetchModal } from "../actions/modalsActions";
import { fetchFormAlert } from "../actions/formAlertsActions";
//Actions Creators
export const LOG_IN_USER = "LOG_IN_USER";
export const LOG_OUT_USER = "LOG_OUT_USER";

function fetchLogInUser(token) {
  return {
    type: LOG_IN_USER,
    token: token
  };
}

function fetchLogOutUser() {
  return {
    type: LOG_OUT_USER
  };
}

function fetchLogError(error) {
  return {
    type: LOG_ERRORS,
    error: error
  };
}

//Main API actions
export const logInUser = user => {
  return (dispatch, getState) => {
    dispatch(
      fetchModal({
        id: getState().modals.last_call,
        status: "loading",
        modal_title: "Validating information"
      })
    );
    axios
      .post(API_LOGIN_USER, user)
      .then(response => {
        dispatch(
          fetchModal({
            id: getState().modals.last_call,
            status: "fullclose"
          })
        );
        try {
          switch (response.data.status) {
            case "200":
              dispatch(fetchLogInUser(response.data.token));
              dispatch(setFeatures(response.data.token));
              break;
            case "error":
              dispatch(
                fetchFormAlert({
                  id: getState().form_alerts.last_call,
                  status: "error",
                  form_alert_body: "Please enter a registered user name"
                })
              );
              break;
            default:
              dispatch(
                fetchFormAlert({
                  id: getState().form_alerts.last_call,
                  status: "error",
                  form_alert_body: "The system could not complete the request"
                })
              );
              break;
          }
          return response;
        } catch (error) {
          dispatch(
            fetchFormAlert({
              id: getState().form_alerts.last_call,
              status: "error",
              form_alert_body: "The system could not complete the request"
            })
          );
          return response;
        }
      })
      .catch(error => {
        dispatch(
          fetchModal({
            id: getState().modals.last_call,
            status: "fullclose"
          })
        );
        dispatch(
          fetchFormAlert({
            id: getState().form_alerts.last_call,
            status: "error",
            form_alert_body: error.response
              ? error.response.data.message === "User blocked"
                ? "User name blocked. Please try again in 24 hours"
                : "Your user name and/or password do not match"
              : "The system could not complete the request"
          })
        );
      });
  };
};

export const logOutUser = () => {
  return dispatch => {
    dispatch(fetchLogOutUser());
  };
};

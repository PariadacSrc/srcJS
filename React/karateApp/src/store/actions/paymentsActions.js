//Axios Component
import axios from "axios";
//Error Action Handler
import { LOG_ERRORS } from "./rootActions";
//API endpoint
import {
  API_COMFIRM_PAYMENT,
  API_GET_PERSON_PAYMENT,
  API_LIST_PAYMENTS
} from "../../config/apiConfig";
//ModalActions
import { fetchModal } from "../actions/modalsActions";
//Actions Creators
export const GET_PERSON_PAYMENT = "GET_PERSON_PAYMENT";
export const COMFIRM_PAYMENT = "COMFIRM_PAYMENT";
export const RESET_STORE_PAYMENTS = "RESET_STORE_PAYMENTS";
export const GET_LIST_PAYMENT = "GET_LIST_PAYMENT";

function fetchPayment(action, response) {
  return {
    type: action,
    content: response
  };
}

function fetchLogError(error) {
  return {
    type: LOG_ERRORS,
    error: error
  };
}

export const comfirmPayment = data => {
  return (dispatch, getState) => {
    dispatch(
      fetchModal({
        id: getState().modals.last_call,
        status: "loading",
        modal_title: "Updating the payment"
      })
    );
    axios
      .post(API_COMFIRM_PAYMENT, data)
      .then(response => {
        dispatch(
          fetchModal({
            id: getState().modals.last_call,
            status: "complete",
            modal_title: "Payment was successfully registered"
          })
        );
        return response;
      })
      .catch(error => {
        dispatch(fetchLogError(error));
      });
  };
};

export const getPersonPayment = data => {
  return dispatch => {
    axios
      .post(API_GET_PERSON_PAYMENT, data)
      .then(response => {
        dispatch(
          fetchPayment(GET_LIST_PAYMENT, {
            ...response.data,
            error: false
          })
        );
      })
      .catch(error => {
        dispatch(() => {
          return {
            type: GET_LIST_PAYMENT,
            content: {
              error: true,
              obj: error,
              errormsg: "Unable to load information, try again later."
            }
          };
        });
      });
  };
};

export const paymentList = data => {
  return dispatch => {
    axios
      .post(API_LIST_PAYMENTS, data)
      .then(response => {
        dispatch(
          fetchPayment(GET_LIST_PAYMENT, {
            ...response.data,
            error: false
          })
        );
      })
      .catch(error => {
        dispatch(() => {
          return {
            type: GET_LIST_PAYMENT,
            content: {
              error: true,
              obj: error,
              errormsg: "Unable to load information, try again later."
            }
          };
        });
      });
  };
};

export const resetStore = () => {
  return (dispatch, getState) => {
    dispatch({
      type: RESET_STORE_PAYMENTS
    });
  };
};

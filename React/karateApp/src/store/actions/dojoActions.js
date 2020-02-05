//Axios Component
import axios from "axios";
//Error Action Handler
import { LOG_ERRORS } from "./rootActions";
//API endpoint
import { API_GET_DOJO } from "../../config/apiConfig";
//Actions Creators
export const GET_SINGLE_DOJO = "GET_SINGLE_DOJO";
export const RESET_STORE_DOJO = "RESET_STORE_DOJO";

function fetchSingleDojo(response) {
  return {
    type: GET_SINGLE_DOJO,
    content: response.data.data ? response.data : false
  };
}

function fetchLogError(error) {
  return {
    type: LOG_ERRORS,
    error: error
  };
}

export const getDojo = data => {
  return (dispatch, getState) => {
    axios
      .post(API_GET_DOJO, data)
      .then(response => {
        dispatch(fetchSingleDojo(response));
        return response;
      })
      .catch(error => {
        dispatch(fetchLogError(error));
      });
  };
};

export const resetStore = () => {
  return (dispatch, getState) => {
    dispatch({
      type: RESET_STORE_DOJO
    });
  };
};

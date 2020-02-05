//Axios Component
import axios from "axios";
//Error Action Handler
import { LOG_ERRORS } from "./rootActions";
//API endpoint
import { API_GENERATE_COMBAT, API_GET_COMBATS } from "../../config/apiConfig";
//Actions Creators
export const GET_LIST_COMBATS = "GET_LIST_COMBATS";
export const GENERATE_COMBAT = "GENERATE_COMBAT";
export const RESET_STORE_COMBATS = "RESET_STORE_COMBATS";

function fetchCombatsList(response) {
  return {
    type: GET_LIST_COMBATS,
    content: response.data,
    list: response.data.data ? response.data.data : []
  };
}

function fetchGenerateCombatsList(response) {
  return {
    type: GET_LIST_COMBATS,
    content: response.data,
    list: []
  };
}

function fetchLogError(error) {
  return {
    type: LOG_ERRORS,
    error: error
  };
}

export const getCombatsList = data => {
  return (dispatch, getState) => {
    axios
      .post(API_GET_COMBATS, data)
      .then(response => {
        dispatch(fetchCombatsList(response));
        return response;
      })
      .catch(error => {
        dispatch(fetchLogError(error));
      });
  };
};

export const generateCombatsList = data => {
  return (dispatch, getState) => {
    axios
      .post(API_GENERATE_COMBAT, data)
      .then(response => {
        dispatch(getCombatsList(data));
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
      type: RESET_STORE_COMBATS
    });
  };
};

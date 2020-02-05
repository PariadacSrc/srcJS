//Axios Component
import axios from "axios";
//Error Action Handler
import { LOG_ERRORS } from "./rootActions";
//API endpoint
import { API_LIST_TOURNAMENT } from "../../config/apiConfig";
//Actions Creators
export const GET_LIST_TOURNAMENT = "GET_LIST_TOURNAMENT";
export const RESET_STORE_TOURNAMENT = "RESET_STORE_TOURNAMENT";

function fetchTournamentList(response) {
  return {
    type: GET_LIST_TOURNAMENT,
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

export const getTournamentList = data => {
  return (dispatch, getState) => {
    axios
      .post(API_LIST_TOURNAMENT, data)
      .then(response => {
        dispatch(fetchTournamentList(response));
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
      type: RESET_STORE_TOURNAMENT
    });
  };
};

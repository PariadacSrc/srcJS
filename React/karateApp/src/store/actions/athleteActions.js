//Axios Component
import axios from "axios";
//Error Action Handler
import { LOG_ERRORS } from "./rootActions";
//API endpoint
import {
  API_LIST_TEAM_ATHLETE,
  API_GET_PERSON,
  API_LIST_TEAM_ATHLETE_ADMIN
} from "../../config/apiConfig";
//Actions Creators
export const GET_LIST_ATHLETE = "GET_LIST_ATHLETE";
export const GET_LIST_ATHLETE_DEBTS = "GET_LIST_ATHLETE_DEBTS";
export const RESET_STORE_ATHLETE = "RESET_STORE_ATHLETE";

function fetchAthleteList(response, list = [], action) {
  let newlist = [];

  try {
    let ignorePosition = {};
    list.map((athlete, index) => {
      if (athlete) {
        list.map((nAthlete, nIndex) => {
          if (athlete.id_person === nAthlete.id_person) {
            if (index === nIndex) {
              if (!ignorePosition[index]) {
                newlist.push(athlete);
              }
            } else {
              ignorePosition[index] = true;
            }
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }

  return {
    type: action,
    content: response.data,
    list: list
  };
}

function fetchLogError(error) {
  return {
    type: LOG_ERRORS,
    error: error
  };
}

const roleApi = role => {
  switch (role) {
    case "admin":
      return API_LIST_TEAM_ATHLETE_ADMIN;

    case "athlete":
      return API_GET_PERSON;

    default:
      return API_LIST_TEAM_ATHLETE;
  }
};

const filterDebts = list => {
  try {
    return list.filter(athlete => {
      return !athlete.status_payment;
    });
  } catch (error) {
    return [];
  }
};

export const validateDebts = () => {
  return (dispatch, getState) => {
    return filterDebts(getState().athlete.list).length > 0 ? true : false;
  };
};

/*Main Dispatch Actions*/

export const getAthleteList = data => {
  return (dispatch, getState) => {
    axios
      .post(roleApi(getState().features.role), data)
      .then(response => {
        const list = !Array.isArray(response.data.data)
          ? [response.data.data]
          : response.data.data;
        dispatch(fetchAthleteList(response, list, GET_LIST_ATHLETE));
        return response;
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchLogError(error));
      });
  };
};

export const getAthleteListDebts = data => {
  return (dispatch, getState) => {
    axios
      .post(roleApi(getState().features.role), data)
      .then(response => {
        const debt = !Array.isArray(response.data.data)
          ? [response.data.data]
          : response.data.data;
        dispatch(
          fetchAthleteList(response, filterDebts(debt), GET_LIST_ATHLETE_DEBTS)
        );
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
      type: RESET_STORE_ATHLETE
    });
  };
};

//JWT decoder
import decode from "jwt-decode";
//Error Action Handler
import { LOG_ERRORS } from "./rootActions";
//Actions Creators
export const SET_APP_FEATURES = "SET_APP_FEATURES";
export const RESET_STORE_FEATURES = "RESET_STORE_FEATURES";

export function setFeatures(token) {
  if (isTokenExpired(token)) {
    return {
      type: SET_APP_FEATURES,
      content: decode(token).data.feature,
      user: decode(token).data.iduser,
      role: decode(token).data.role_name
    };
  } else {
    return {
      type: LOG_ERRORS,
      error: "sessionexpired"
    };
  }
}

const isTokenExpired = token => {
  try {
    const decoded = decode(token);
    if (decoded.exp > Date.now() / 1000) {
      // Checking if token is expired.
      return token;
    } else return false;
  } catch (err) {
    return false;
  }
};

export const resetStore = () => {
  return {
    type: RESET_STORE_FEATURES
  };
};

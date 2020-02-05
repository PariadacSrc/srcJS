/**Full App Reducers */
import athleteReducer from "./athleteReducer";
import authReducer from "./authReducer";
import componentsReducer from "./componentsReducer";
import dojoReducer from "./dojoReducer";
import menuReducer from "./menuReducer";
import featuresReducer from "./featuresReducer";
import tournamentReducer from "./tournamentReducer";
import usersReducer from "./usersReducer";
import modalsReducer from "./modalsReducer";
import formAlertsReducer from "./formAlertsReducer";
import paymentsReducer from "./paymentsReducer";
import combatReducer from "./combatsReducer";

/**Redux Libraries */
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  combat: combatReducer,
  userrecord: usersReducer,
  menu: menuReducer,
  features: featuresReducer,
  dojo: dojoReducer,
  athlete: athleteReducer,
  tournament: tournamentReducer,
  component: componentsReducer,
  modals: modalsReducer,
  payments: paymentsReducer,
  form_alerts: formAlertsReducer
});

export default rootReducer;

//Redux Store
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
//Persist Store
import { saveStore, loadStore } from "./helpers/persistStorage";
//Middleware
import thunk from "redux-thunk";
//Redux Debug DevTool
import { composeWithDevTools } from "redux-devtools-extension";

const persistState = loadStore();
const mainStore = createStore(
  rootReducer,
  persistState,
  composeWithDevTools(applyMiddleware(thunk))
);

mainStore.subscribe(() => {
  //Set only the data to save in localStore
  const baseState = { auth: mainStore.getState().auth };
  saveStore(baseState);
});

export default mainStore;

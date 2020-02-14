import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import adminReducer from "./adminReducer";
import propertiesReducer from "./propertiesReducer";
import renterReducer from "./renterReducer";
import socketReducer from "./socketReducer";
import { composeWithDevTools} from 'redux-devtools-extension';


const rootReducer = combineReducers({
  admin: adminReducer,
  properties: propertiesReducer,
  renters: renterReducer,
  socket: socketReducer
});

export const store = createStore(
rootReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware))
);

export default store

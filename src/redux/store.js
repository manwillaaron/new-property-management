import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import adminReducer from "./adminReducer";
import propertiesReducer from "./propertiesReducer";
import renterReducer from "./renterReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import socketReducer from "./socketReducer";
import { composeWithDevTools} from 'redux-devtools-extension';


const rootReducer = combineReducers({
  admin: adminReducer,
  properties: propertiesReducer,
  renters: renterReducer,
  socket: socketReducer
});

const persistconfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistconfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware))
);

export const persistor = persistStore(store)

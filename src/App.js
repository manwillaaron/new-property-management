import React from "react";
import "./App.css";
import routes from "./routes";
import "./reset.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "./redux/store";
import {PersistGate} from 'redux-persist/integration/react'
import {persistor} from './redux/store'
 

function App() {
  return (
    <Provider store = {store}>
      <PersistGate loading = {null } persistor= {persistor}>
        <HashRouter>
          
    <div className='main-container'>
     {routes}
    </div>
        </HashRouter>

      </PersistGate>
    </Provider>
  );
}

export default App;

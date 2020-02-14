import React from 'react';
import './App.css';
import Routes from './Routes';
import './reset.css';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';


function App() {
  return (
    <Provider store={store}>
        <HashRouter>
          <Routes/>
        </HashRouter>
    </Provider>
  );
}

export default App;

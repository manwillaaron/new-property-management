import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter as  Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  // <StateProvider >
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  // </StateProvider>
  ,
  document.getElementById('root')
);


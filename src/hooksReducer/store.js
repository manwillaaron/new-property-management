import React, { createContext, useReducer } from 'react';
import { FETCHING, SUCCESS, ERROR } from './actionTypes';


export const initialState = {  
    status: null,
    response: null
};

export const store = createContext(initialState);
const { Provider } = store;


const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state = initialState, { type, response } = {}) => {
    switch (type) {
        case FETCHING:
            return { ...initialState, status: FETCHING };
        case SUCCESS:
            return { ...state, status: SUCCESS, response };
        case ERROR:
            return { ...state, status: ERROR, response };
        default:
            return state; 
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export {StateProvider} ;

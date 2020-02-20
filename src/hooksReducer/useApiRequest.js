
import { useReducer, useCallback } from 'react';
import axios from 'axios';
import {store, initialState } from './store';
import { fetching, success, error } from './actionCreators';

const useApiRequest = _ => {
    const [state, dispatch] = useReducer(store, initialState);
    
    const makeRequest = useCallback(async () => {
        dispatch(fetching());
        try {
            const response = await axios.get('http://localhost:4321/api/admin');
            dispatch(success(response));
        } catch (e) {
            dispatch(error(e));
        }
    });

    return [state, makeRequest];
};

export default useApiRequest;

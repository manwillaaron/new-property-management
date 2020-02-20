import axios from 'axios';
import {
  ADD_PROPERTY,
  EDIT_PROPERTY,
  GET_PROPERTIES,
  DELETE_PROPERTY
} from './actionTypes';

const initialState = {
  properties: [],
  error: false
};

export function getProperties() {
  let data = axios.get(`/api/properties`).then(res => res.data);
  return {
    type: GET_PROPERTIES,
    payload: data
  };
}

export function addProperty(property) {
  let data = axios
    .post(`/api/property/add`, property)
    .then(res => res.data);
  return {
    type: ADD_PROPERTY,
    payload: data
  };
}

export function editProperties(id, property) {
  let data = axios
    .put(`/api/properties/${id}`, property)
    .then(res => {
      return res.data;
    });
  return {
    type: EDIT_PROPERTY,
    payload: data
  };
}

export function deleteProperty(propertyId) {
  let data = axios
    .delete(`/api/properties/${propertyId}`)
    .then(res => res.data);
  return {
    type: DELETE_PROPERTY,
    payload: data
  };
}

export default function(state = initialState, action) {
  let { payload, type } = action;
  switch (type) {
    case GET_PROPERTIES + '_FULFILLED':
      return { ...state, error: false, properties: payload };
    case GET_PROPERTIES + '_REJECTED':
      return { ...state, error: payload };
    case ADD_PROPERTY + '_FULFILLED':
      return { properties: payload, error: false };
    case ADD_PROPERTY + '_REJECTED':
      return { ...state, error: payload };
    case DELETE_PROPERTY + '_FULFILLED':
      return { ...state, properties: payload };
    case EDIT_PROPERTY + '_FULFILLED':
      return { ...state, properties: payload };
    default:
      return state;
  }
}

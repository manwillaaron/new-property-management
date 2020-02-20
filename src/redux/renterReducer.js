import {
  ADD_RENTER,
  DELETE_RENTER,
  EDIT_RENTER,
  GET_RENTERS,
  GET_ALL_RENTERS
} from "./actionTypes";
import axios from "axios";

const initialState = {
  renters: [],
  error: false
};

export function getRenters(propertyId) {
  let data = axios.get(`/api/renters/${propertyId}`).then(res => res.data);
  return {
    type: GET_RENTERS,
    payload: data
  };
}

export function getAllRenters() {
  let data = axios.get(`/api/all/renters`).then(res => res.data);

  return {
    type: GET_ALL_RENTERS,
    payload: data
  };
}

export function addRenter(newRenter) {
  let data = axios
    .post(`/api/renter/add`, newRenter)
    .then(res => res.data);
  return {
    type: ADD_RENTER,
    payload: data
  };
}

export function editRenter(
  prop_id,
  first_name,
  last_name,
  phone_number,
  email,
  property_manager_renter,
  adminId
) {
  let data = axios
    .put(`/api/renter/edit/${adminId}`, {
      prop_id,
      first_name,
      last_name,
      phone_number,
      email,
      property_manager_renter
    })
    .then(res => res.data);
  return {
    type: EDIT_RENTER,
    payload: data
  };
}

export function deleteRenter(admin_id) {
  let data = axios
    .delete(`/api/renter/delete/${admin_id}`)
    .then(res => res.data);
  return {
    type: DELETE_RENTER,
    payload: data
  };
}

export default function(state = initialState, action) {
  let { payload, type } = action;
  switch (type) {
    case GET_RENTERS + "_FULFILLED":
      return { ...state, error: false, renters: payload };
    case GET_RENTERS + "_REJECTED":
      return { ...state, error: payload };
    case GET_ALL_RENTERS + "_FULFILLED":
      return { ...state, error: false, renters: payload };
    case GET_ALL_RENTERS + "_REJECTED":
      return { ...state, error: payload };
    case ADD_RENTER + "_FULFILLED":
      return { ...state, renters: payload, error: false };
    case ADD_RENTER + "_REJECTED":
      return { ...state, error: payload };
    case EDIT_RENTER + "_FULFILLED":
      return { ...state, renters: payload };
    case EDIT_RENTER + "_REJECTED":
      return { ...state, error: payload };
    case DELETE_RENTER + "_FULFILLED":
      return { ...state, renters: payload };
    case DELETE_RENTER + "_REJECTED":
      return { ...state, error: payload };
    default:
      return state;
  }
}

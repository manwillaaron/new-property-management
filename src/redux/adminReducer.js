import axios from "axios";
import {
  REGISTER,
  LOGIN,
  GET_ADMIN,
  SIGNOUT
} from "./actionTypes";

const initialState = {
  admin: {},
  error: false,
  redirect: false
};

export const register = (
  username,
  password,
  first_name,
  last_name,
  phone_number,
  email,
  is_renter,
  property_manager
) => {
  let data = axios
    .post("/api/register", {
      username,
      password,
      first_name,
      last_name,
      phone_number,
      email,
      is_renter,
      property_manager
    })
    .then(res => res.data);
  return {
    type: REGISTER,
    payload: data
  };
};

export const login = (username, password) => {
  let data = axios
    .post("/api/login", { username, password })
    .then(res => res.data);
  return {
    type: LOGIN,
    payload: data
  };
};

export const getAdmin = () => {
  let data = axios.get("/api/admin").then(res => res.data);
  return {
    type: GET_ADMIN,
    payload: data
  };
};

export const signout = () => {
  let data = axios.delete("/api/signout").then(res => res.data);
  return {
    type: SIGNOUT,
    payload: data
  };
};

export default function(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case REGISTER + "_FULFILLED":
      return { admin: payload, redirect: false, error: false };
    case REGISTER + "_REJECTED":
      return { ...state, error: payload };
    case LOGIN + "_FULFILLED":
      return { ...state, admin: payload, redirect: false, error: false };
    case LOGIN + "_REJECTED":
      return { ...state, error: payload };
    case GET_ADMIN + "_FULFILLED":
      return { ...state, admin: payload, error: false };
    case GET_ADMIN + "_REJECTED":
      return { ...state, redirect: true, error: payload };
    case SIGNOUT + "_FULFILLED":
      return { ...state, redirect: true, admin: payload };
    default:
      return state;
  }
}

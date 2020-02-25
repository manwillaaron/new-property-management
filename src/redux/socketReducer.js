import axios from 'axios';
import { GET_ALL_CHATROOMS } from './actionTypes';

const initialState = {
  messages: [],
  chatrooms: [],
  error: false
};

export function getAllChatrooms(admin_id) {
  let data = axios.get(`/api/chatrooms/${admin_id}`).then(res => res.data);
  return {
    type: GET_ALL_CHATROOMS,
    payload: data
  };
}

export default function(state = initialState, action) {
  let { payload, type } = action;
  switch (type) {
    case GET_ALL_CHATROOMS + '_FULFILLED':
      return { ...state.chatrooms, error: false, chatrooms: payload };
    case GET_ALL_CHATROOMS + '_REJECTED':
      return { ...state, error: payload };
    default:
      return state;
  }
}

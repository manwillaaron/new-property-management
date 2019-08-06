import axios from "axios";
import {
  GET_ALL_CHATROOMS,
  SAVE_MESSAGE,
  GET_CHATROOM_MESSAGES,
  DELETE_MESSAGE
} from "./actionTypes";

const initialState = {
  messages: [],
  chatrooms: [],
  error: false
};

export function getChatroomMessages(admin_id) {
  let data = axios.get(`/api/messages/${admin_id}`).then(res => res.data);
  return {
    type: GET_CHATROOM_MESSAGES,
    payload: data
  };
}
export function getAllChatrooms(admin_id) {
  console.log("hit");
  console.log(admin_id);
  let data = axios.get(`/api/chatrooms/${admin_id}`).then(res => res.data
  )
  return {
    type: GET_ALL_CHATROOMS,
    payload: data
  };
}

export function saveMessage(
  message_content, admin_id
) {
  let data = axios
    .post("/api/newmessage", {
      message_content, admin_id
    })

    .then(res => {
      console.log(res.data);
      return res.data;
    });
  return {
    type: SAVE_MESSAGE,
    payload: data
  };
}

export function deleteMessage(message_id) {
  console.log(message_id);
  let data = axios
    .delete(`/api/delete/message/${message_id}`)
    .then(res => { console.log(res.data);
      return res.data});
  return {
    type: DELETE_MESSAGE,
    payload: data
  };
}

export default function(state = initialState, action) {
  let { payload, type } = action;
  switch (type) {
    case GET_CHATROOM_MESSAGES + "_FULFILLED":
      return { ...state.messages, error: false, messages: payload };
    case GET_CHATROOM_MESSAGES + "_REJECTED":
      return { ...state, error: payload };
    case GET_ALL_CHATROOMS + "_FULFILLED":
      console.log("hit sred", payload);
      return { ...state.chatrooms, error: false, chatrooms: payload };
    case GET_ALL_CHATROOMS + "_REJECTED":
      return { ...state, error: payload };
    case SAVE_MESSAGE + "_FULFILLED":
      console.log("hit sred", payload);
      return { ...state.messages, error: false, messages: payload };
    case SAVE_MESSAGE + "_REJECTED":
      return { ...state, error: payload };
      case DELETE_MESSAGE + "_FULFILLED":
        return { ...state.messages, messages: payload };
    default:
      return state;
  }
}

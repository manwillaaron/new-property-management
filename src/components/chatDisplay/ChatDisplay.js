import React from 'react';
import  {withRouter} from 'react-router-dom'
import './ChatDisplay.css';
import Chat from '../chat/Chat';
import Header from '../header/Header';

const ChatDisplay = (props) => (
  <div className="chat-display">
    <Header />
    <Chat admin_id={props.match.params} />
  </div>
);

export default withRouter(ChatDisplay);

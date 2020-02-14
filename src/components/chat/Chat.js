import React, { Component } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import {
  getChatroomMessages,
  getAllChatrooms,
  saveMessage,
  deleteMessage
} from '../../redux/socketReducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
const socket = io.connect('http://localhost:4000');

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      chatMessages: [],
      textareaHeight: 38
    };
    socket.on('newbie joined', messageFromServer => {
      console.log(messageFromServer);
    });

    socket.on('new message from sever', async message => {
      await this.props.getChatroomMessages(this.props.admin_id.admin_id);
      this.setState({
        chatMessages: [
          ...this.props.messages.sort((a, b) => {
            a = new Date(a.dateModified);
            b = new Date(b.dateModified);
            return a > b ? 1 : a < b ? -1 : 0;
          })
        ]
      });
    });
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.messages.length > 0 && this.props.messages.length === 0) {
  //     if (!Boolean(this.props.admin.admin.rentChecker)) {
  //       this.props.getChatroomMessages(this.props.admin_id.admin_id);
  //     } else {
  //       this.props.getChatroomMessages(this.props.admin.admin.id);
  //     }
  //   }
  //   return;
  // }

  deleteMessage = async message => {
    await this.props.deleteMessage(message);
    this.setState({ chatMessages: [] });
    this.setState({ chatMessages: this.props.messages });
  };

  // async componentDidMount() {
  //   if (!Boolean(this.props.admin.admin.rentChecker)) {
  //     await this.props.getChatroomMessages(this.props.admin_id.admin_id);
  //   } else {
  //     await this.props.getChatroomMessages(this.props.admin.admin.id);
  //   }
  //   this.setState({
  //     ...this.state.chatMessages,
  //     chatMessages: this.props.messages
  //   });
  //   this.props.getChatroomMessages(this.props.admin_id.admin_id);
  //   this.joinRoom();
  // }

  joinRoom = () => {
    socket.emit('needy', 1234);
  };

  sendMessage = async () => {
    await this.props.saveMessage(
      this.state.message,
      this.props.admin_id.admin_id
    );

    socket.emit('message to server', {
      room: 1234,
      message: this.state.message
    });
    this.setState({ message: '' });
  };

  handleKeyUp = evt => {
    let newHeight = Math.max(Math.min(evt.target.scrollHeight + 2, 75), 38);
    if (newHeight !== this.state.textareaHeight) {
      this.setState({
        textareaHeight: newHeight
      });
    }
  };

  timeConvert = timeStamp => {
    let time = new Date(timeStamp)
      .toTimeString()
      .split(' ')[0]
      .split(':');
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue = '' + hours;
    } else if (hours > 12) {
      timeValue = '' + (hours - 12);
    } else if (hours === 0) {
      timeValue = '12';
    }

    timeValue += minutes < 10 ? ':0' + minutes : ':' + minutes;
    timeValue += hours >= 12 ? 'pm' : 'am';
    return timeValue;
  };

  render() {
    return (
      <div className="chat">
        <div className="input-button-sendmsg">
          <textarea
            onKeyUp={this.handleKeyUp}
            className="input-send-message"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
            onKeyDown={ev => {
              if (ev.key === 'Enter') {
                this.sendMessage();
                ev.preventDefault();
              }
            }}
          />
          <button className="send-message" onClick={this.sendMessage}>
            Send
          </button>
        </div>
        <div className="message-container">
          {this.state.chatMessages.map(
            message => (
              (message.token =
                message.admin_id_messages === +this.props.admin.admin.id
                  ? 'sender'
                  : 'reciver'),
              (
                <div>
                  <div className={`${message.token}-messages-container`}>
                    <div className={`${message.token}-message-box`}>
                      {message.message_content}
                    </div>

                    {message.token === 'sender' ? (
                      <div className={`${message.token}-delete-info`}>
                        <div className={`${message.token}-name`}>
                          <h1>{message.first_name}</h1>
                          <h1 className="time">
                            {this.timeConvert(message.time_stamp)}
                          </h1>
                        </div>
                        <div
                          className={`${message.token}-delete-btn-container`}
                        >
                          <button
                            className={`${message.token}-delete-btn`}
                            onClick={() =>
                              this.deleteMessage(message.message_id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={`${message.token}-delete-info`}>
                        <div
                          className={`${message.token}-delete-btn-container`}
                        >
                          <button
                            className={`${message.token}-delete-btn`}
                            onClick={() =>
                              this.deleteMessage(message.message_id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                        <div className={`${message.token}-name`}>
                          <h1>{message.first_name}</h1>
                          <h1 className="time">
                            {this.timeConvert(message.time_stamp)}
                          </h1>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin,
    messages: state.socket.messages,
    rooms: state.socket.chatrooms
  };
}

export default connect(mapStateToProps, {
  saveMessage,
  getChatroomMessages,
  getAllChatrooms,
  deleteMessage
})(Chat);

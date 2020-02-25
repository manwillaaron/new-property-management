import React, { Component } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import { getAllChatrooms } from '../../../redux/socketReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
const socket = io.connect();

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      chatMessages: [],
      textareaHeight: 38,
      chatroomId: null
    };

    socket.on('login', ({ chatMessages, chatroomId }) => {
      this.setState({ chatroomId, chatMessages });
    });

    socket.on('deleted message', message => {
      this.setState({
        chatMessages: this.state.chatMessages.filter(
          el => el.message_id !== message.message_id
        )
      });
    });

    socket.on('new message from sever', async message => {
      this.setState({ chatMessages: [message, ...this.state.chatMessages] });
    });
  }
  componentDidMount() {
    this.joinRoom();
  }

  deleteMessage = messageId => {
    const { chatroomId } = this.state;
    socket.emit('delete message', { messageId, chatroomId });
  };

  joinRoom = () => {
    socket.emit('needy', this.props.match.params.admin_id);
  };

  sendMessage = async () => {
    const { chatroomId } = this.state;

    socket.emit('message to server', {
      chatroomId,
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

export default withRouter(
  connect(mapStateToProps, {
    getAllChatrooms
  })(Chat)
);

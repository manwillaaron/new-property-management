import React, { Component } from "react";
import io from "socket.io-client";
import {
  getChatroomMessages,
  getAllChatrooms,
  saveMessage,
  deleteMessage
} from "../../redux/socketReducer";
import { connect } from "react-redux";
const socket = io.connect("http://localhost:4000");

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      // admin_sender: props.admin.id,
      // admin_reciver: props.match.params.admid_id,
      message: "",
      chatMessages: []
    }

    this.sendMessage = this.sendMessage.bind(this)
    this.deleteMessage = this.deleteMessage.bind(this)

    socket.on("newbie joined", messageFromServer => {
      console.log(messageFromServer);
    });

    socket.on("new message from sever", async message => {
      console.log("new message", message);
      console.log(this.state.chatMessages);
     await this.props.getChatroomMessages(this.props.admin_id.admin_id);
      this.setState({
        chatMessages: [...this.props.messages]
      })
    });
  }
  // componentDidUpdate(prevProps) {
  //   console.log(prevProps.messages.length , this.props.messages.length);
  //   if (prevProps.messages.length > 0 && this.props.messages.length === 0) {
  //     this.props.getChatroomMessages(this.props.admin_id.admin_id);
  //   }
  //   return;
  // }

async deleteMessage(message){
    await this.props.deleteMessage(message)
    this.setState({chatMessages: []})
    this.setState({chatMessages: this.props.messages})
    console.log('meeeesssaggggggesss',this.props);

}

  async componentDidMount() {
    // this.eraseMsg()
    await this.props.getChatroomMessages(this.props.admin_id.admin_id);
    this.setState({
      ...this.state.chatMessages,
      chatMessages: this.props.messages
    });

    console.log(this.state);
    this.props.getChatroomMessages(this.props.admin_id.admin_id);
    console.log(this.props);
    this.joinRoom();
  }

  joinRoom() {
    socket.emit("needy", 1234);
  }

  async sendMessage() {
    await this.props.saveMessage(
      this.state.message, this.props.admin_id.admin_id 
    );

    socket.emit("message to server", {
      room: 1234,
      message: this.state.message
    });
    this.setState({ message: "" });
  };

  render() {
    console.log('sihqfdijn', this.props);
    console.log('!!!!!!!!!!!!!!!!!!!!!!', this.state);
    return (
      <div className="chat">
        {/* <button onClick={this.joinRoom}>Join the Room</button> */}
        <input
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />
        <button onClick={this.sendMessage}>Send</button>

        {this.state.chatMessages.map((message) => (
          <div key={message.message_id}>
            <h1>{message.admin_id_messages}</h1>
            <div>{message.message_content}</div>
            <button className='delete-button'
            onClick={()=>{ this.deleteMessage(message.message_id)
            console.log(message.message_id)
            ;
            }}
            >Remove Message</button>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.socket.messages,
    rooms: state.socket.chatrooms
  };
}

export default connect(
  mapStateToProps,
  { saveMessage, getChatroomMessages, getAllChatrooms, deleteMessage }
)(Chat);

import React,{Component} from 'react';
// import './App.css';
// import SocketView from '../socketView/SocketView';
import Chat from '../chat/Chat';
import Header from "../header/Header";

class ChatDisplay extends Component{
    render(){
        return (
            <div className='App'>
            <Header/>
            {console.log(this.props)}
                {/* <SocketView /> */}
                <Chat admin_id = {this.props.match.params}/>
            </div>
        );
    } 
    }
    

export default ChatDisplay;
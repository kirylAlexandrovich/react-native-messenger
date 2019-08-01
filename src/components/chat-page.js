import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from '../screens/chat';
import { getRoomMessages, renderMess } from '../redux/actions';
import sendMessage from '../servises/client';

export class chatPage extends Component {

  state = {
    message: '',
  }

  onChangeText = (text) => {
    this.setState({ 'message': text });
  }

  onSendMessage = () => {
    const { message } = this.state;
    const { email, roomName } = this.props;
    const time = new Date().toString().split(' ');
    const newTime = `${time[2]} ${time[1]} ${time[3]} ${time[4]}`;
    if (message.length === 0) {return};
    const myMessage = {
      email,
      mess: message,
      time: newTime,
    };

    sendMessage(email, message, newTime, roomName);
    this.setState({ message: '' });
    this.props.renderMess(myMessage);
  }

  render() {
    const { messages, email } = this.props;
    return (
      <Chat currentMessage={this.state.message} messages={messages} email={email} onChangeText={this.onChangeText} onSendMessage={this.onSendMessage} />
    )
  }
}

const mapStateToProps = (state) => ({
  roomName: state.rooms.roomName,
  messages: state.lists.messages,
  email: state.user.email,
})

const mapDispatchToProps = {
  getRoomMessages,
  renderMess,
}

export default connect(mapStateToProps, mapDispatchToProps)(chatPage);

import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import ContactsList from '../screens/contacts-list';
import { getUsersList, createRoom, changeRoom, getRoomMessages, getRoomsList } from '../redux/actions';
import { Actions } from 'react-native-router-flux';
import NumberNewMessage from '../components/number-new-messages';

export class contactsPage extends Component {
  state = {
    roomName: '',
  }

  moveToChat = (roomName) => {
    this.props.changeRoom(roomName);
    Actions.jump('chatPage');
  }

  componentDidMount() {
    const { contactsList, privateRoomsList, email } = this.props; 
    if (contactsList.length === 0) {
      this.props.getUsersList();
    }
    if (privateRoomsList.length === 0) {
      this.props.getRoomsList(email);
    }
  }

  componentDidUpdate = () => {
    const { wasRoomCreated } = this.props;
    if (wasRoomCreated) {
      this.moveToChat(this.state.roomName);
    }
  }

  onPress = (userName) => {
    const { privateRoomsList, email } = this.props;
    const result = privateRoomsList.filter((element) => {
      if (element.members.includes(userName)) {
        this.props.getRoomMessages(element.name);
        this.moveToChat(element.name);
        return true;
      }
      this.setState({'roomName': element.name});
      return false;
    });
    if (result.length === 0) {
      this.props.createRoom([userName], userName + email, email, true);
    }
  }

  render() {
    const { contactsList, email } = this.props;
    return (
      <ScrollView style={{flex: 1}}>
        <ContactsList contactsList={contactsList} onPress={this.onPress} email={email} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  contactsList: state.lists.clientsList,
  email: state.user.email,
  privateRoomsList: state.rooms.privateRoomsList,
  wasRoomCreated: state.rooms.wasRoomCreated,
});

const mapDispatchToProps = {
  getUsersList,
  getRoomsList,
  createRoom,
  changeRoom,
  getRoomMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(contactsPage);

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { createRoom, changeRoom, createError } from '../redux/actions';
import ContactsList from '../screens/contacts-list';
import NextButton from './next-button';

export class createChatSecondPage extends Component {
  state = {
    roomName: '',
    stateError: '',
  }

  onChangeChatName = (text) => {
    this.setState({roomName: text});
  }

  createRoom = () => {
    const { roomName } = this.state;
    const { addingPeople, email } = this.props;
    if (roomName.length === 0) {
      this.setState({ stateError: 'You have to enter name' });
      return;
    }
    this.setState({ stateError: '' });
    this.props.createError('');
    this.props.createRoom(addingPeople, roomName, email);
  }

  componentDidUpdate = () => {
    const { wasRoomCreated } = this.props;
    if (wasRoomCreated) {
      this.props.changeRoom(this.state.roomName);
      Actions.jump('chatPage');
    }
  }

  render() {
    const { addingPeople, error } = this.props;
    const { stateError } = this.state;
    console.log(addingPeople);
    return (
      <View style={{flex: 1}}>
        <Input
          containerStyle={{height: 80}}
          placeholder="Enter chat name"
          onChangeText={this.onChangeChatName}
          errorMessage={stateError || error}
        />
        <ContactsList contactsList={addingPeople} onPress={() => {}} />
        <NextButton onPress={this.createRoom} icon={require('../images/icons/round_check_white_24dp.png')} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  addingPeople: state.lists.addingPeople,
  error: state.errors.error,
  wasRoomCreated: state.rooms.wasRoomCreated,
})

const mapDispatchToProps = {
  createRoom,
  changeRoom,
  createError,
}

export default connect(mapStateToProps, mapDispatchToProps)(createChatSecondPage)

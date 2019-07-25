import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRoomsList, getRoomMessages,
  changeRoomsList, resetNumberOfNewMessages } from '../redux/actions';
import { Actions } from 'react-native-router-flux';
import RoomsList from '../screens/rooms-list';
import { AsyncStorage, Alert } from 'react-native';

export class roomsListPage extends Component {
  componentDidMount = () => {
    const { roomsList, userEmail } = this.props;
    if (roomsList.length <= 1) {
      AsyncStorage.getItem('roomsList')
        .then((roomsList) => {
          if (roomsList !== null) {
            this.props.changeRoomsList(JSON.parse(roomsList));
          } else {
            this.props.getRoomsList(userEmail);
          }
        })
    }
  }

  chooseRoom = (roomName) => {
    this.props.getRoomMessages(roomName);
    this.props.resetNumberOfNewMessages(roomName);
    Actions.chatPage();
  }

  render() {
    const { roomsList } = this.props;
    return (
      <RoomsList
      roomsList={roomsList} chooseRoom={this.chooseRoom}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  roomsList: state.rooms.roomsList,
  userEmail: state.user.email,
  // hasRoomNewMessage: state.rooms.hasRoomNewMessage,
})

const mapDispatchToProps = {
  getRoomsList,
  getRoomMessages,
  changeRoomsList,
  resetNumberOfNewMessages,
}

export default connect(mapStateToProps, mapDispatchToProps)(roomsListPage)

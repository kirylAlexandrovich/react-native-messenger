import React, { Component } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { red } from '../constants';

export class numberNewMessages extends Component {
  render() {
    const { hasRoomNewMessage, roomName } = this.props;

    if (hasRoomNewMessage[roomName]) {
      return (
        <Avatar
          rounded
          width={20}
          height={20}
          overlayContainerStyle={{backgroundColor: red}}
          title={hasRoomNewMessage[roomName].toString()}
          activeOpacity={0.7}
        />
      )
    }
    return <View />
  }
}

const mapStateToProps = (state) => ({
  hasRoomNewMessage: state.rooms.hasRoomNewMessage,
  privateRoomsList: state.rooms.privateRoomsList,
});

export default connect(mapStateToProps)(numberNewMessages)

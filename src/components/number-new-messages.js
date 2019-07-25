import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

export class numberNewMessages extends Component {

  render() {
    const { hasRoomNewMessage, roomName } = this.props;
    if (hasRoomNewMessage[roomName]) {
      return (
        <Avatar
          rounded
          width={20}
          height={20}
          title={hasRoomNewMessage[roomName].toString()}
          // titleStyle={{fontSize: 20}}
          activeOpacity={0.7}
        />
      )
    }
    return <View />
  }
}

const mapStateToProps = (state) => ({
  hasRoomNewMessage: state.rooms.hasRoomNewMessage,
})

export default connect(mapStateToProps)(numberNewMessages)

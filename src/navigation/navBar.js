import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeRoom, rerenderMessage } from '../redux/actions'
import { Text, View, StyleSheet, Image, AsyncStorage, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { gray } from '../constants';
// import BackButton from '../components/back-button';
import { quitChat } from '../actions';

class NavBar extends Component {

  renderLeft = (roomName) => {
    // if (Actions.currentScene === 'createChat') {
    //   return (
    //     <Button
    //       onPress={Actions.drawerClose}
    //       type="clear"
    //       icon={<Image source={require('../images/icons/twotone_keyboard_backspace_white_36dp.png')} />}
    //     />
    //   )
    // }
    if (roomName) {
      return (
        <Button
          buttonStyle={styles.backButton}
          onPress={quitChat}
          type="clear"
          icon={<Image source={require('../images/icons/round_arrow_back_white_24dp.png')} />}
        />
      )
    } else if (Actions.currentScene === 'chatsList') {
      return (
          <Button
            buttonStyle={styles.burgerButton}
            onPress={Actions.drawerOpen}
            type="clear"
            icon={<Image source={require('../images/icons/round_menu_white_36dp.png')} />}
          />
      )
    }
    return <Text></Text>;
  }

  renderMiddle = (roomName) => {
    if (roomName) {
      return (
        <Text style={[styles.navBarItem, styles.title]}>{roomName}</Text>
      )
    }
  }

  // renderRight = () => {
  //   if 
  // }

  render() {
    const { roomName } = this.props;

    return (
      <View style={styles.container}>
        {this.renderLeft(roomName)}
        {this.renderMiddle(roomName)}
        {/* {this.renderRight()} */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 64 : 54,
    flexDirection: 'row',
    backgroundColor: [gray.dark],
  },
  navBarItem: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: "#fefefe",
    marginTop: 10,
    marginLeft: 30,
  },
  backButton: {
    marginTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  burgerButton: {
    marginLeft: 10,
  }
});

const mapStateToProps = (state) => ({
  roomName: state.rooms.roomName,
})

const mapDispatchToProps = {
  changeRoom,
  rerenderMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

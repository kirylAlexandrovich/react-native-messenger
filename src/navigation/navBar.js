import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeRoom, rerenderMessage } from '../redux/actions'
import { Text, View, StyleSheet, Image, AsyncStorage, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { colorTheme } from '../constants';
// import BackButton from '../components/back-button';
import { quitChat } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
          icon={<Icon
            name="arrow-left"
            size={20}
            color="white"
          />}
        />
      )
    } else if (Actions.currentScene === 'chatsList') {
      return (
        <Button
          buttonStyle={styles.burgerButton}
          onPress={Actions.drawerOpen}
          type="clear"
          icon={<Icon
            name="bars"
            size={30}
            color="white"
          />}
        />
      )
    }
    // <Image source={require('../images/icons/round_menu_white_36dp.png')} />
    return <Text></Text>;
  }

  renderMiddle = (roomName) => {
    const { email } = this.props;
    let currentRoom = roomName;
    if (roomName) {
      if (roomName.search(email) !== -1) {
        currentRoom = roomName.replace(email, '');
      }
      return (
        <Text style={[styles.navBarItem, styles.title]}>{currentRoom}</Text>
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
    backgroundColor: [colorTheme.dark],
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
    // marginTop: 5,
    marginLeft: 10,
    paddingVertical: 16,
    paddingHorizontal: 15,
  },
  burgerButton: {
    paddingHorizontal: 15,
    paddingVertical: 11,
    marginLeft: 10,
  }
});

const mapStateToProps = (state) => ({
  roomName: state.rooms.roomName,
  email: state.user.email,
})

const mapDispatchToProps = {
  changeRoom,
  rerenderMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

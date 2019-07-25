import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToolbarAndroid, Image } from 'react-native';
import { gray } from '../constants';
import { logOut } from '../actions';
import { Actions } from 'react-native-router-flux';
import { moveToCreatingChat } from '../actions';
import { borderColor } from '../constants';

export default DrawerScreen = ({ email }) => {
  return (
    <View style={styles.drawer}>

      <View style={styles.drawerHeader}>
        <Text style={styles.emailStyle}>{email}</Text>
      </View>

      <TouchableOpacity
        style={styles.menuItems}
        onPress={ moveToCreatingChat } >
        <Image source={require('../images/icons/twotone_add_circle_black_48dp.png')} />
        <Text style={styles.menuItemsTitle}>Create chat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItems}
        onPress={() => { Actions.jump('contactsPage') }} >
        <Image source={require('../images/icons/twotone_supervised_user_circle_black_48dp.png')} />
        <Text style={styles.menuItemsTitle}>Contacts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItems}
        onPress={Actions.demo_lightbox} >
        <Image source={require('../images/icons/twotone_settings_black_48dp.png')} />
        <Text style={styles.menuItemsTitle}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItems}
        onPress={ logOut } >
        <Image source={require('../images/icons/icons8-sign-out-48.png')} />
        <Text style={styles.menuItemsTitle}>Log out</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
  emailStyle: {
    color: "#fafafa"
  },
  drawerHeader: {
    height: 150,
    backgroundColor: gray.lite,
    paddingLeft: 20,
    paddingTop: 20,
  },
  menuItems: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  menuItemsTitle: {
    fontSize: 20,
    marginLeft: 20,
  },
})
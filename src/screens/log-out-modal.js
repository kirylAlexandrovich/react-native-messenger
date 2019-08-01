import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Lightbox from '../components/lightbox';
import { logOut } from '../actions';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOutText: {
    fontSize: 20,
    paddingBottom: 40,
  }
});

const logOutModal = () => (
  <Lightbox verticalPercent={0.5} horizontalPercent={0.9} onPress={logOut} okButton closeButton >
    <Text style={styles.logOutText}>Are you sure you want to log out?</Text>
  </Lightbox>
);

export default logOutModal;
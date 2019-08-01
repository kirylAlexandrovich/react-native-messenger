import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Lightbox from '../components/lightbox';
import store from '../redux/store';
import { changeColorTheme } from '../redux/actions';

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
});

const changeAppTheme = () => {
  store.dispatch(changeColorTheme(false));
} 

const DemoLightbox = ({ data, children }) => (
  <Lightbox>
    <Text>Settings</Text>
  </Lightbox>
);

export default DemoLightbox;
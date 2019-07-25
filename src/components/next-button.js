import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { gray } from '../constants';

export default nextButton = ({ onPress, icon }) => {
  return (
    <TouchableOpacity style={styles.nextButton} onPress={onPress}>
      <Image
        style={styles.nextButtonIcon}
        source={icon}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  nextButton: {
    width: 50,
    height: 50,
    backgroundColor: gray.middle,
    opacity: 0.7,
    borderRadius: 50,
    position: "absolute",
    right: 30,
    bottom: 30,
    flex: 1,
    justifyContent: 'center',
  },
  nextButtonIcon: {
    alignSelf: 'center',
  },
})
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { screenWidth, screenHeight, colorTheme } from '../constants';

export default class BaseLightbox extends Component {
  static propTypes = {
    children: PropTypes.any,
    onPress: PropTypes.func,
    horizontalPercent: PropTypes.number,
    verticalPercent: PropTypes.number,
    okButton: PropTypes.bool,
    closeButton: PropTypes.bool,
  }

  state = {
    opacity: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      duration: 500,
      toValue: 1,
    }).start();
  }

  closeModal = () => {
    Animated.timing(this.state.opacity, {
      duration: 500,
      toValue: 0,
    }).start(Actions.pop);
  };

  _renderLightBox = () => {
    const { children, horizontalPercent = 1, verticalPercent = 1, onPress, okButton, closeButton } = this.props;
    const height = verticalPercent ? screenHeight * verticalPercent : deviceHeight;
    const width = horizontalPercent ? screenWidth * horizontalPercent : deviceWidth;
    return (
      <View
        style={{
          width,
          height,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colorTheme.backgroundColor,
          borderRadius: 10,
        }}
      >
        {children}
        <View style={styles.buttonContainer}>
          {okButton && <Button buttonStyle={styles.buttons} type="outline" title="OK" onPress={onPress} accessibilityLabel="Logout button" />}
          {closeButton && <Button buttonStyle={styles.buttons} type="outline" title="CLOSE" onPress={this.closeModal} accessibilityLabel="Back to chat button" />}
        </View>
      </View>
    );
  };

  render() {
    return <Animated.View style={[styles.container, { opacity: this.state.opacity }]}>{this._renderLightBox()}</Animated.View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorTheme.lite,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
  },
  buttons: {
    width: 100,
    margin: 10,
  },
});
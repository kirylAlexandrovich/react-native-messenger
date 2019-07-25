import React, { Component } from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DrawerScreen from '../screens/drawer';

export class Drawer extends Component {

  render() {
    const { email } = this.props;
    return (
      <DrawerScreen email={email} />
    )
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);

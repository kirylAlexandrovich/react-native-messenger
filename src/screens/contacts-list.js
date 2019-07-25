import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { borderColor } from '../constants';

export default ContactsList = ({ email, contactsList, onPress }) => {
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => {
    if (item === email) {return};
    return (<ListItem
      containerStyle={styles.item}
      title={item}
      leftAvatar={{ source: require('../images/icons/twotone_account_circle_black_36dp.png') }}
      onPress={() => { onPress(item) }}
    />)
  };

  return (
    <ScrollView contentContainerStyle={styles.container} >
      <FlatList
        keyExtractor={keyExtractor}
        data={contactsList}
        renderItem={renderItem}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: borderColor,
    borderTopWidth: 1,
  },
  item: {
    paddingTop: 5,
    paddingBottom: 5,
  },
});

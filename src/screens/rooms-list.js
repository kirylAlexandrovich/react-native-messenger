import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
// import { Actions, Scene } from 'react-native-router-flux';
import NumberNewMessage from '../components/number-new-messages';
import { borderColor } from '../constants';

const RoomsList = ({ roomsList, chooseRoom }) => {
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <ListItem
      style={styles.item}
      title={item}
      // leftElement={} todo avatar for chats
      rightElement={<NumberNewMessage roomName={item} />}
      onPress={() => { chooseRoom(item) }}
    />
  );

  return (
    <ScrollView contentContainerStyle={styles.container} >
      <FlatList
        keyExtractor={keyExtractor}
        data={roomsList}
        renderItem={renderItem}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
  },
});

export default RoomsList;
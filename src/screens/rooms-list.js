import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
// import { Actions, Scene } from 'react-native-router-flux';
import NumberNewMessage from '../components/number-new-messages';
import { colorTheme } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RoomsList = ({ roomsList, chooseRoom }) => {
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <ListItem
      style={styles.item}
      title={item}
      leftIcon={<Icon name="users" size={35} />}
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
    borderBottomColor: colorTheme.borderColor,
    borderBottomWidth: 1,
  },
});

export default RoomsList;
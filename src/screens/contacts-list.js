import React from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { colorTheme } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default ContactsList = ({ email, contactsList, onPress, checkedItems }) => {
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => {
    if (item === email) { return };

    return (<ListItem
      containerStyle={styles.item}
      title={item}
      leftIcon={checkedItems && checkedItems.includes(item) ? <Icon name="user-check" size={35} /> : <Icon name="user" size={35} />}
      // rightElement={ <FindRoom item={item} /> }
      onPress={() => { onPress(item) }}
    />)
  }

  return (
    <ScrollView contentContainerStyle={styles.container} >
      <FlatList
        keyExtractor={keyExtractor}
        data={contactsList}
        renderItem={renderItem}
        extraData={checkedItems}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: colorTheme.borderColor,
    borderTopWidth: 1,
  },
  item: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  selectedItem: {
    backgroundColor: "#000",
  }
});

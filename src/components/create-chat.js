import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, FlatList, View, Text, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ContactsList from '../screens/contacts-list';
import { colorTheme } from '../constants';
import NextButton from './next-button';
import { saveAddingPeople } from '../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome5';

export class createChat extends Component {
  static PropTypes = {
    saveAddingPeople: PropTypes.func,
    contactsList: PropTypes.array,
    email: PropTypes.string,
  }

  state = {
    modal: false,
    addingPeople: [],
    roomName: '',
    nameError: '',
  }

  keyExtractor = (item, index) => index.toString();

  onChangeRoomName = (text) => {
    this.setState({ roomName: text });
  }

  addHuman = (email) => {
    const { addingPeople } = this.state;
    if (addingPeople.includes(email)) {
      const index = addingPeople.indexOf(email);
      const arr = [...addingPeople];
      arr.splice(index, 1);
      this.setState({ addingPeople: arr });
      return;
    }
    this.setState({ addingPeople: [...addingPeople, email] });
  }

  renderItem = element => (
    <View style={styles.addingPeopleItem} >
      <Text style={styles.addingPeopleText}>{element.item}</Text>
    </View>
  )

  onPressNextButton = () => {
    const { addingPeople } = this.state;
    this.props.saveAddingPeople(addingPeople);
    Actions.jump('createChatSecondPage');
  }

  render() {
    const { contactsList, email } = this.props;
    const { addingPeople } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.addingPeopleContainer} >
          <FlatList
            keyExtractor={this.keyExtractor}
            data={addingPeople}
            renderItem={this.renderItem}
            contentContainerStyle={styles.flatList}
          />
        </ScrollView>
        <ContactsList contactsList={contactsList} onPress={this.addHuman} email={email} checkedItems={addingPeople} />
        {addingPeople.length > 0 ?
        <NextButton onPress={this.onPressNextButton} Icon={() => (<Icon name="arrow-right" size={18} color="white" />)} />
        : <View />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addingPeopleContainer: {
    minHeight: 40,
    maxHeight: 100,
  },
  addingPeopleText: {
    color: colorTheme.textColorLite,
    fontSize: 15,
  },
  flatList: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  addingPeopleItem: {
    flexDirection: "row",
    backgroundColor: colorTheme.lite,
    borderRadius: 12,
    borderColor: colorTheme.borderColor,
    borderWidth: 1,
    marginTop: 2,
    marginRight: 5,
    marginBottom: 2,
    marginLeft: 5,
    paddingTop: 3,
    paddingRight: 7,
    paddingBottom: 3,
    paddingLeft: 7,
    shadowColor: colorTheme.dark,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 2,
  },
})

const mapStateToProps = (state) => ({
  contactsList: state.lists.clientsList,
  email: state.user.email,
})

const mapDispatchToProps = {
  saveAddingPeople,
}

export default connect(mapStateToProps, mapDispatchToProps)(createChat);

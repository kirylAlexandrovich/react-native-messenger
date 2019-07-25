import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList, View, Text, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ContactsList from '../screens/contacts-list';
import { borderColor, gray } from '../constants';
import NextButton from './next-button';
import { saveAddingPeople } from '../redux/actions';

export class createChat extends Component {
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
            numColumns={3}
            keyExtractor={this.keyExtractor}
            data={addingPeople}
            renderItem={this.renderItem}
          />
        </ScrollView>
        <ContactsList contactsList={contactsList} onPress={this.addHuman} email={email} />
        {addingPeople.length > 0 ? <NextButton onPress={this.onPressNextButton} icon={require('../images/icons/round_arrow_forward_white_24dp.png')} /> : <View /> }
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
    color: "#fefefe",
    fontSize: 15,
  },
  addingPeopleItem: {
    backgroundColor: gray.lite,
    borderRadius: 12,
    borderColor: borderColor,
    borderWidth: 1,
    marginTop: 2,
    marginRight: 5,
    marginBottom: 2,
    marginLeft: 5,
    paddingTop: 3,
    paddingRight: 7,
    paddingBottom: 3,
    paddingLeft: 7,
    shadowColor: gray.dark,
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

import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContactsList from '../screens/contacts-list';
import { getUsersList } from '../redux/actions';

export class contactsPage extends Component {

  componentDidMount() {
    const { contactsList } = this.props; 
    if (contactsList.length === 0) {
      this.props.getUsersList();
    }
  }

  onPress = (item) => {
    console.log(item);
  }

  render() {
    const { contactsList, email } = this.props;
    return (
      <ScrollView style={{flex: 1}}>
        <ContactsList contactsList={contactsList} onPress={this.onPress} email={email} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  contactsList: state.lists.clientsList,
  email: state.user.email,
})

const mapDispatchToProps = {
  getUsersList,
}

export default connect(mapStateToProps, mapDispatchToProps)(contactsPage);

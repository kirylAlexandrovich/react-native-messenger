import React, { Component } from 'react';
import { AsyncStorage, Alert, ActivityIndicator, Text } from 'react-native';
import { Provider } from 'react-redux';
import { Router, Stack, Scene, Modal, Drawer, Overlay, Tabs, ActionConst, Actions } from 'react-native-router-flux';
import store from './src/redux/store';
import LogInPage from './src/components/log-in-page';
import ChatsList from './src/components/rooms-list-page';
import NavBar from './src/navigation/navBar';
import ChatPage from './src/components/chat-page';
import RegisterPage from './src/components/register-page';
import DrawerMenu from './src/components/drawer';
import { resetError, quitChat } from './src/actions';
import DemoLightbox from './src/lightbox/demo-lightbox';
import CreateChat from './src/components/create-chat';
import CreateChatSecondPage from './src/components/create-chat-second-page';
import ContactsPage from './src/components/contacts-page';
import { gray } from './src/constants';

class App extends Component {
  state = {
    isLogIn: false,
    storageEmail: store.getState('userEmail'),
  }

  componentDidMount = () => {
    AsyncStorage.getItem('userEmail')
      .then((email) => {
        if (email != null) {
          store.dispatch({ type: 'SET_EMAIL', payload: email });
          this.setState({ isLogIn: true });
        }
      });
  }

  render() {
    return (
      <Provider store={store}>
        <Router navigationBarStyle={{ backgroundColor: [gray.dark] }} tintColor="#fff" titleStyle={{ color: "#fff", }} >
          <Overlay key="overlay">
            <Modal key="modal">

              <Drawer
                hideNavBar
                key="drawer"
                contentComponent={DrawerMenu}
                drawerWidth={300}
              >
                <Stack key="chat" navBar={NavBar} duration={0} >
                  <Scene key="chatsList" component={ChatsList} title="chatList" />
                  <Scene key="chatPage" clone component={ChatPage} onExit={quitChat} back />
                </Stack>

                <Stack key="createChat" >
                  <Scene key="createChatFirstPage" component={CreateChat} title="Add people to chat" back />
                  <Scene key="createChatSecondPage" component={CreateChatSecondPage} title="New chat" back onExit={resetError} type="reset" />
                </Stack>
              </Drawer>

              <Stack key="contacts" >
                <Scene key="contactsPage" component={ContactsPage} title="Contacts" onExit={Actions.drawerClose} hideNavBar />
              </Stack>

              <Stack key="loginStack" hideNavBar initial={!this.state.isLogIn} >
                <Scene key="login" component={LogInPage} title="logIn" />
                <Scene key="register" component={RegisterPage} onExit={resetError} />
              </Stack>

              <Scene key="demo_lightbox" component={DemoLightbox} data={'some data'} />

            </Modal>
          </Overlay>
        </Router>
      </Provider>
    );
  }
};

export default App;

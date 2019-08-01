import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { Router, Stack, Scene, Modal, Drawer, Overlay, Actions } from 'react-native-router-flux';
import LogInPage from './src/components/log-in-page';
import ChatsList from './src/components/rooms-list-page';
import RegisterPage from './src/components/register-page';
import CreateChat from './src/components/create-chat';
import CreateChatSecondPage from './src/components/create-chat-second-page';
import ChatPage from './src/components/chat-page';
import DrawerMenu from './src/components/drawer';
import ContactsPage from './src/components/contacts-page';
import LogOutModal from './src/screens/log-out-modal';
import SettingsLightbox from './src/screens/settings';
import NavBar from './src/navigation/navBar';
import { resetError, quitChat } from './src/actions';
import { colorTheme } from './src/constants';
import SplashScreen from 'react-native-splash-screen';

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
        SplashScreen.hide();
        Actions.login();
      });
  }

  render() {
    return (
      <Provider store={store}>
        <Router navigationBarStyle={{ backgroundColor: [colorTheme.dark] }} tintColor="#fff" titleStyle={{ color: "#fff", }} >
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
                  <Scene key="chatPage" component={ChatPage} onExit={quitChat} back />
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

              <Scene key="settings" component={SettingsLightbox} />

              <Scene key="logOutModal" component={LogOutModal} hideNavBar />

            </Modal>
          </Overlay>
        </Router>
      </Provider>
    );
  }
};

export default App;

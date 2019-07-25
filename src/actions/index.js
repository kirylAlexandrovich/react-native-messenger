import store from '../redux/store';
import { changeConnState, createError,
         changeRoom, rerenderMessage,
         setEmail, changeRoomsList,
         getUsersList } from '../redux/actions';

import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

export const logOut = () => {
  store.dispatch(setEmail(null));
  store.dispatch(changeConnState(false));
  store.dispatch(changeRoomsList([]));
  AsyncStorage.removeItem('userEmail');
  AsyncStorage.removeItem('roomsList');
  Actions.loginStack({type: 'reset'});
}

export const resetError = () => {
  store.dispatch(createError(''));
}

export const quitChat = () => {
  store.dispatch(changeRoom(''));
  store.dispatch(rerenderMessage([]));
  Actions.jump('chatsList');
}

export const moveToCreatingChat = () => {
  const clientsList = store.getState().lists.clientsList;
  if (clientsList.length === 0) {
    store.dispatch(getUsersList());
  }
  Actions.createChat();
}

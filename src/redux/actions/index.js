import axios from 'axios';
import { host } from '../../constants';
import { AsyncStorage } from 'react-native';

export const renderMess = message => ({ type: 'RENDER_MESS', payload: message });

export const rerenderMessage = messages => ({ type: 'RERENDER_MESSAGE', payload: messages.reverse() });

export const changeConnState = connectionState => ({ type: 'CHANGE_CONNECTION_STATE', payload: connectionState });

export const setEmail = email => ({ type: 'SET_EMAIL', payload: email });

export const renderClientsList = clientsList => ({ type: 'RENDER_CLIENTS_LIST', payload: clientsList });

export const changeRoomsList = roomsList => ({ type: 'CHANGE_ROOMS_LIST', payload: roomsList });

export const changePrivateRoomsList = privateRoomsList => ({ type: 'CHANGE_PRIVATE_ROOMS_LIST', payload: privateRoomsList });

export const changeRoom = room => ({ type: 'CHANGE_ROOM', payload: room });

export const createError = errorText => ({ type: 'CREATE_ERROR', payload: errorText });

export const roomCreated = isCreated => ({ type: 'ROOM_CREATED', payload: isCreated });

export const changeLoadingState = isLoading => ({ type: 'CHANGE_LOADING_STATE', payload: isLoading });

export const resetNumberOfNewMessages = room => ({ type: 'RESET_NEW_MESSAGES', payload: room });

export const saveMessagesMap = (message, room) => ({ type: 'SAVE_MESSAGES_MAP', payload: { message, room } });

export const saveAddingPeople = addingPeople => ({ type: 'SAVE_ADDING_PEOPLE', payload: addingPeople });

export const changeColorTheme = payload => ({ type: 'CHANGE_COLOR_THEME', payload })

const port = '8080';

export const getRoomsList = email => (dispatch) => {
  axios.get(`${host}:${port}/rooms`, {
    params: { email },
  }).then((res) => {
    dispatch(changeRoomsList(res.data.roomsArr));
    console.log(res.data.privateRoomsArr)
    dispatch(changePrivateRoomsList(res.data.privateRoomsArr));
    AsyncStorage.setItem('roomsList', JSON.stringify(res.data.roomsArr));
  }).catch(err => { console.log(err); });
};

export const logInUser = (email, password) => (dispatch) => {
  dispatch(changeLoadingState(true));
  axios.post(`${host}:${port}/login`, {
    email,
    password,
  }, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      dispatch(changeLoadingState(false));
      if (res.data === 'no_such_client' || res.data === 'wrong_password') {
        dispatch(createError('Incorrect email or password'));
        return;
      } else {
        dispatch(createError(''));
        dispatch(setEmail(email));
      }
    }).catch(err => { console.log(err); });
};

export const getRoomMessages = roomName => (dispatch) => {
  dispatch(changeRoom(roomName));
  axios.post(`${host}:${port}/get_room_messages`, { roomName })
    .then((res) => {
      dispatch(rerenderMessage(res.data));
      // dispatch(saveMessagesMap(res.data, roomName));
    }).catch(err => { console.log(err); });
};

export const createRoom = (addingPeople, roomName, email, privateRoom) => (dispatch) => {
  axios.post(`${host}:8080/create_room`, {
    addingPeople, roomName, email, privateRoom,
  }).then((res) => {
    if (res.data.isCreated === true) {
      dispatch(getRoomsList(email));
      dispatch(changeRoom(roomName));
      dispatch(roomCreated(true));
    } else {
      dispatch(createError('The name already used, create another name.'));
    }
  }).catch(err => console.log(err));
};

export const sendUserDetails = details => (dispatch) => {
  axios.post(`${host}:${port}/register_user`, { details })
    .then((res) => {
      if (res.data.error) {
        dispatch(createError(res.data.error));
      }
      if (res.data === true) {
        dispatch(createError(''));
        dispatch(changeLoadingState(false));
        dispatch(setEmail(details.email));
      }
    }).catch(err => { console.log(err, 'ERROR'); });
};

export const getUsersList = () => (dispatch) => {
  axios.get(`${host}:${port}/clients_list`)
    .then((res) => {
      dispatch(renderClientsList(res.data));
    }).catch(err => { console.log(err); });
};

// export const getMessages = roomsNames => (dispatch) => {
//   axios.post(`${host}:${port}/get_messages`, {roomsNames})
//     .then((res) => {
//       console.log(res.roomMessagesMap);
//       dispatch(saveMessagesMap(res.roomMessagesMap))
//     }).catch((err) => { console.log(err); });
// }

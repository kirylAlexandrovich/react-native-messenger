import openSocket from 'socket.io-client';
import store from '../redux/store';
import { host } from '../constants';
// import AsyncStorage from 'react-native';

let socket;

const client = (nickname) => {
  store.dispatch({ type: 'CHANGE_CONNECTION_STATE', payload: true });
  socket = openSocket(`${host}:8000`);

  socket.on('connected', () => {
    const { rooms } = store.getState();
    // store.dispatch({ type: 'RENDER_CLIENTS_LIST', payload: clientsList });
    socket.emit('saveClient', nickname);
    socket.emit('joinToRooms', rooms.roomsList);
  });

  // socket.on('changeClientsList', (clientsList) => {
  //   console.log(clientsList);
  //   store.dispatch({ type: 'RENDER_CLIENTS_LIST', payload: clientsList });
  // });

  socket.on('message', (data) => {
    if(store.getState().rooms.currentRoomName === data.roomName) {
      store.dispatch({ type: 'RENDER_MESS', payload: data });
    } else {
      store.dispatch({ type: 'NEW_MESSAGE', payload: data.roomName });
      store.dispatch({ type: 'SAVE_MESSAGES_MAP', payload: { message: data.mess, room: data.roomName } })
    }
  });
  
  let currentRoomsList;
  store.subscribe(() => {
    const stateRoomsList = store.getState().rooms.roomsList;
    if (JSON.stringify(stateRoomsList) !== JSON.stringify(currentRoomsList)) {
      currentRoomsList = stateRoomsList;
      socket.emit('joinToRooms', stateRoomsList);
    }
    if (!store.getState().appStates.connectionState) {
      console.log('socket disconnect');
      socket.disconnect();
    }
  });

  // store.subscribe(() => {
    // console.log(store.getState().appStates.connectionState)
    
  // });

  // let currentRoom;
  // store.subscribe(() => {
    // const stateRoom = store.getState().roomName;
    // if (currentRoom !== stateRoom) {
      // socket.emit('change_room', { stateRoom: 'general' });
      // currentRoom = stateRoom;
    // }
  // });
};

function sendMessage(email, mess, time, roomName) {
  socket.emit('message', {
    email,
    mess,
    time,
    roomName,
  });
}

store.subscribe(() => {
  const { user, appStates } = store.getState();
  console.log(user.email, appStates.connectionState, 'client subscribe');
  // const storageEmail = AsyncStorage.getItem('userEmail');
  if (user.email && appStates.connectionState === false) {
    client(user.email);
  }
});

export default sendMessage;

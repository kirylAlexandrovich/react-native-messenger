import openSocket from 'socket.io-client';
import store from '../redux/store';
import { host } from '../constants';

let socket;

const client = (nickname) => {
  store.dispatch({ type: 'CHANGE_CONNECTION_STATE', payload: true });
  socket = openSocket(`${host}:8000`);

  socket.on('connected', () => {
    const { rooms } = store.getState();
    socket.emit('saveClient', nickname);
    socket.emit('joinToRooms', rooms.roomsList);
  });

  // socket.on('changeClientsList', (clientsList) => {
  //   console.log(clientsList);
  //   store.dispatch({ type: 'RENDER_CLIENTS_LIST', payload: clientsList });
  // });

  socket.on('message', (data) => {
    if (store.getState().rooms.roomName === data.roomName) {
      store.dispatch({ type: 'RENDER_MESS', payload: data });
    } else {
      store.dispatch({ type: 'NEW_MESSAGE', payload: data.roomName });
      // store.dispatch({ type: 'SAVE_MESSAGES_MAP', payload: { message: data.mess, room: data.roomName } });
    }
  });
  
  let currentRoomsList;
  let currentPrivateRoomsList;
  
  store.subscribe(() => {
    const { roomsList, privateRoomsList } = store.getState().rooms;

    if (JSON.stringify(roomsList) !== JSON.stringify(currentRoomsList)) {
      currentRoomsList = roomsList;
      socket.emit('joinToRooms', roomsList);
    }

    if (JSON.stringify(privateRoomsList) !== JSON.stringify(currentPrivateRoomsList)) {
      currentPrivateRoomsList = privateRoomsList;
      const roomsArr = [];
      currentPrivateRoomsList.forEach((el) => {
        roomsArr.push(el.name);
      });
      socket.emit('joinToRooms', roomsArr);
    }

    if (!store.getState().appStates.connectionState) {
      console.log('socket disconnect');
      socket.disconnect();
    }
  });
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
  // console.log(user.email, appStates.connectionState, 'client subscribe');
  // const storageEmail = AsyncStorage.getItem('userEmail');
  if (user.email && appStates.connectionState === false) {
    client(user.email);
  }
});

export default sendMessage;

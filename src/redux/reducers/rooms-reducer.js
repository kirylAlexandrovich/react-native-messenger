import { AsyncStorage, Alert } from 'react-native';

const initialState = {
  currentRoomName: 'general',
  roomName: '',
  wasRoomCreated: false,
  roomsList: [],
  privateRoomsList: [],
  roomMessagesMap: {},
  hasRoomNewMessage: {},
};

export default function rooms(state = initialState, action) {
  switch (action.type) {

    case 'CHANGE_ROOM':
      return { ...state, roomName: action.payload };

    case 'ROOM_CREATED':
      return { ...state, wasRoomCreated: action.payload };

    case 'CHANGE_ROOMS_LIST':
      return { ...state, roomsList: ['general', ...action.payload] };

    case 'CHANGE_PRIVATE_ROOMS_LIST':
      return { ...state, privateRoomsList: action.payload };
      
    // case 'GET_ROOMS_LIST':
    //   return { ...state, roomsList: action.payload };

    case 'SAVE_MESSAGES_MAP':
      return { ...state,
        roomMessagesMap: {
          ...state.roomMessagesMap,
          [action.payload.roomName]: [action.payload.message, ...state.roomMessagesMap[action.payload.roomName]]
        }
      };

    case 'NEW_MESSAGE':
      if(state.hasRoomNewMessage[action.payload]) {
        return { ...state,
          hasRoomNewMessage: {
            ...state.hasRoomNewMessage,
            [action.payload]: state.hasRoomNewMessage[action.payload] + 1
          }
        }
      }
      return { ...state, hasRoomNewMessage: { ...state.hasRoomNewMessage, [action.payload]: 1 }};

    case 'RESET_NEW_MESSAGES':
      return { ...state, hasRoomNewMessage: { ...state.hasRoomNewMessage, [action.payload]: '' }};

    default:
      return state;
  }
}

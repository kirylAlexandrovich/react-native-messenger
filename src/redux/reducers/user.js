import { AsyncStorage } from 'react-native';

const initialState = {
  email: null,
}

export default function user(state = initialState, action) {
  switch (action.type) {

    case 'SET_EMAIL':
      AsyncStorage.setItem('userEmail', action.payload);
      return { ...state, email: action.payload };
      
    default:
      return state;
  }
}
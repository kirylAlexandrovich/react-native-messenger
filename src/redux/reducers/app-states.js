// import { AsyncStorage } from 'react-native';

const initialState = {
  connectionState: false,
  loadingState: false,
};

export default function appStates(state = initialState, action) {
  switch (action.type) {
    
    case 'CHANGE_CONNECTION_STATE':
      return { ...state, connectionState: action.payload };

    case 'CHANGE_LOADING_STATE':
      // AsyncStorage.setItem('loadingState', action.payload);
      return { ...state, loadingState: action.payload };

    default:
      return state;
  }
}

import { Alert } from "react-native";
const initialState = {
  connectionState: false,
  loadingState: false,
  colorTheme: true,
};

export default function appStates(state = initialState, action) {
  switch (action.type) {
    
    case 'CHANGE_CONNECTION_STATE':
      return { ...state, connectionState: action.payload };

    case 'CHANGE_LOADING_STATE':
      return { ...state, loadingState: action.payload };

    case 'CHANGE_COLOR_THEME':
      Alert.alert('theme changed')
      return { ...state, colorTheme: action.payload };

    default:
      return state;
  }
}

import { Dimensions } from 'react-native';
import store from './redux/store';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const host = 'http://192.168.1.65';

export const gray = {
  dark: '#1b1b1b',
  middle: '#424242',
  lite: '#6d6d6d',
  borderColor: '#e8e8e8',
  textColorLite: '#fafafa',
  textColorDark: '#000',
  backgroundColor: '#fff',
} 
export const blue = {
  dark: '#4ba3c7',
  middle: '#81d4fa',
  lite: '#b6ffff',
  borderColor: '#e1f5fe',
  textColorLite: '#fafafa',
  textColorDark: '#000',
}

export const red = '#ce0014';
export const green = '#00ff00';
export const buttonsColor = '#28a745';

// store.getState().appStates.colorTheme ? gray : blue;
export const colorTheme = store.getState().appStates.colorTheme ? gray : blue;

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import reducers from './reducers/index';
import listsReducer from './reducers/lists';
import roomsReducer from './reducers/rooms-reducer';
import errorsReducer from './reducers/errors';
import appStatesReducer from './reducers/app-states';
import userReducer from './reducers/user';

const reducers = combineReducers({
  lists: listsReducer,
  rooms: roomsReducer,
  errors: errorsReducer,
  user: userReducer,
  appStates: appStatesReducer,
});

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

export default store;

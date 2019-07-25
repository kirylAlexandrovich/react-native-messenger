const initialState = {
  error: '',
}

export default function errors(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
}
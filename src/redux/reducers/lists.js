const initialState = {
  messages: [],
  clientsList: [],
  addingPeople: [],
};

export default function lists(state = initialState, action) {
  switch (action.type) {
    case 'RENDER_MESS':
      return { ...state, messages: [action.payload, ...state.messages] };

    case 'RERENDER_MESSAGE':
      return { ...state, messages: action.payload };

    case 'RENDER_CLIENTS_LIST':
      return { ...state, clientsList: action.payload };

    case 'SAVE_ADDING_PEOPLE':
      return { ...state, addingPeople: action.payload };

    default:
      return state;
  }
}

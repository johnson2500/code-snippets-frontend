export const SET_NOTES = 'SET_NOTES';
export const DELETE_NOTE = 'DELETE_NOTE';
export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';

const notesInitialState = {
  notes: [],
};

export const notesReducer = (state = notesInitialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_NOTES:
      return payload;
    case DELETE_NOTE:
      return state.filter((snip) => snip.id !== payload);
    case ADD_NOTE:
      return [
        ...state,
        payload,
      ];
    case UPDATE_NOTE:
      return state.map((snip) => {
        // if the id matches then update the list with
        if (snip.id === payload.id) {
          return payload;
        }
        return snip;
      });

    default:
      return state;
  }
};

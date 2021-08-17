export const SET_VIEW_NOTE = 'set_view_note';

const viewNoteInitialState = {
  note: {},
  editing: true,
};

export const viewNoteReducer = (state = viewNoteInitialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_VIEW_NOTE:
      console.log(action);
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export const SET_SNIPPETS = 'SET_SNIPPETS';
export const DELETE_SNIPPET = 'DELETE_SNIPPET';
export const ADD_SNIPPET = 'ADD_SNIPPET';
export const UPDATE_SNIPPET = 'UPDATE_SNIPPET';

const snippetsInitialState = {
  snippets: [],
};

export const snippetsReducer = (state = snippetsInitialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_SNIPPETS:
      console.log(action);
      return payload;
    case DELETE_SNIPPET:
      console.log(action);
      return state.filter((snip) => snip.id !== payload);
    case UPDATE_SNIPPET:
      console.log(action);
      return state.map((snip) => {
        // if the id matches then update the list with
        if (snip.id === payload.id) {
          return payload;
        }
        return snip;
      });
    case ADD_SNIPPET:
      console.log(action);
      console.log([
        ...state,
        payload,
      ]);

      return [
        ...state,
        payload,
      ];

    default:
      return state;
  }
};

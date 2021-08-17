export const SET_VIEW_SNIPPET = 'SET_VIEW_SNIPPET';

const viewSnippetInitialState = {
  snippet: {},
  editing: true,
};

export const viewSnippetReducer = (state = viewSnippetInitialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_VIEW_SNIPPET:
      console.log(action);
      return {
        ...state,
        snippet: { ...payload },
      };

    default:
      return state;
  }
};

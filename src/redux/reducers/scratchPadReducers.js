export const SET_SCRATCHPAD = 'SET_SCRATCHPAD';
export const DELETE_SCRATCHPAD = 'DELETE_SCRATCHPAD';

const scratchPadInitialState = {
};

export const scratchPadReducer = (state = scratchPadInitialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_SCRATCHPAD:
      console.log(action);
      return { ...payload };
    case DELETE_SCRATCHPAD:
      console.log(action);
      return payload;

    default:
      return state;
  }
};

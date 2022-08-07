export const SET_AUTH = 'SET_AUTH';

const authInitialState = {
  isNewUser: false,
};

export const authReducer = (state = authInitialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_AUTH:
      return payload;

    default:
      return state;
  }
};

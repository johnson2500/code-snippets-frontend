export const SET_AUTH = 'SET_AUTH';
export const DELETE_AUTH = 'DELETE_AUTH';
export const SET_AUTH_USER = 'SET_AUTH_USER';
export const SET_NEW_USER = 'SET_NEW_USER';

const authInitialState = {
  isNewUser: false,
};

export const authReducer = (state = authInitialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_AUTH:
      console.log(action);
      return {
        ...state,
        ...payload,
      };
    case DELETE_AUTH:
      console.log(action);
      return payload;
    case SET_AUTH_USER:
      console.log(action);
      return {
        ...state,
        ...payload,
      };
    case SET_NEW_USER:
      console.log(action);
      return {
        ...state,
        newUser: true,
      };

    default:
      return state;
  }
};

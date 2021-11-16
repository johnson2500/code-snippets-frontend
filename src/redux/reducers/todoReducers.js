export const SET_TODOS = 'SET_TODOS';
export const DELETE_TODO = 'DELETE_TODO';
export const ADD_TODO = 'ADD_TODO';

const todoInitialState = {
  todos: [],
};

export const todoReducer = (state = todoInitialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_TODOS:
      console.log(action);
      return payload;
    case DELETE_TODO:
      console.log(action);
      return state.filter((todo) => todo.id !== payload);
    case ADD_TODO:
      console.log(action);
      return [...state, payload];

    default:
      return state;
  }
};

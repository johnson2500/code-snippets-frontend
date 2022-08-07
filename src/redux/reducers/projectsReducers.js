export const SET_PROJECTS = 'SET_PROJECTS';

const notesInitialState = {
  projects: [{}],
};

export const projectsReducer = (state = notesInitialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_PROJECTS:
      return payload;

    default:
      return state;
  }
};

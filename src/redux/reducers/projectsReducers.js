export const SET_PROJECTS = 'SET_PROJECTS';

const notesInitialState = {
  projects: [{}],
};

export const projectsReducers = (state = notesInitialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_PROJECTS:
      return { projects: payload };

    default:
      return state;
  }
};

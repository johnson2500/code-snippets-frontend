/* eslint-disable no-case-declarations */
export const SET_PROJECTS = 'SET_PROJECTS';
export const SET_COMPLETE_TASK = 'SET_COMPLETE_TASK';

const notesInitialState = [{}];

export const projectsReducer = (state = notesInitialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_PROJECTS:
      return payload;

    case SET_COMPLETE_TASK:
      const { taskId, completed, projectId } = payload;

      const parsedProjects = state.map((project) => {
        if (project.id === projectId) {
          return project;
        }

        const { taskList = {} } = project;
        const { taskItems = [] } = taskList;
        const parsedTaskItems = taskItems.map((task) => {
          if (taskId === task.id) {
            return {
              ...task,
              completed,
            };
          }

          return task;
        });

        const newTaskList = {
          ...taskList,
          taskItems: parsedTaskItems,
        };
        return {
          ...project,
          taskList: newTaskList,
        };
      });

      return parsedProjects;

    default:
      return state;
  }
};

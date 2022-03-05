import makeRequest from './index';

export default async (token) => {
  const todosPromise = makeRequest({
    method: 'get',
    url: '/todos',
    token,
  });

  const tasksResponse = makeRequest({
    method: 'get',
    url: '/tasks',
    token,
  });

  const [
      todosResponse,
      tasksResponse
  ] = await Promise.all([
    todosPromise,
    tasksPromise,
  ]);

  return {
    todos: todosResponse,
    tasks: tasksResponse,
  };
};

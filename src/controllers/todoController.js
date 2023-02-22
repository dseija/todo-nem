export const createTodo = (req, res) => {
  console.log('createTodo:', req.body);
  res.send('Not implemented.');
};

export const getTodos = (req, res) => {
  res.send('Not implemented.');
};

export const getTodoById = (req, res) => {
  console.log('getTodoById:', req.params.todoId);
  res.send('Not implemented.');
};

export const updateTodo = (req, res) => {
  console.log('updateTodo:', req.body);
  res.send('Not implemented.');
};

export const removeTodo = (req, res) => {
  console.log('removeTodo:', req.params.todoId);
  res.send('Not implemented.');
};

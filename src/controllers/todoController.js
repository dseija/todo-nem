import todoModel from '../models/todoModel';

export const createTodo = async (userId, description) => {
  const newTodo = new todoModel({ description, userId });
  try {
    const todo = await newTodo.save();
    return [null, todo.safeProps()];
  } catch (err) {
    return [err];
  }
};

export const getTodos = async (userId) => {
  try {
    const todos = await todoModel.find({ userId }).sort({ createdAt: 1 });
    return [null, todos.map((todo) => todo.safeProps())];
  } catch (err) {
    return [err];
  }
};

export const getTodoById = async (userId, todoId) => {
  try {
    const todo = await todoModel.findOne({ userId, _id: todoId });
    if (!todo) return [{ name: 'NotFound' }];

    return [null, todo.safeProps()];
  } catch (err) {
    return [err];
  }
};

export const updateTodo = async (userId, todoId, todoProps) => {
  try {
    const todo = await todoModel.findOneAndUpdate(
      { userId, _id: todoId },
      todoProps,
      {
        new: true,
      }
    );
    if (!todo) return [{ name: 'NotFound' }];

    return [null, todo.safeProps()];
  } catch (err) {
    return [err];
  }
};

export const removeTodo = async (userId, todoId) => {
  try {
    const result = await todoModel.deleteOne({ userId, _id: todoId });
    if (result.deletedCount === 0) return [{ name: 'NotFound' }];

    return [null];
  } catch (err) {
    return [err];
  }
};

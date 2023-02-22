import todoModel from '../models/todoModel';

export const createTodo = async (todoProps) => {
  const newTodo = new todoModel(todoProps);
  try {
    const todo = await newTodo.save();
    return [null, todo];
  } catch (err) {
    return [err];
  }
};

export const getTodos = async () => {
  try {
    const todos = await todoModel.find({}).sort({ createdAt: -1 });
    return [null, todos];
  } catch (err) {
    return [err];
  }
};

export const getTodoById = async (todoId) => {
  try {
    const todo = await todoModel.findById(todoId);
    if (!todo) return [{ name: 'NotFound' }];

    return [null, todo];
  } catch (err) {
    return [err];
  }
};

export const updateTodo = async (todoId, todoProps) => {
  try {
    const todo = await todoModel.findOneAndUpdate({ _id: todoId }, todoProps, {
      new: true,
    });
    if (!todo) return [{ name: 'NotFound' }];

    return [null, todo];
  } catch (err) {
    return [err];
  }
};

export const removeTodo = async (todoId) => {
  try {
    const result = await todoModel.deleteOne({ _id: todoId });
    if (result.deletedCount === 0) return [{ name: 'NotFound' }];

    return [null];
  } catch (err) {
    return [err];
  }
};

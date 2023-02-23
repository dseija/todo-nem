import userModel from '../models/userModel';

export const createUser = async (userProps) => {
  const newUser = new userModel(userProps);
  try {
    const user = await newUser.save();
    return [null, user.safeProps()];
  } catch (err) {
    return [err];
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) return [{ name: 'NotFound' }];

    return [null, user];
  } catch (err) {
    return [err];
  }
};

export const getUserByUsername = async (username) => {
  try {
    const user = await userModel.findOne({ username });
    if (!user) return [{ name: 'NotFound' }];

    return [null, user];
  } catch (err) {
    return [err];
  }
};

export const updateUser = async (userId, userProps) => {
  try {
    const user = await userModel.findOneAndUpdate({ _id: userId }, userProps, {
      new: true,
    });
    if (!user) return [{ name: 'NotFound' }];

    return [null, user.safeProps()];
  } catch (err) {
    return [err];
  }
};

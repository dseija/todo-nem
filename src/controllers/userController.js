import userModel from '../models/userModel';
import jwt from 'jsonwebtoken';

export const createUser = async (userProps) => {
  const newUser = new userModel(userProps);
  try {
    const user = await newUser.save();
    return [null, user.safeProps()];
  } catch (err) {
    if (err.code === 11000) return [{ ...err, name: 'Duplicate' }];
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

export const getSignedToken = (userProps, apiConfig) => {
  return jwt.sign(
    { userId: userProps.id, username: userProps.username },
    apiConfig.jwtSecret,
    { expiresIn: apiConfig.jwtExpiration }
  );
};

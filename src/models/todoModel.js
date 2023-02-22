import mongoose from 'mongoose';

const todoModel = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default todoModel;

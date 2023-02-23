import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

todoSchema.methods.safeProps = function () {
  const { id, description, completed, createdAt, updatedAt } = this;
  return { id, description, completed, createdAt, updatedAt };
};

const todoModel = mongoose.model('Todo', todoSchema);

export default todoModel;

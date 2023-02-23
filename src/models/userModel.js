import crypto from 'crypto';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: true,
      index: true,
      unique: true,
      default: () => crypto.randomBytes(20).toString('hex'),
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    try {
      const hash = await bcrypt.hash(user.password, 12);
      user.password = hash;
    } catch (err) {
      return next(err);
    }
  }

  return next();
});

userSchema.methods.comparePasswords = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.safeProps = function () {
  const { id, username, firstname, lastname, verified } = this;
  return { id, username, firstname, lastname, verified };
};

const userModel = mongoose.model('User', userSchema);

export default userModel;

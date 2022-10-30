import mongoose from 'mongoose';

import { IUser } from './../interfaces/user.interface';

const { Schema, model } = mongoose;

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    image: String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'friends' }],
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>('User', UserSchema);

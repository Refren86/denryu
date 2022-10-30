import { Schema, model } from 'mongoose';

const FriendSchema = new Schema(
  {
    requester: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Friend', FriendSchema);

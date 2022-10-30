import { Schema, model } from 'mongoose';
import { ITokenModel } from '../interfaces/token.interface';

const TokenSchema = new Schema<ITokenModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<ITokenModel>('Token', TokenSchema);

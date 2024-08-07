import { Document, model, Schema } from 'mongoose';
import { User } from '@interfaces/users.interface';

const tokenSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  expiresIn: {
    type: Number,
  },
});

const tokenModel = model<User & Document>('Token', tokenSchema);

export default tokenModel;

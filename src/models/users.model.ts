import { Document, model, Schema } from 'mongoose';
import { User } from '@interfaces/users.interface';
import mongoose_delete from 'mongoose-delete';

/**
 * @swagger
 * definitions:
 *  User:
 *      type: object
 *      properties:
 *          email:
 *              type: string
 *          password:
 *              type: string
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 * */
const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    }
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { virtuals: true, getters: true },
  },
);

userSchema.plugin(mongoose_delete, { overrideMethods: true });

const userModel = model<User & Document>('User', userSchema);

export default userModel;

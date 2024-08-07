import { Document, model, Schema } from 'mongoose';
import { Book } from '@interfaces/book.interface';
import mongoose_delete from 'mongoose-delete';

/**
 * @swagger
 * definitions:
 *  Book:
 *      type: object
 *      properties:
 *          title:
 *              type: string
 *              required: true
 *          author:
 *              type: string
 *              required: true
 *          isbn:
 *              type: number
 *              required: true
 * */
const bookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: Number,
      required: true,
      unique: true,
    }
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { virtuals: true, getters: true },
  },
);

bookSchema.plugin(mongoose_delete, { overrideMethods: true });


const bookModel = model<Book & Document>('Book', bookSchema);

export default bookModel;

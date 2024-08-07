import { CreateBookDto } from '@/dtos/books.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import bookModel from '@models/book.model';
import { Book } from '@interfaces/book.interface';

class BookService {
  public books = bookModel;

  public async findAllBooks(): Promise<Book[]> {
    const books: Book[] = await this.books.find();
    return books;
  }

  public async findBookById(bookId: string): Promise<Book> {
    if (isEmpty(bookId)) throw new HttpException(400, 'BookId is empty');

    const findBook: Book = await this.books.findOne({ isbn: +bookId });
    if (!findBook) throw new HttpException(409, "Book doesn't exist");

    return findBook;
  }

  public async createBook(bookData: CreateBookDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'bookData is empty');

    const findBook: Book = await this.books.findOne({ isbn: +bookData.isbn });
    if (findBook) throw new HttpException(409, `This Book isbn: ${bookData.isbn} already exists`);

    const createBookData: Book = await this.books.create({ ...bookData });

    return createBookData;
  }

  public async updateBook(bookData: any): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'bookData is empty');
    const updateBookById: any = await this.books.findOneAndUpdate({ isbn: bookData.isbn }, bookData, {
      new: true,
      upsert: true, // Make this update into an upsert,
    });
    if (!updateBookById) throw new HttpException(409, "Book doesn't exist");

    return updateBookById;
  }

  public async deleteBook(deleteBookId: string): Promise<Book> {
    if (isEmpty(deleteBookId)) throw new HttpException(400, 'BookId is empty');

    const deleteBookById: Book = await this.books.findOneAndUpdate({ isbn: +deleteBookId }, { deleted: true }, { new: true });
    if (isEmpty(deleteBookById)) throw new HttpException(409, "Book doesn't exist");

    return deleteBookById;
  }
}

export default BookService;

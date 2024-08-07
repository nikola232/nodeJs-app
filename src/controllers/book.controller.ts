import { NextFunction, Request, Response } from 'express';
import BookService from '@services/book.service';
import { Book } from '@interfaces/book.interface';
import { CreateBookDto } from '@/dtos/books.dto';

class BooksController {
  public bookService = new BookService();

  public getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllBooksData: Book[] = await this.bookService.findAllBooks();

      res.status(200).json({ books: findAllBooksData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId: string = req.params.id;
      const book: Book = await this.bookService.findBookById(bookId);

      res.status(200).json({ book: book, status: true });
    } catch (error) {
      next(error);
    }
  };

  public createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creteBook: CreateBookDto = req.body;
      const book = await this.bookService.createBook(creteBook);

      res.status(200).json({ book: book, status: true });
    } catch (error) {
      next(error);
    }
  };

  public updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creteBook: Book = req.body;
      const book = await this.bookService.updateBook(creteBook);

      res.status(200).json({ book: book, status: true });
    } catch (error) {
      next(error);
    }
  };

  public deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteBookId: string = req.params.id;
      await this.bookService.deleteBook(deleteBookId);

      res.status(200).json({ message: 'Book was deleted', status: true });
    } catch (error) {
      next(error);
    }
  };
}

export default BooksController;

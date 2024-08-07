import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import BookController from '@controllers/book.controller';
import authMiddleware from '@middlewares/auth.middleware';

class BooksRoute implements Routes {
  public router = Router();
  public booksController = new BookController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /books:
     *  get:
     *      tags:
     *        - Books
     *      summary: Will return all books
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              type: array
     *              items:
     *                  $ref: '#/definitions/Books'
     */ //GET - /books
    this.router.get('/books', authMiddleware, this.booksController.getBooks);

    /**
     * @swagger
     * /books:
     *  post:
     *      tags:
     *        - Books
     *      summary: Will return created books
     *      produces:
     *          - application/json
     *      parameters:
     *      - name: body
     *        in: body
     *        description: Book Data
     *        required: true
     *        schema:
     *          $ref: '#/definitions/Book'
     *      responses:
     *          200:
     *              type: object
     *              items:
     *                  $ref: '#/definitions/Book'
     */ //POST - /books
    this.router.post('/books', authMiddleware, this.booksController.createBook);

    /**
     * @swagger
     * /book/{id}:
     *  put:
     *      tags:
     *        - Books
     *      summary: Will return updated book
     *      produces:
     *          - application/json
     *      parameters:
     *      - name: id
     *        in: path
     *        required: true
     *        type: string
     *      - name: body
     *        in: body
     *        description: Book Data
     *        required: true
     *        schema:
     *          $ref: '#/definitions/Book'
     *      responses:
     *          200:
     *              type: object
     *              items:
     *                  $ref: '#/definitions/Book'
     */ //PUT - /book/:id
    this.router.put('/book/:id', authMiddleware, this.booksController.updateBook);

    /**
     * @swagger
     * /book/{id}:
     *  get:
     *      tags:
     *        - Books
     *      summary: Will return book by id
     *      produces:
     *          - application/json
     *      parameters:
     *      - name: id
     *        in: path
     *        required: true
     *        type: string
     *      responses:
     *          200:
     *              type: array
     *              items:
     *                  $ref: '#/definitions/Book'
     */ //GET - /book/:id
    this.router.get('/book/:id', authMiddleware, this.booksController.getBookById);

    /**
     * @swagger
     * /book/{id}:
     *  delete:
     *      tags:
     *        - Books
     *      summary: Delete selected book
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *          '200':
     *              description: Successfully deleted entity
     */ //Delete - /book/:id
     this.router.delete('/book/:id', authMiddleware, this.booksController.deleteBook);
  }
}

export default BooksRoute;

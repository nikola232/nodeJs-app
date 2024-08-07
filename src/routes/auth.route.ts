import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { BaseUserDto } from '@dtos/base.dto';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /signup:
     *  post:
     *    tags:
     *       - Authentication
     *    summary: SignUp / Create User
     *    description: Creates a new user account
     *    consumes:
     *      - application/json
     *    produces:
     *      - application/json
     *    parameters:
     *      - name: credentials
     *        in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *            email:
     *              type: string
     *              format: email
     *            password:
     *              type: string
     *            firstName:
     *              type: string
     *            lastName:
     *              type: string
     *    responses:
     *      201:
     *        description: Successful signup
     *        schema:
     *          type: object
     *          properties:
     *            token:
     *              type: string
     *      400:
     *        description: Invalid request body
     *      500:
     *        description: Server error
     */ //POST - /signup
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);

    /**
     * @swagger
     * /login:
     *  post:
     *    tags:
     *       - Authentication
     *    summary: Login
     *    description: Logs in a user and returns a JWT token
     *    consumes:
     *      - application/json
     *    produces:
     *      - application/json
     *    parameters:
     *      - name: credentials
     *        in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *            email:
     *              type: string
     *              format: email
     *            password:
     *              type: string
     *    responses:
     *      200:
     *        description: Successful login
     *        schema:
     *          type: object
     *          properties:
     *            token:
     *              type: string
     *      400:
     *        description: Invalid credentials
     *      500:
     *        description: Server error
     */ //POST - /login
    this.router.post(`${this.path}login`, validationMiddleware(BaseUserDto, 'body'), this.authController.logIn);

    /**
     * @swagger
     * /logout:
     *   post:
     *     tags:
     *       - Authentication
     *     summary: Logout
     *     description: Logs out the current user by invalidating the JWT token
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Successful logout
     *       401:
     *         description: Unauthorized - user not logged in
     *       500:
     *         description: Server error
     */ //POST - /logout
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
    
    /**
     * @swagger
     * /forgot-password:
     *  post:
     *    tags:
     *       - Authentication
     *    summary: Request a password reset
     *    description: Request a password via email
     *    consumes:
     *      - application/json
     *    produces:
     *      - application/json
     *    parameters:
     *      - name: credentials
     *        in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *            email:
     *              type: string
     *              format: email
     *    responses:
     *      201:
     *        description: Password reset email sent
     *        schema:
     *          type: object
     *          properties:
     *            token:
     *              type: string
     *      400:
     *        description: Validation error
     *      500:
     *        description: User not found
     */ //POST - /forgot-password
    this.router.post(`${this.path}forgot-password`, this.authController.forgotPassword);

    /**
     * @swagger
     * /reset-password/{token}:
     *  post:
     *    tags:
     *       - Authentication
     *    summary: Update the user's password
     *    description: Update the user's password
     *    consumes:
     *      - application/json
     *    produces:
     *      - application/json
     *    parameters:
     *      - name: token
     *        in: path
     *        required: true
     *        type: string
     *      - name: credentials
     *        in: body
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *            email:
     *              type: string
     *              format: email
     *            newPassword:
     *              type: string
     *    responses:
     *      200:
     *        description: Password updated successfully
     *      400:
     *        description: Validation error
     *      404:
     *        description: Invalid or expired token
     *      500:
     *        description: Internal server error
     */ //POST - /reset-password/:token
    this.router.post(`${this.path}reset-password/:token`, this.authController.resetPassword);
  }
}

export default AuthRoute;

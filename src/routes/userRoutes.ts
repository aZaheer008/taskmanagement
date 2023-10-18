import express from 'express';
import UserController from '../controllers/userController';

const userRouter = express.Router();

// Define routes for user-related actions

// Route for user registration (signup)
userRouter.post('/signup', UserController.signup);

// Route for user login
userRouter.post('/login', UserController.login);

export default userRouter;

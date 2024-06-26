import { Router } from 'express';
import AuthController from './controller';

const AuthRouter = Router();

// Signup
AuthRouter.route('/signup').post(AuthController.signup);

// Login
AuthRouter.route('/login').post(AuthController.login);

AuthRouter.route('/renewAccessToken').post(AuthController.renewAccessToken);

AuthRouter.post('/forgotpassword', AuthController.forgotPassword);

export default AuthRouter;

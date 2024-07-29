import { NextFunction, Request, Response } from 'express';
import { Auth } from './types';
import {  successResponse } from '../../../utils/HttpResponse';
import { messages } from '../../../utils/Messages';
import AuthService from './service';
import { User } from '../Users/model';
import InputValidation from '../../../utils/InputValidation';

const AuthController = {
  async signup(req: Request<unknown, unknown, User>, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      InputValidation.validateUser(body);
      const result = await AuthService.signup(body);
      return successResponse({
        status: 200,
        response: res,
        message: messages.auth.otp_sent,
        data: result,
      });
    } catch (error) {
      next(error)
    }
  },
  async login(req: Request<unknown, unknown, Auth>, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      InputValidation.validateAuth(body);
      const result = await AuthService.login(body);
      console.log('here')
      return successResponse({
        status: 200,
        response: res,
        message: messages.auth.login_success,
        data: result
      });
    } catch (error) {
      next(error)
    }
  },
  async renewAccessToken(req: Request<{ token: string }>, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.body.token;

      const result = await AuthService.renewAccessToken(refreshToken);
      return successResponse({
        status: 200,
        response: res,
        message: messages.auth.refresh_success,
        data: result,
      });
    } catch (error) {
      next(error)
    }
  },
  async forgotPassword(req: Request<unknown, unknown, { email: string }>, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      InputValidation.validateEmail(email);

      const user = await AuthService.forgotPassword(email);
      return successResponse({
        response: res,
        message: messages.auth.forgot_success,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
};

export default AuthController;

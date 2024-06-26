import { Response, Request, NextFunction } from 'express';
import CustomError from '../../../utils/Error/index';
import UserService from './service';
import { successResponse } from '../../../utils/HttpResponse';
import { messages } from '../../../utils/Messages';
import { User } from './model';
import InputValidation from '../../../utils/InputValidation';
import { verifyJwt } from '../../../utils/Jwt';
import { Payload } from './types';

const UserController = {
  async resendOtp(req: Request<unknown, unknown, { email: string }>, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      const { email } = req.body;
      const isValidEmail = InputValidation.validateEmail(email);
      if (!isValidEmail) throw new CustomError(messages.validation.invalid_email, 400);

      const user = await UserService.resendOtp(email);
      return successResponse({
        response: res,
        message: messages.auth.otp_sent,
        data: user,
      });
    } catch (error) {
      next(error)
    }
  },

  async verifyOtp(req: Request<{ otp: string, email: string }>, res: Response, next: NextFunction) {
    try {
      const { otp, email } = req.params;
      InputValidation.validateOTP(otp);

      const isValidEmail = InputValidation.validateEmail(email);
      if (!isValidEmail) {
          throw new CustomError(messages.validation.invalid_email, 400);
      }


      const user = await UserService.verifyOtp(email, otp);
      return successResponse({
          response: res,
          message: messages.user.user_verified,
          data: user,
      });
  } catch (error) {
      next(error);
  }
  },
  async updateUser(req: Request<{ id: string }, unknown, Partial<User>>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const body = req.body;

      const result = await UserService.updateUser(id, body);
      if (!result) throw new CustomError(messages.user.not_found, 404);
      return successResponse({
        response: res,
        message: messages.user.update_success,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteUser(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await UserService.deleteUser(id);
      next(successResponse({
        response: res,
        message: messages.user.delete_success,
      }));
    } catch (error) {
      next(error);
    }
  },
  async changePassword(req: Request<unknown, unknown, { password: string, token: string }>, res: Response, next: NextFunction) {
    try {
      const { password, token } = req.body;

      const decoded = verifyJwt(token, 'accessToken') as Payload | null;
      if(decoded){
        const result = await UserService.changePassword(password, decoded.id);
        if(!result) throw new CustomError(messages.user.not_found, 404);
        return successResponse({
          response: res,
          message: messages.user.update_success,
          data: result,
        });
      }

    } catch (error) {
      next(error);
    }
  }
  
};

export default UserController;
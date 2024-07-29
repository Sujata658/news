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
  async updateUser(req: Request<unknown, unknown, Partial<User>>, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user._id as string;
      const body = req.body;

      const result = await UserService.updateUser(userId, body);
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
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user._id as string;

      await UserService.deleteUser(userId);
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
  },
  async editPassword(req: Request<unknown, unknown, { currentpassword: string, newpassword:string, cpassword: string }>, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user._id as string;
      const { currentpassword, newpassword, cpassword } = req.body;

      if(!currentpassword || !newpassword || !cpassword) throw new CustomError(messages.validation.param_missing, 400);

      if(newpassword !== cpassword) throw new CustomError(messages.validation.password_not_match, 400);

      const result = await UserService.editPassword(userId, currentpassword, newpassword, cpassword);
      if (!result) throw new CustomError(messages.user.not_found, 404);
      return successResponse({
        response: res,
        message: messages.user.update_success,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
 
};

export default UserController;
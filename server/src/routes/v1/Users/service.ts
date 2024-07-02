import CustomError from '../../../utils/Error';
import InputValidation from '../../../utils/InputValidation';
import { getUserByEmail, getUserById, deleteUser, updateVerified,updatePassword,  updateUser } from './repository';
import { messages } from '../../../utils/Messages';
import { sendMail } from '../../../config/sendMail';
import env from '../../../config/env';
import { User } from './model';


const UserService = {
  async resendOtp(email: string) {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new CustomError(messages.user.not_found, 404);
    }
    if (user.isVerified) {
      throw new CustomError(messages.user.user_already_verified, 400);
    } else {
      const url = env.baseUrl + '/verify/' + user.otp + '/' + user.email;

      await sendMail(user.email, 'Verify Email', `Please click on the link to verify your email: ${url}`);

      return user;
    }

  },
  async verifyOtp(email: string, code: string) {
    const record = await UserService.getUserByEmail(email);
    if (!record) {
        throw new CustomError(messages.user.not_found, 400);
    }
    if (record.isVerified) {
        throw new CustomError(messages.user.user_already_verified, 400);
    }
    if (record.otp !== code) {
        throw new CustomError(messages.auth.invalid_otp, 400);
    }
    
    const result = await updateVerified(record._id.toString(), true);
    if (!result) {
        throw new CustomError(messages.user.verification_failed, 404);
    }

    const { password, otp, ...user } = result.toObject();
    return user;
}
,
  async getUser(id: string) {
    InputValidation.validateid(id)
    const user = await getUserById(id);
    if (!user) {
      throw new CustomError(messages.user.not_found, 404);
    }
    return user;
  },
  async getUserByEmail(email: string) {
    return getUserByEmail(email);
  },
  async deleteUser(id: string) {
    InputValidation.validateid(id);
    const user = await getUserById(id);
    if (!user) {
      throw new CustomError(messages.user.not_found, 404);
    }
    return deleteUser(id);
  },
  updateUser(id: string, userData: Partial<User>) {
    InputValidation.validateid(id);
    const updateData: Partial<User> = {};
    if (userData.name) {
      updateData.name = userData.name;
    }
    return updateUser(id, updateData);
  },
  async logout(id: string) {
    InputValidation.validateid(id);
    const user = await getUserById(id);
    if (!user) {
      throw new CustomError(messages.user.not_found, 404);
    }
    return true
  },
 async changePassword(password: string, id: string) {
    const user = await getUserById(id);
    if (!user) {
      throw new CustomError(messages.user.not_found, 404);
    }
    
    return updatePassword(id, password);
  },
 
};

export default UserService;
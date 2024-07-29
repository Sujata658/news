import { User, UserDocument, UserModel } from './model';

export const createUserRepo = async (userData: User, code: string): Promise<Partial<UserDocument>> => {
  const user = new UserModel({ ...userData, otp: code, otpExpires: new Date(Date.now() + 600000) });

  const userWithPasswordandOtp = await user.save();

  const { password, otp, ...userWithoutPassword } = userWithPasswordandOtp.toObject();
  return userWithoutPassword;
};

export const getUserByEmail = (email: string) => {
  return UserModel.findOne({ email: email });
};
export const getUserById = (id: string)=> {
  return UserModel.findById({ _id: id }).select('-password');
}

export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

export const updateVerified = async (id: string, verified: boolean) => {
  return await UserModel.findByIdAndUpdate(
      id,
      { isVerified: verified, $unset: { otp: 1 } },
      { new: true }
  );
}


export const updateUser = (id: string, userData: Partial<User>) => {
  return UserModel.findByIdAndUpdate(id, userData, { new: true }).select('-password -__v -_id');
}
export const deleteUser = (id: string) => {
  return UserModel.findByIdAndDelete(id);
}

export const updatePassword = async ( id: string,password: string) => {
  return await UserModel.findByIdAndUpdate(id, { password: password });
}

export const getUserByIdWithPassword = (id: string) => {
  return UserModel.findById({ _id: id });
}

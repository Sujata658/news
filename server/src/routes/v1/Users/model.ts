import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import CustomError from '../../../utils/Error';
import { messages } from '../../../utils/Messages';
import { PreferencesModel } from '../Preferences/model';

export interface User {
  fname: string;
  lname: string;
  email: string;
  password: string;
  phone?: string;
  isVerified?: boolean;
  otp?: string;
  preferences?: string;
}


export const userPrivateFields = ['password', '__v', 'createdAt', 'updatedAt', 'otp'];

export interface UserDocument extends User {
  comparePassword(candidatePassword: string): Promise<boolean>;
  setOtp(code: string): void;
  isOtpValid(code: string): boolean;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    fname: {
      type: String,
      required: [true, 'First Name is Required'],
      unique: false,
    },
    lname: {
      type: String,
      required: [true, 'Last Name is Required'],
      unique: false,
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
      immutable: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
      unique: false,
    },
    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
    otp: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.isOtpValid

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    if (err instanceof Error) next(err);
  }
});

userSchema.post('save', async function (doc: any, next: any) {
  try {
    const preferences = new PreferencesModel({ user: doc._id, configs: [] });
    await preferences.save();
    next();
  } catch (error) {
    if(error instanceof Error) next(error);
  }
}
);

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  if (!this.password) throw new CustomError(messages.auth.invalid_account, 401);
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.setOtp = function (code: number) {
  this.otp = code;
};

userSchema.methods.isOtpValid = function (code: number) {
  return this.otp === code;
};

export const UserModel = mongoose.model<UserDocument>('user', userSchema);
import { Preferences } from "./preferences";

export interface SignUpData {
    fname: string;
    lname: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface User {
    _id: string;
    fname: string;
    lname: string;
    email: string;
    phone?: string;
    preferences: Preferences;
    isverified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateUserData {
    fname?: string;
    lname?: string;
    phone?: string;
}

export interface EditPasswordData {
    currentpassword: string;
    newpassword: string;
    cpassword: string;
}
    
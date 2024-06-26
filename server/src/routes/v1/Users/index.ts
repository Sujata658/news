import { Router } from "express";
import UserController from "./controller";

const UserRouter = Router({mergeParams: true});

UserRouter.post('/resendotp', UserController.resendOtp);

UserRouter.post('/verify/:otp/:email', UserController.verifyOtp);

UserRouter.post('/changePassword', UserController.changePassword);

export default UserRouter;
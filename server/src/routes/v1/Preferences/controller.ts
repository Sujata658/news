import { NextFunction, Request, Response } from "express";
import CustomError from "../../../utils/Error";
import InputValidation from "../../../utils/InputValidation";
import { messages } from "../../../utils/Messages";
import { successResponse } from "../../../utils/HttpResponse";
import PreferencesService from "./service";
import { PreferencesProps } from "./model";

const PreferencesController = {
    async getPreferences(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = res.locals.user as { _id: string };
            InputValidation.validateid(userId._id);
            
            const result = await PreferencesService.getPreferences(userId);
            if (!result) throw new CustomError(messages.preferences.not_found, 404);

            return successResponse({
                    response: res,
                    message: messages.preferences.get_success,
                    data: result,
                });
            
        } catch (error) {
            next(error);
        }
    },
    async createPreferences(req: Request<unknown, unknown, PreferencesProps>, res: Response, next: NextFunction) {
        try {
            const preferences = req.body;
            const userId = res.locals.user as { _id: string };
            InputValidation.validateid(userId._id);
            const result = await PreferencesService.createPreferences(userId, preferences);
            return successResponse({
                response: res,
                message: messages.preferences.create_success,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },
    async deletePreferences(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = res.locals.user as { _id: string };
            InputValidation.validateid(userId._id);
            const result = await PreferencesService.deletePreferences(userId);
            return successResponse({
                response: res,
                message: messages.preferences.delete_success,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
    
}

export default PreferencesController;

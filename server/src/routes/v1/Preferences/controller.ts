import { NextFunction, Request, Response } from "express";
import InputValidation from "../../../utils/InputValidation";
import { messages } from "../../../utils/Messages";
import { successResponse } from "../../../utils/HttpResponse";
import PreferencesService from "./service";

const PreferencesController = {
    async getPreferences(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = res.locals.user as { _id: string };
            InputValidation.validateid(userId._id);

            const result = await PreferencesService.getPreferences(userId._id);
            if (!result) {
                return successResponse({
                    response: res,
                    message: messages.preferences.not_found,
                    data: {},
                });
            }else{
                return successResponse({
                    response: res,
                    message: messages.preferences.get_success,
                    data: result,
                });
            }
        } catch (error) {
            next(error);
        }
    },
    async handleDefault(req: Request<unknown, unknown, {defaultId: string}>, res: Response, next: NextFunction) {
        try {
            const userId = res.locals.user as { _id: string };
            InputValidation.validateid(userId._id);
            InputValidation.validateid(req.body.defaultId);

            const result = await PreferencesService.handleDefault(userId._id, req.body.defaultId);
            return successResponse({
                response: res,
                message: messages.preferences.update_success,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
    // async deletePreferences(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const userId = res.locals.user as { _id: string };
    //         InputValidation.validateid(userId._id);

    //         const result = await PreferencesService.deletePreferences(userId._id);
    //         return successResponse({
    //             response: res,
    //             message: messages.preferences.delete_success,
    //             data: result,
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // }
};

export default PreferencesController;

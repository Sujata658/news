import { NextFunction, Request, Response } from "express";
import { Config } from "./model";
import { successResponse } from "../../../utils/HttpResponse";
import ConfigServices from "./services";
import CustomError from "../../../utils/Error";

const ConfigController = {
    async createConfig(req: Request<unknown, unknown, {config: Config}>, res: Response, next:NextFunction) {
        try {
            console.log('createConfig:', req.body.config)
            const config = req.body.config;

            const userId = res.locals.user as { _id: string };


            const result = await ConfigServices.create(config, userId._id);
            return successResponse({
                response: res,
                message: 'Config created successfully',
                data: result,
            });
        }catch(error){
            next(error);
        }
    },
    async updateConfig(req: Request<{configId: string}, unknown, {config: Config}>, res: Response, next: NextFunction) {
        try {
            const config = req.body.config;
            const configId = req.params.configId;
            const userId = res.locals.user as { _id: string };

            await ConfigServices.updateConfig(userId._id, configId, config);
            return successResponse({
                response: res,
                message: 'Config updated successfully'
            });
        } catch (error) {
            next(error);
        }
    },
    async deleteConfig(req: Request<{configId: string}, unknown, unknown>, res: Response, next: NextFunction) {
        try {
            const configId = req.params.configId;
            const userId = res.locals.user as { _id: string };

            const config = await ConfigServices.getConfigById(userId._id);
            if(!config) throw new CustomError('Config not found', 404);

            const result = await ConfigServices.deleteConfig(userId._id, configId);
            return successResponse({
                response: res,
                message: 'Config deleted successfully',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },
    
};

export default ConfigController;
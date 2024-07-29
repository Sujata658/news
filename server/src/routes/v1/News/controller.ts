import { NextFunction, Request, Response } from "express";
import NewsService from "./service";
import { successResponse } from "../../../utils/HttpResponse";
import { NewsRequestBody } from "./types";

const NewsController = {
    async getNews(req: Request<unknown, unknown, NewsRequestBody>, res: Response, next: NextFunction) {
        try {
            const params = req.body;
            const news = await NewsService.getNews(params);
            return successResponse({
                response: res,
                status: 200,
                message: "News fetched successfully",
                data: news
            });
        } catch (error) {
            next(error);
        }
    },
    async getCategories(req: Request<unknown , unknown, {categories: string[]}>, res: Response, next: NextFunction) {
        try {
            const categories = req.body.categories;
            if(!categories) throw new Error("No categoris provided");

            const result =  await NewsService.getCategories(categories);
            return successResponse({
                response: res,
                status: 200,
                message: "Categories fetched successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
};

export default NewsController;

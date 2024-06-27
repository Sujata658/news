import { NextFunction, Request, Response } from "express";
import NewsService from "./service";
import { successResponse } from "../../../utils/HttpResponse";
import CustomError from "../../../utils/Error";

const NewsController = {
    async getNews(req: Request<unknown, unknown, {query: string}>, res: Response, next: NextFunction) {
        try {
            console.log('getNews query:', req.body)
            const { query } = req.body;
            if(!query) throw new CustomError("query is required", 400);
            const news = await NewsService.getNews(query);
            console.log('controller')
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
    
    
};

export default NewsController;

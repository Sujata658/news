import { Router } from "express";
import NewsController from "./controller";

const NewsRouter = Router();

NewsRouter.post('/', NewsController.getNews);

NewsRouter.post('/categories', NewsController.getCategories);

export default NewsRouter;

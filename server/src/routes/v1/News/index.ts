import { Router } from "express";
import NewsController from "./controller";

const NewsRouter = Router();

NewsRouter.post('/', NewsController.getNews);


export default NewsRouter;
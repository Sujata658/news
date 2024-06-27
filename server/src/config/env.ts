import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  cors: process.env.CORS,
  mongoDbConnectionUrl: process.env.MONGO_URL,
  accessKeySecret: process.env.ACCESS_KEY || 'access',
  refreshKeySecret: process.env.REFRESH_KEY || 'refresh',
  baseUrl: process.env.BASEURL || 'http://localhost:5173',


  newsUrl: process.env.NEWS_URL || 'https://newsapi.org/v2',
  newsApiKey: process.env.NEWS_API_KEY || 'newsApiKey',
};

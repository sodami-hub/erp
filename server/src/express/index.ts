import express from 'express';
import cors from 'cors';

export const createExpressApp = (...args: any[]) => {
  const app = express();
  app
    .use(cors())
    .use(express.json())
    .get('/', (req, res) => {
      res.json({message: 'hello world'});
    });
  return app;
};

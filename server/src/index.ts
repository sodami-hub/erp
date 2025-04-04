import {createServer} from 'http';
import type {Mysql} from './database';
import {connectAndUseDB} from './database';
import {createExpressApp} from './express';

const connectCallback = (db: Mysql) => {
  const hostname = 'localhost';
  const port = 4000;
  createServer(createExpressApp(db)).listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

connectAndUseDB(connectCallback);

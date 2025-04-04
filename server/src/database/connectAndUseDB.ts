import mysql from 'mysql';

export type Mysql = mysql.Connection;
export type Callback = (conn: mysql.Connection) => void;

export const connectAndUseDB = (callback: Callback) => {
  const conn = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'erp'
  });

  conn.connect(err => {
    if (err) console.log(err.message);
    else console.log('Connected to DB');
  });

  callback(conn);
};

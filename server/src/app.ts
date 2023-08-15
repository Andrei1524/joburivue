import express, { Request, Response } from 'express';
const app = express();
import path from 'path';

import cors from 'cors';
import morgan from 'morgan';

import api from './routes/api';

app.use(cors({ origin: '*' }));

if (process.env.NODE_ENV === 'production') {
  // TODO: uncomment this
  // app.use(morgan("combined"));
}

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === '/api/v1/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// server public nuxt code
// app.use(express.static(path.join(__dirname, '..', 'dist')));

// serve public uploads folder
app.use('/uploads', express.static('uploads'));

app.use('/api/v1', api);

// app.get('/*', (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
// });

export = app;

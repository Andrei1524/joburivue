import { Request, Response } from 'express';

import express from 'express';

import authRouter from './auth.routes';
import jobRouter from './job.routes';
import tagRouter from './tag.routes';
import checkoutRouter from './checkout.routes';
import companyRouter from './company.routes';

const api = express.Router();

api.use('/auth', authRouter);
api.use('/jobs', jobRouter);
api.use('/tags', tagRouter);
api.use('/webhook', checkoutRouter);
api.use('/company', companyRouter);

api.get('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'not found' });
});

export = api;

import { NextFunction, Request, Response } from 'express';
import Company from '../model/company.model';
import { authenticateJWT } from './authenticateJWT';
import mongoose from 'mongoose';

const companyBelongsToCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params || req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.sendStatus(401);
  }

  await authenticateJWT(req, res, async () => {
    const foundCompany = await Company.findOne({ _id: id }).lean();

    if (
      foundCompany &&
      foundCompany.createdBy.toString() === req.user._id.toString()
    ) {
      next();
    } else {
      return res.sendStatus(401);
    }
  });
};

export = companyBelongsToCurrentUser;

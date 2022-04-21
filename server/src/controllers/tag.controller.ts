import { NextFunction, Request, Response } from "express";
import * as TagService from "../services/tag.service";

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;

    const tag = await TagService.create(payload);

    return res.status(200).json(tag);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 400, message: error.message });
    } else {
      return res.status(400).json({ status: 400, message: error });
    }
  }
}

export { create };

import { NextFunction, Request, Response } from "express";
import * as TagService from "../services/tag.service";
import Tag from "../model/tag.model";

// TODO: escape tag payload
async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;

    const foundTagByName = await Tag.findOne({ name: payload.name }).lean();

    if (foundTagByName) {
      return res
        .status(400)
        .json({ status: 400, message: "Tag already exists" });
    }

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

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;

    const tags = await TagService.getAll(payload);

    return res.status(200).json(tags);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 400, message: error.message });
    } else {
      return res.status(400).json({ status: 400, message: error });
    }
  }
}

export { create, getAll };

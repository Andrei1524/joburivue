import Tag from "../model/tag.model";
import { TagInterface } from "../ts/interfaces/tag.interfaces";

async function create(payload: TagInterface) {
  try {
    const newTag = {
      name: payload.name,
    };

    return new Tag({ ...newTag }).save();
  } catch (error) {
    throw (error as Error).message;
  }
}

export { create };

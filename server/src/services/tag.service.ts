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

async function getAll(searchString: any) {
  try {
    let tags = null;
    if (searchString) {
      tags = Tag.find(
        {
          name: {
            $regex: searchString.replace(/[\\$'"]/g, "\\$&"),
            $options: "i",
          },
        },
        {}
      )
        .lean()
        .exec();
    } else {
      tags = Tag.find({}).lean().exec();
    }

    return tags;
  } catch (error) {
    throw (error as Error).message;
  }
}

export { create, getAll };

import { Schema, model } from "mongoose";
import { UserInterface } from "../ts/interfaces/user.interfaces";
// Schema.Types.ObjectId
//Types.ObjectId

const UserSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: false,
  },
});

const User = model<UserInterface>("User", UserSchema);
export = User;

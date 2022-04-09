import { Schema, model } from "mongoose";
import { RegisterInterface } from "../ts/interfaces/user.interfaces";
// Schema.Types.ObjectId
//Types.ObjectId

const UserSchema = new Schema<RegisterInterface>({
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

const User = model<RegisterInterface>("User", UserSchema);
export = User;

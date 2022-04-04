import { Schema, model } from "mongoose";

// Schema.Types.ObjectId
//Types.ObjectId

interface User {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<User>({
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
});

const User = model<User>("User", UserSchema);
export { User };

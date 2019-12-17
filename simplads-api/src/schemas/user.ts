import { Document, model, Schema } from "mongoose";

export type UserDocument = Document & {
  email: String;
  firstName: String;
  lastName: String;
  password: String;
  phone: String;
  userStatus: Number;
  username: String;
};

export const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  phone: String,
  userStatus: Number,
  username: String
});

export const UserModel = model<UserDocument>("User", UserSchema);

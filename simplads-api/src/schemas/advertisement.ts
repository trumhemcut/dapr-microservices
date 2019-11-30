import { Document, model, Schema } from "mongoose";

export type AdvertisementDocument = Document & {
  title: String;
  category: String;
  price: Number;
  image: String;
  status: String;
  postedBy: String;
  postedDate: Date;
};

export const AdvertisementSchema = new Schema({
  title: String,
  category: String,
  price: Number,
  image: String,
  status: String,
  postedBy: String,
  postedDate: Date
});

export const AdvertisementModel = model<AdvertisementDocument>(
  "Advertisement",
  AdvertisementSchema
);

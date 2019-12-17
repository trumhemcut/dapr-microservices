import { Document, model, Schema } from "mongoose";
import Order from "../model/order";

export type OrderDocument = Document & {
  id: Number;
  userId: Schema.Types.ObjectId;
  quantity: Number;
  shipDate: Date;
  status: String;
  complete: Boolean;
};

export const OrderSchema: Schema = new Schema({
  complete: Boolean,
  quantity: Number,
  shipDate: Date,
  status: { type: String, enum: ["APPROVED", "DELIVERED", "PLACED"] },
  userId: { type: Schema.Types.ObjectId, ref: "User" }
});

export const OrderModel = model<OrderDocument>("Order", OrderSchema);

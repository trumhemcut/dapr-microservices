import { Document, model, Schema } from 'mongoose'

export type AdvertisementDocument = Document & {
    id: Number,
    title: String,
    category: String,
    price: Number,
    image: String,
    status: String,
    postedBy: String,
    postedDate: Date,
}

export const AdvertisementSchema = new Schema({
    id: Number,
    title: String,
    category: String,
    price: Number,
    image: String,
    status: String,
    postedBy: String,
    postedDate: Date,
})

export const AdvertisementModel = model<AdvertisementDocument>('Advertisement', AdvertisementSchema)
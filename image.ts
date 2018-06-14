import * as mongoose from 'mongoose';

export interface IImageModel extends mongoose.Document{
    filename: string;
    originalName: string;
    desc: string;
    created: Date
}

export var imageSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    desc: String,
    created: { type: Date, default: Date.now }
});

export const Image = mongoose.model<IImageModel>('Image', imageSchema);
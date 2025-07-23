import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUserInfo {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    image?: string;
}

export interface IEvent extends Document {
    gameName: string;
    description: string;
    peopleNeeded: number;
    state: string;
    city: string;
    address: string;
    addressLink?: string;
    date: string;
    time: string;
    sport: number;
    types: string[];
    coverPhoto?: string;
    privacy: 'public' | 'private';
    eventPassword?: string;
    createdBy: mongoose.Types.ObjectId | IUserInfo;
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema: Schema<IEvent> = new Schema({
    gameName: { type: String, required: true },
    description: { type: String, required: true },
    peopleNeeded: { type: Number, required: true, min: 1 },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    addressLink: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    sport: { type: Number, required: true },
    types: [{ type: String, required: true }],
    coverPhoto: { type: String },
    privacy: { type: String, enum: ['public', 'private'], default: 'public' },
    eventPassword: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

// No need for a virtual, just always populate createdBy in the API routes

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;

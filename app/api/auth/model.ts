import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    image?: string;
    username?: string;
    phone?: string;
    bio?: string;
    website?: string;
    twitter?: string;
    instagram?: string;
}

const UserSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    username: { type: String },
    phone: { type: String },
    bio: { type: String },
    website: { type: String },
    twitter: { type: String },
    instagram: { type: String },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
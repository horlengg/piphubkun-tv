import { Schema, model } from 'mongoose';
import { Role } from '@/types';

export const UserSchema = new Schema({
    googleId: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    name : {
        type: String,
        required: true,
    },
    profileUrl : {
        type: String,
        required: true,
    },
    role : {
        type : String,
        required: true,
    },
    registerAt : {
        type: Date,
        default: Date.now,
    },
    isDeleted : {
        type: Boolean,
        default: false,
    },
    lastLoginAt : {
        type: Date,
        required: true,
    },
    isLocked : {
        type: Boolean,
        default : false,
    }
});

export const User = model('User', UserSchema);

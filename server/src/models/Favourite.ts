import { Schema, model } from 'mongoose';
import {UserSchema} from "./User"

export const FavouriteSchema = new Schema({
    user : {
        type: UserSchema,
        required: true,
    },
    drama : {
        type: UserSchema,
        required: true,
    },
    isDeleted : {
        type: Boolean,
        default: false,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

export const FavouriteModel = model('Favourite', FavouriteSchema);

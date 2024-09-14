import { Schema, model } from 'mongoose';
import {UserSchema} from "./User"

export const RegionSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    isDeleted : {
        type: Boolean,
        default: false,
    },
    createdBy : {
        type : UserSchema,
        required: false,
        default : null
    },
    updatedBy : {
        type : UserSchema,
        required: false,
        default : null
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
});

export const RegionModel = model('Region', RegionSchema);

import { Schema, model } from 'mongoose';
import {UserSchema} from "./User"
import {RegionSchema} from "./Region"
import {CategorySchema} from "./Category"

export const DramaSchema = new Schema({
    thumbnailUrl: {
        type: String,
        required: true,
    },
    title : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    status : {
        type: String,
        required: true,
    },
    isDeleted : {
        type : Boolean,
        default : false,
    },
    category : {
        type : CategorySchema,
        required: true
    },
    region : {
        type : RegionSchema,
        required: true
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

export const Drama = model('Drama', DramaSchema);

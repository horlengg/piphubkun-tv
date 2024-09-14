import { Schema, model } from 'mongoose';
import { DramaSchema } from './Drama';
import { UserSchema } from './User';

export const EpisodeSchema = new Schema({
    drama : {
        type: DramaSchema,
        required: true,
    },
    epsNo : {
        type: Number,
        required: true
    },
    videoUrl : {
        type: String,
        required: true,
    },
    videoThumbnailUrl : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    isDeleted : {
        type: Boolean,
        default : false,
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

export const EpisodeModel = model('Episode', EpisodeSchema);

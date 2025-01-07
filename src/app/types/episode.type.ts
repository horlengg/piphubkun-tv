import { BaseEntityType } from "./base.type";

export interface EpisodeType extends BaseEntityType{
    drama : string;
    episodeNo : string;
    thumbnailFileId : string;
    videoUrl : string;
    isDeleted : string;
    releasedDate : string
    title : string
}
import { CategoryType, RegionType } from "."
import { BaseEntityType } from "./base.type"
import { EpisodeType } from "./episode.type"

export interface DramaType extends BaseEntityType {
    title : string
    code : string
    thumbnailUrl : string
    description : string
    category : CategoryType
    region : RegionType
    status : string
    totalEpisode : number,
    categoryId : string,
    regionId : string
}

export interface DramaEpisodeType {
    drama : DramaType,
    episodes : EpisodeType[]
}
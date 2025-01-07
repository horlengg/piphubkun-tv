import {  BaseEntityType } from "./base.type"

export type VideoCardView = {
    link: string,
    title: string,
    image: string,
}

export type DramaEpsCardEps = {
    title: string,
    thumbnail: string,
    description: string,
    eps: string,
    releasedDate : string
}

export enum KeyboardCode {
    ARROW_RIGHT = 39,
    ARROW_DOWN = 40,
    ARROW_LEFT = 37,
    ARROW_UP = 38,
    SPACE = 32
}

export type OptionItem = {
    label : string,
    excecute : () => void
}

export interface RegionType extends BaseEntityType {
    title : string
}
export interface CategoryType extends BaseEntityType {
    title : string
}

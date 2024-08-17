import {config} from "dotenv"

config();

export const PORT = process.env.PORT || 3000;
export const VIDEO_RESULT_PATH = process.env.VIDEO_RESULT_PATH ?? '';
export const VIDEO_RESOURCE_PATH = process.env.VIDEO_RESOURCE_PATH ?? '';
export const CLOUD_DIRECTORY_NAME = process.env.CLOUD_DIRECTORY_NAME ?? '';
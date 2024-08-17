export enum VideoSize {
    _144P = "256x144",
    _240P = "426x240",
    _360P = "640x360",
    _480P = "854x480",
    _720P = "1280x720",
    _1080P = "1920x1080",
    _1440P = "2560x1440",
    _2160P = "3840x2160",
    _4320P = "7680x4320"
}
  
export interface VideoCompressResource {
    videoPath: string;
    resultPath: string;
    resolution: string;
}
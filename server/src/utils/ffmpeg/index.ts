import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import { VideoCompressResource, VideoSize } from "@/types";
import { VIDEO_RESOURCE_PATH, VIDEO_RESULT_PATH } from '@/app.config';
import path from 'path';

export class Video {
    static getVideoResolutions(file: Express.Multer.File) {
        ffmpeg.ffprobe(file.path, (err, metadata) => {
            if (err) {
                console.error('Error retrieving metadata:', err.message);
                return;
            }

            const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
            if (!videoStream) {
                console.error('No video stream found');
                return;
            }

            const width = videoStream.width;
            const height = videoStream.height;

            console.log(`Original video resolution: ${width}x${height}`);
        });
    }

    static startCompress({ videoPath, resultPath, resolution }: VideoCompressResource) {
        return new Promise((resolve, reject) => {
            ffmpeg(videoPath)
                .output(resultPath)
                .videoCodec('libx264')
                .audioCodec('aac')
                .audioBitrate('128k')
                .audioChannels(2)     
                .audioFrequency(44100)
                .size(resolution)
                .on('end', () => {
                    resolve(true);
                })
                .on('error', (err) => {
                    console.error('Error:', err.message);
                    reject(err);
                })
                .run();
        });
    }

    static startCompressAllSize(file: Express.Multer.File):Promise<string[]> {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(file.path, async(err, metadata) => {
                try {
                    if (err) throw new Error(err.messsage);
                    const listPathVideos:string[] =[];
                    const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
                    if (!videoStream) return console.error('No video stream found');
                    const width = videoStream.width!;
                    const height = videoStream.height!;
                    const resolutions = Object.values(VideoSize).filter(re => {
                        const s = re.split("x")
                        const w = parseInt(s[0]);
                        const h = parseInt(s[1]);
                        if (w > width || h > height) return false;
                        return true
                    });
                    for (const resolution of resolutions) {
                        const re = Object.entries(VideoSize).find(e => e[1] === resolution)?.[0]!
                        const resultPath = path.join(VIDEO_RESULT_PATH, this.formatFileName(file.filename!, re))
                        listPathVideos.push(resultPath);
                        await this.startCompress({ resolution, resultPath, videoPath: file.path })
                    }
                    resolve(listPathVideos);
                }
                catch(error){
                    reject(error);
                }
            })

        });
    }
    static formatFileName(fileName: string, resolution: string) {
        const t = fileName.split(".");
        const temp = '.' + t.pop();
        t.push(resolution);
        t.push(temp);
        return t.join("");
    }
    static removeAllVideos():Promise<void>{
        return new Promise((resolve, reject) => {
            const listDirectories = [VIDEO_RESOURCE_PATH,VIDEO_RESULT_PATH]
            listDirectories.forEach(directory => {
                fs.readdir(directory,(err, files) =>{
                    files.forEach(f => {
                        fs.unlink(path.join(directory, f), (err) => {
                            if (err) reject(err);
                            resolve()
                        })
                    })
                })
            })
        })
    }
}

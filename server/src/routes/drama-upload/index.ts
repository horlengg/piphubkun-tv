import express from "express";
import multer from "multer";
import path from "path";
import {VIDEO_RESOURCE_PATH} from "@/app.config"
import { Cloud } from "@/utils/cloud";
import { Video } from "@/utils/ffmpeg";


const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, VIDEO_RESOURCE_PATH);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
});


const upload = multer({ storage: storage });


router.post("/upload",upload.single("dramaVideo"),async(request,response)=>{
    if (!request.file) {
        return response.status(400).send({
            message : "File is required"
        });
    }
    
    try {
      const listVideoPath = await Video.startCompressAllSize(request.file!);
      const publishIds:string[] = [];
      console.log("total videos: " + listVideoPath.length);
      for (const p of listVideoPath) {
        console.log("Publishing file: " + p);
        const publicId = p.split("\\").pop()!
        const res = await Cloud.upload(p,publicId);
        publishIds.push(res.public_id);
      }
      await Video.removeAllVideos();
      response.status(200).json({
        message : "Video uploaded successfully",
        data : {
          publishIds
        }
      })
    }catch(error){
      response.status(500).json({
        message : "Error while uploading video",
        error ,
      })
    }
})

router.post("/remove", async(request,response)=>{
  const publicId = request.body.public_id as string;
  if(!publicId){
    return response.status(400).json({
      messsage : "Public id is required"
    })
  }
  try {
    await Cloud.remove(publicId)
    response.status(200).json({
      message : "Video removed successfully",
      publicId
    })
  }catch(error){
    response.status(500).json({
      message : "Error while remove video",
      error ,
    })
  }
})


export default router
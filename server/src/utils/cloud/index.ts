import { CLOUD_DIRECTORY_NAME } from '@/app.config';
import { 
    v2 as cloudinary, 
    UploadApiErrorResponse, 
    UploadApiResponse 
} 
from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'decme1qrv', 
    api_key: '935526224767259', 
    api_secret: '3D9ZAawDUiv8vAWm1vZdidrszOs' // Click 'View Credentials' below to copy your API secret
});

const UPLOADER = cloudinary.uploader

export class Cloud {
    static upload(file:string,public_id:string):Promise<UploadApiResponse | UploadApiErrorResponse>{
        return new Promise((resolve, reject) => {
            UPLOADER.upload(file,{
                folder : CLOUD_DIRECTORY_NAME,
                resource_type : 'video',
                public_id
            },(error,result)=>{
                if(error) reject(error)
                else resolve(result!)
            })
        })
    }
    static remove(publicId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            UPLOADER.destroy(publicId, {resource_type : 'video'}, (error, result) => {
                if (error) reject(error);
                else resolve(result!);
            });
        });
    }
} 
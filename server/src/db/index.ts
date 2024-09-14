import { DB_URI } from '@/app.config';
import mongoose from 'mongoose';

export const useMongoDB = ()=>{
    const connect = ()=>{
        mongoose.connect(DB_URI)
                .then(() =>{
                    console.log('db connected!.')
                });
    }
    return {
        connect
    }
}
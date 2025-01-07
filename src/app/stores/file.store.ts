import { defineStore } from "pinia";
import { ref } from "vue";
import { ApiCacheType } from "../types/api-cache.type";
import { API_BASE_URI } from "../app.config";
import { delay } from "@/utils/delay";
import { FileService } from "../services/api/file.service";

export const useFileStore = defineStore("file.store",()=>{

    const fileCaches = ref<Array<ApiCacheType<string>>>([])

    const addCacheFile = (file:ApiCacheType<string>)=>{
        const fileCacheIndex = fileCaches.value.findIndex(e => file.id == e.id);
        if(fileCacheIndex == -1) fileCaches.value.push(file);
        else fileCaches.value[fileCacheIndex] = file;
    }
    const getFileCacheById = (fileId:string)=>{
        return fileCaches.value.find(e => e.id == fileId)?.data;
    }
    const cacheFileInBackground = async(fileId:string)=>{
        await delay(3000)
        const fileUrl = await FileService.getBlobFile(fileId)
        addCacheFile({
            id : fileId,
            data : fileUrl,
        })
    }
    const getUrlFilePreview = (fileId:string,options?:{video?:boolean})=>{
        if(options?.video) return `${API_BASE_URI}/files/${fileId}`
        const fileCache = getFileCacheById(fileId)
        console.log({fileCache});
        if(fileCache) return fileCache;
        cacheFileInBackground(fileId)
        return `${API_BASE_URI}/files/${fileId}`
    }

    return {
        addCacheFile,
        getFileCacheById,
        getUrlFilePreview
    }
})
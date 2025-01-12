import { DramaEpisodeType, DramaType } from "@/app/types/drama.type";
import http from "../request"
import { HttpStatusCode } from "axios";

export class DramaService {
    static async retrieveDrama(params?:string){
        try {
            const response = await http.get<DramaType[]>(`/drama${ params || ''}`)
            if(response.status === HttpStatusCode.Ok){
                return response.data
            }
        } catch (error) {
            console.log(error);
            throw new Error("Couldn't retrieve drama!.")
        }
    }
    static async retrieveDramaEpisodeById(code: string){
        try {
            const response = await http.post<DramaEpisodeType,any>(`/drama/list-episodes`,{ code })
            if(response.status === HttpStatusCode.Ok) return response.data
        } catch (error) {
            console.log(error);
            throw new Error("Couldn't retrieve drama!.")
        }
    }
}
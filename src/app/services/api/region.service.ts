import {RegionType } from "@/app/types";
import http from "../request"
import { HttpStatusCode } from "axios";

export class RegionService {
    static async retrieveRegions(params?:string){
        try {
            const response = await http.get<RegionType[]>(`/region${params ? '?' + params : ''}`)
            if(response.status === HttpStatusCode.Ok){
                return response.data
            }
        } catch (error) {
            console.log(error);
            throw new Error("Couldn't retrieve drama!.")
        }
    }
}
import { CategoryType } from "@/app/types";
import http from "../request"
import { HttpStatusCode } from "axios";

export class CategoryService {
    static async retrieveCategory(params?:string){
        try {
            const response = await http.get<CategoryType[]>(`/category${params ? '?' + params : ''}`)
            if(response.status === HttpStatusCode.Ok){
                return response.data
            }
        } catch (error) {
            console.log(error);
            throw new Error("Couldn't retrieve drama!.")
        }
    }
}
import http from "../request";

export class FileService {
    static async getBlobFile(fileId: string): Promise<string>{
        try {
            const response =  await http.request<Blob>({
                url : `/files/${fileId}`,
                method : "GET",
                responseType : "blob"
            })
            const url = URL.createObjectURL(response.data)
            return url
        } catch (error:any) {
            throw new Error(error.message || "an error occurred while downloading file");
        }
    }
}
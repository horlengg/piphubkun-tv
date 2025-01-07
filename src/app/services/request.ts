import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URI } from "../app.config";
import { ApiResponse } from "../types/http.type";

interface ApiRequestConfig<T = any> extends AxiosRequestConfig<T> {
    showLoading? : boolean;
}

class Http {
    private instance;
    constructor() {
        // Create an Axios instance with default config
        this.instance = axios.create({
            baseURL: API_BASE_URI,
        });
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // Add custom headers, authentication tokens, or modify config
                return config;
            },
            (error: AxiosError) => {
                // Handle request error
                console.error("Request Error:", error);
                return Promise.reject(error);
            }
        );

        // Attach response interceptor
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                // Handle successful response
                console.log("Response:", response);
                return response;
            },
            (error: AxiosError) => {
                // Handle response error
                console.error("Response Error:", error);
                return Promise.reject(error);
            }
        );
    }
    public get<T = any>(url: string, params?: any) {
        return this.instance.request<ApiResponse<T>>({
            url,
            method: "GET",
            params
        })
    }
    public post<T = any, P = any>(url: string, data?: P) {
        return this.instance.request<T, P>({ url, method: "POST", data })
    }
    public patch<T = any, P = any>(url: string, data?: P) {
        return this.instance.request<T, P>({ url, method: "PATCH", data })
    }
    public delete<T = any>(url: string, params?: object) {
        return this.instance.request<T>({ url, method: "PATCH", params })
    }
    public request<T = any>(config: ApiRequestConfig<any>) {
        return this.instance.request<T>(config)
        // if (!config.showLoading) return this.instance.request<T>(config)
        // return new Promise(async(resolve, reject) => {
        //     const globalStore = useGlobalStore()
        //     try {
        //         globalStore.showGlobalLoading = true
        //         const response = await this.instance.request<T>(config)
        //         resolve(response)
        //         // Show loading spinner
        //     } catch (err) {
        //         reject(err)
        //     }finally{
        //         globalStore.showGlobalLoading = false
        //     }
        // })
    }
}

const http = new Http()

export default http
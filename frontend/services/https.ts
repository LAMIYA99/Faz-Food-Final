import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

class ApiServices {
    axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 5000,
        });

    }

    async getData(url: string, config?: AxiosRequestConfig): Promise<any> {
        const res = await this.axiosInstance.get(url, config);
        return res.data;
    }

    async PostData(url: string, payload?: any, config?: AxiosRequestConfig): Promise<any> {
        const res = await this.axiosInstance.post(url, payload, config);
        return res.data;
    }

    async PatchData(url: string, payload?: any, config?: AxiosRequestConfig): Promise<any> {
        const res = await this.axiosInstance.patch(url, payload, config);
        return res.data;
    }

    async DeleteData(url: string, config?: AxiosRequestConfig): Promise<any> {
        const res = await this.axiosInstance.delete(url, config);
        return res.data;
    }
}

export default ApiServices;
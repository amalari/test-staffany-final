import axios, { AxiosInstance } from "axios"

export class AxiosAPI {
    protected axios: AxiosInstance;
    constructor(baseURL: string){
        this.axios = axios.create({
            baseURL,
        })
    }
    protected getErrorMessage(err: any){
        if (err.response) {
            return err.response.data.message;
        }
        return err.message;
    }
}
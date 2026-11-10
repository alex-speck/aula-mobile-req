import axios from "axios";

const URL_API = 'http://10.10.87.33:3000'

export const apiReceitas = axios.create({
    baseURL: URL_API
})

apiReceitas.interceptors.request.use((request) => {
    console.log("Interceptando requisição");
    console.log("URL: " + request.url)
    console.log("Corpo: " + request.data)

    return request;
})

apiReceitas.interceptors.response.use((response) => {
    console.log(response)
    return response;
})
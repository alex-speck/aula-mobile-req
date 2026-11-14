import axios from "axios";

const URL_API = 'http://10.10.84.129:3000'

export const apiReceitas = axios.create({
    baseURL: URL_API
})

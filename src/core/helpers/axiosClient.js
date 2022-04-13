import axios from "axios";
import TService from "./t_service";
export default class AxiosClient extends TService {
    constructor() {
        axios.interceptors.request.use((request) => {
            request.headers.contentType = this.getJsonHeader()
        })
    }
    async axiosGet(url, header) {
        axios.get(url, { header: header }).then((response) => { return response }).catch((error) => { throw error });
    }
    async axiosPost(url, data, header) {
        return axios.post(url, data, { header: header }).then((response) => { return response }).catch((error) => { throw error });
    }
    async axiosPut(url, data, header) {
        return axios.put(url, data, { header: header }).then((response) => { return response }).catch((error) => { throw error });
    }
    async axiosDelete(url, header) {
        return axios.delete(url, { header: header }).then((response) => { return response }).catch((error) => { throw error });
    }
    async axiosPatch(url, data, header) {
        return axios.patch(url, data, { header: header }).then((response) => { return response }).catch((error) => { throw error });
    }
};
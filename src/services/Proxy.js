import axios from "axios"

export default class APIService {

    constructor(baseUrl = "") {
        this.baseUrl = baseUrl;
    }

    request(options) {
        //Add the base url to the url
        options.url = this.baseUrl + options.url;
        let defaults = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        return axios.request({...defaults, ...options}).then(res => res.data);
    }

    get(url) {
        return this.request({
            url: url,
            method: "GET"
        });
    }

    post(url, data) {
        return this.request({
            url: url,
            data: data,
            method: "POST"
        })
    }

    put(url, data) {
        return this.request({
            url: url,
            data: data,
            method: "PUT"
        });
    }

    delete(url) {
        return this.request({
            url: url,
            method: "DELETE"
        });
    }
}

import axios from "axios";

/**
 * 请求封装
 * @param url {String}
 * @param method {String}
 * @param data {{}}
 */
export default function request(url, method = "GET", data = {}) {
    return axios.request({
        url: url,
        method: method,
        data: data
    })
}
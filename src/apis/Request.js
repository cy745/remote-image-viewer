import axios from "axios";
import {baseUrl} from "../main";

/**
 * 请求封装
 * @param url {String}
 * @param method {String}
 * @param data {{}}
 */
export default function request(url, method = "GET", data = {}) {
    return axios.request({
        url: baseUrl.value + url,
        method: method,
        data: data
    })
}
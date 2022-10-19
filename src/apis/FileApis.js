import request from "./Request.js";

export function getList() {
    return request("/api")
}
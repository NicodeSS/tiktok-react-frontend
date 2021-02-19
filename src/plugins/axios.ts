import axios from "axios"
import React from "react"

let http = axios.create({
    baseURL: process.env.NODE_ENV === "production" ?
        "http://tiktok.nicode.top:20005/api/" :
        "http://tiktok.nicode.top:20005/api/",
    withCredentials: false,
    timeout: 8000,
})

http.interceptors.request.use(
    config => {
        if (config.method === "POST") {
            config.headers["Content-Type"] = "application/json;charset=utf-8";
        }
        return config;
    },
    error => {
        alert("错误的传参");
        return Promise.reject(error);
    }
);

let methods = {
    get: function(url, params):Promise<any> {
        return new Promise((resolve, reject) => {
            http({
                method: "GET",
                url: url,
                params: params
            })
                .then(function(res) {
                    !res.data.status ? resolve(res) : reject(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    },
    post: function(url, params):Promise<any> {
        return new Promise((resolve, reject) => {
            http({
                method: "POST",
                url: url,
                data: params
            })
                .then(function(res) {
                    !res.data.status ? resolve(res) : reject(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    },
    put: function(url, params):Promise<any> {
        return new Promise((resolve, reject) => {
            http({
                method: "PUT",
                url: url,
                data: params
            })
                .then(function(res) {
                    !res.data.status ? resolve(res) : reject(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    },
    delete: function(url, params):Promise<any> {
        return new Promise((resolve, reject) => {
            http({
                method: "DELETE",
                url: url,
                params: params
            })
                .then(function(res) {
                    !res.data.status ? resolve(res) : reject(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    },
    patch: function(url, params):Promise<any> {
        return new Promise((resolve, reject) => {
            http({
                method: "PATCH",
                url: url,
                data: params
            })
                .then(function(res) {
                    !res.data.status ? resolve(res) : reject(res);
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    }
};

export default methods;
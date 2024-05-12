import axios, { InternalAxiosRequestConfig } from "axios";
import { thread } from "./Thread";
import { store } from "@/Store";

export const baseURL = () => import.meta.env.DEV ? "http://localhost" : "https://cnp-server-production.up.railway.app";

const Api = () => {
    const instance = axios.create({
        headers: {
            "Content-Type": "application/json",
            "x-request-id": thread.uuid(),
            rc: "HANDHELD_TERMINAL ",
        },
        baseURL: baseURL(),
        timeout: 30000,
    });

    instance.interceptors.request.use(config, error);

    return instance;
}

async function config(config: InternalAxiosRequestConfig) {
    const token = store.getState().user?.token;
    if (token) {
        config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
}

function error(error: any) {
    return Promise.reject(error);
}


export default Api;
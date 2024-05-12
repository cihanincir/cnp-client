import { useEffect, useState } from "react";
import { IFetchMethod, IUseFetchProps } from "./types";
import Api from "@/Utils/Api";
import { thread } from "@/Utils/Thread";

const useFetch = <T>(props: IUseFetchProps<T>, effects: any[] = [], condition: boolean = false) => {

    const [data, setData] = useState<null | T>(null);
    const [resHeaders, setHeaders] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const [initialFetch, setInitialFetch] = useState(false);

    async function Action(customBody?: any) {
        let endpoint: string, method, body, headers, delay;

        if (typeof props === "string") {
            endpoint = props;
            method = IFetchMethod.Get;
            body = null;
            headers = {};
            delay = 0;
        } else {
            endpoint = props.endpoint;
            method = props.method;
            body = props.body;
            headers = props.headers;
            delay = typeof props.delay === "number" ? props.delay : 0;
        }

        if (typeof props !== "string" && typeof props?.condition !== "undefined" && props?.condition !== true) {
            console.log(props.condition);
            return;
        }

        if (customBody && typeof customBody === "object" && !Array.isArray(customBody)) {
            Object.keys(customBody).map(key => {
                endpoint = endpoint.replace(`{{${key}}}`, customBody[key]);
            });
        }

        if (customBody && !customBody?.nativeEvent && !customBody?.target && customBody?.type !== "click") body = customBody;

        if (!method) method = IFetchMethod.Get;

        setData(null);
        setLoading(true);
        setError(null);
        setHeaders({});

        await thread.sleep(delay);

        let resData: T;
        let resError: string;

        try {
            const { data: responseData, headers: responseHeaders } = await Api().request({
                method,
                url: endpoint,
                data: body,
                headers
            });

            setData(responseData);
            resData = responseData;

            // @ts-ignore
            resError = null;

            // @ts-ignore
            setHeaders(responseHeaders);
        } catch (error: any) {
            const err = error?.response?.data;
            let message = "";
            if (err?.message) {
                message = err.message;
            } else if (err?.error) {
                message = err?.error;
            } else {
                message = "Unknown error";
            }

            setError(message);
            resError = message;

            // @ts-ignore
            resData = null;
        }

        setLoading(false);
        if (typeof props !== "string" && props.onComplete && !resError) props.onComplete(resData);
        if (typeof props !== "string" && props.onError && resError) {
            props.onError(resError);
        }

        if (typeof props !== "string" && resError) {


        }
    }

    useEffect(() => {
        if (typeof props !== "string" && props?.effectsFetch === false && !initialFetch) {
            return setInitialFetch(true);
        }
        if (!condition) {
            Action();
            return () => { };
        }
        for (const effect of effects) {
            if (!effect) return;
        }
        Action();
    }, effects);

    useEffect(() => {
        if (typeof props !== "string" && props.loader) {

        }
    }, [loading]);

    return {
        data,
        loading,
        error,
        headers: resHeaders,
        refetch: Action
    }

}

export default useFetch;
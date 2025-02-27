import React from "react";

interface IUseService {
    api: string;
    method: "POST" | "PATCH" | "DELETE" | "GET" | "PUT";
    body?: unknown;
    headers?: Record<string, string>;
    params?: Record<string, string>;
}

type TData = {
    code: number;
    data: unknown;
};

const MAX_RETRIES = 3;

const useService = (shouldRetry?: boolean) => {
    const [data, setData] = React.useState<TData>();
    const [retries, setRetries] = React.useState(0);
    const [fnParams, setFnParams] = React.useState<IUseService>();

    const fetchData = async ({
        api,
        method,
        body = null,
        headers = {},
        params = {},
    }: IUseService) => {
        setFnParams({ api, method, body, headers, params });


        const token = sessionStorage.getItem("jwt");
        fetch(
            `http://localhost:3000/api/admin/${api}?${new URLSearchParams(
                params
            ).toString()}`,
            {
                method,
                headers: {
                    ...headers,
                    ...({Authorization: `Bearer ${token}`}),
                },
                //body: JSON.stringify(body),
                body: body as unknown as any
            }
        ).then((res) => {
            if (res.status === 401) {
                localStorage.removeItem("token");
            }

            return res;
        }).then(async (res) => {
            setData({
                code: res.status,
                data: res.status === 204 ? null : await res.json(),
            });
        }).catch(() => {
            setData({
                code: 500,
                data: {},
            });
        })
    };

    React.useEffect(() => {
        if (shouldRetry && retries < MAX_RETRIES && [400, 500].includes(data?.code || 0) && fnParams) {
            fetchData(fnParams);
            setRetries(retries + 1);
        } else {
            setRetries(0);
            setFnParams(undefined);
        }
    }, [data]);

    return { data, fetchData };
};

export default useService;

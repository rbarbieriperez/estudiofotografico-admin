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

const useService = () => {
    const [data, setData] = React.useState<TData>();

    const fetchData = async ({
        api,
        method,
        body,
        headers = {},
        params = {},
    }: IUseService) => {
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
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        ).then((res) => {
            if (res.status === 401) {
                localStorage.removeItem("token");
            }

            return res;
        }).then(async (res) => {
            setData({
                code: res.status,
                data: await res.json(),
            });
        }).catch(() => {
            setData({
                code: 500,
                data: {},
            });
        })
    };

    return { data, fetchData };
};

export default useService;

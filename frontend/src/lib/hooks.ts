"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useAppContext, useAppDispatch } from "@/context/ContextProvider";
import { destroyAuth, initiateAuth } from "@/context/actions";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const assetUrl = process.env.NEXT_PUBLIC_ASSET_URL;

export const asset = (path: string = "") => {
    if (path.startsWith("/assets/images/")) return path;
    return assetUrl + path;
};

const axiosInstance = axios.create({
    baseURL: apiUrl,
});

type StatusType = "error" | "success" | "warning";
type METHODS = "GET" | "PUT" | "POST" | "DELETE" | "PATCH";
type AxiosErrorMessageType = { response?: { data?: { message?: string } } };
type ErrType = {
    message: string;
    error: AxiosErrorMessageType;
    status?: StatusType;
} | null;
type FetcherReturnType = {
    status: StatusType;
    data?: unknown | object | null;
    error?: unknown | AxiosError;
    message?: string;
};

export function useAxiosFetcher(
    url: string,
    method?: METHODS,
    setDataState:
        | React.Dispatch<React.SetStateAction<unknown | object | null>>
        | (() => {}) = () => {}
) {
    const app = useAppContext();
    const accessToken = app.auth.accessToken;
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<object | null | unknown>(null);
    const [error, setError] = useState<ErrType>(null);

    const fetcher = async (
        config = { method: "GET" } as {
            method: METHODS;
            body?: FormData | object;
            headers?: object;
        },
        newUrl?: string
    ) => {
        setIsLoading(true);
        try {
            // Check if body is FormData
            const isFormData = config.body instanceof FormData;

            const newConfig = {
                ...config,
                headers: {
                    ...(isFormData
                        ? {}
                        : { "Content-Type": "application/json" }),
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            // console.log("Sending config:", newConfig);
            const response = await axiosInstance({
                method: config.method,
                url: newUrl || url,
                data: config.body,
                headers: newConfig.headers,
            });

            setData(response.data);
            setDataState(response.data);
            setIsLoading(false);
            return {
                status: "success",
                data: response.data,
            } as FetcherReturnType;
        } catch (error: ErrType | unknown) {
            const errorMessage =
                (error as AxiosErrorMessageType).response?.data?.message ||
                "An unknown error occurred";
            const err = {
                status: "error",
                message: errorMessage,
                error,
            } as ErrType;
            setError(err);
            return err as FetcherReturnType;
        }
    };

    useEffect(() => {
        if (url && method === "GET") {
            fetcher({ method: "GET" });
        }
    }, [url, method]);

    return { fetcher, isLoading, data, error };
}

export function useAuth() {
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const app = useAppContext();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (app.auth.accessToken && app.auth.user?.id) {
            setIsAuthenticated(true);
        }
    }, [app.auth]);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post(
                "/auth/login",
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = response.data;
            if (window !== undefined) {
                localStorage.setItem("adminToken", data.token);
                localStorage.setItem("adminUser", JSON.stringify(data.user));
            }
            toast.success("Login successful!");
            dispatch(
                initiateAuth({ accessToken: data?.token, user: data?.user })
            );

            setIsAuthenticated(true);
            setIsLoading(false);
            return data;
        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                "An error occurred during login";
            toast.error(message);

            setIsLoading(false);
            return { message };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        const logoutRequest = async () => {
            try {
                setIsLoading(true);
                const res = await axiosInstance.post(
                    "/auth/logout",
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                return res.data;
            } catch (error: any) {
                toast.error(
                    error.response?.data?.message ||
                        "An error occurred during logout"
                );

                setIsLoading(false);
                return undefined;
            }
        };

        const data = await logoutRequest();
        if (window !== undefined) {
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminUser");
        }
        dispatch(destroyAuth());
        setIsAuthenticated(false);

        toast.info("Logged out successfully.");
        return data;
    };

    return {
        isLoading,
        isAuthenticated,
        login,
        logout,
    };
}

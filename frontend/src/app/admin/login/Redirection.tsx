"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/hooks";

export default function Redirection({
    setIsLogin,
}: {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const redirect = searchParams.get("redirect");
            const token = localStorage.getItem("adminToken");
            if (isAuthenticated && token) {
                if (redirect) {
                    router.push(redirect);
                } else {
                    router.push("/admin/dashboard");
                }
            } else {
                setIsLogin(true);
            }
        }
    }, [isAuthenticated, searchParams, router, setIsLogin]);

    return null; // No UI for this component
}

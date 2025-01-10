"use client";
import { SiteSettingsType } from "@/constants/types";
import {
    initiateAuth,
    initiateSiteSettings,
    setWorks,
} from "@/context/actions";
import { useAppDispatch } from "@/context/ContextProvider";
import { useAxiosFetcher } from "@/lib/hooks";
import { HOME_PAGE_KEY } from "@/lib/utils";
import { useEffect } from "react";

export default function Initialization() {
    const dispatch = useAppDispatch();

    const { error: workError, data: works } = useAxiosFetcher("/work", "GET");
    const { error: homePageItemsError, data: homePageItems } = useAxiosFetcher(
        "/site-item/" + HOME_PAGE_KEY,
        "GET"
    );

    useEffect(function () {
        if (window !== undefined) {
            const getUser = localStorage.getItem("adminUser");
            const accessToken = localStorage.getItem("adminToken");

            if (getUser && accessToken) {
                const user = JSON.parse(getUser);
                dispatch(initiateAuth({ user, accessToken }));
            }
        }
    }, []);

    useEffect(
        function () {
            if (workError?.error && homePageItemsError?.error) {
                console.info("Something Went Wrong, [SERVER_ERR]");
                console.log({ workError, homePageItemsError });

                // Dispatch Demo works
                dispatch(
                    setWorks([
                        {
                            _id: "1",
                            title: "Romans & Partners",
                            image: "/assets/images/work-1.jpg",
                            tags: [
                                { label: "UI/UX Design" },
                                { label: "Property Portal" },
                            ],
                            isLatest: true,
                        },
                        {
                            _id: "2",
                            title: "Tech SuperPowers",
                            image: "/assets/images/work-2.jpg",
                            tags: [
                                { label: "UI/UX Design" },
                                { label: "Development" },
                            ],
                        },
                        {
                            _id: "3",
                            title: "Alveena Casa",
                            image: "/assets/images/work-3.jpg",
                            tags: [
                                { label: "UI/UX Design" },
                                { label: "E-Commerce" },
                            ],
                        },
                        {
                            _id: "4",
                            title: "Alveena Casa",
                            image: "/assets/images/work-4.jpg",
                            tags: [
                                { label: "UI/UX Design" },
                                { label: "E-Commerce" },
                            ],
                        },
                    ])
                );
                return () => {};
            }

            if (Array.isArray(works)) {
                dispatch(setWorks(works));
            }

            if (
                homePageItems &&
                typeof homePageItems === "object" &&
                "value" in homePageItems
            ) {
                dispatch(
                    initiateSiteSettings(
                        homePageItems.value as SiteSettingsType
                    )
                );
            }
        },
        [works, homePageItems]
    );
    return null;
}

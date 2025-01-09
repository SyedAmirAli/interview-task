import LocomotiveScroll from "locomotive-scroll";
import React from "react";

export interface State {
    mainScrollContainer: {
        ref: React.RefObject<HTMLElement> | null;
        scroll: LocomotiveScroll | null;
        num?: number | undefined;
    };
    preloaderState: boolean;
    auth: {
        user: {
            id?: string;
            email?: string;
            name?: string;
            photo?: string;
            status?: boolean;
        } | null;
        accessToken: string | null;
    };
    siteSettings: SiteSettingsTypes;
    works: Work[] | [];
}

export interface ActionTypes {
    type: string;
    payload:
        | State["siteSettings"]
        | State["mainScrollContainer"]
        | undefined
        | boolean
        | State["auth"]
        | State["works"]
        | null;
}

export interface ContextTypes {
    state: State;
    dispatch: React.Dispatch<ActionTypes>;
}

export interface Work {
    id?: string;
    _id: string;
    title: string;
    image: string;
    tags: { label: string }[];
    status?: boolean;
    isLatest?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface EditWorkModalIsIsOpen {
    status: boolean;
    data?: Work;
}

export interface SiteSettingsType {
    heroSection: {
        title: string;
        works: { title: string; count: number }[];
        summery: string;
    };
    stickyMenu: {
        title: string;
        summery?: string;
        menus: { title: string; link: string | "#"; count?: number }[];
    };
    footer: {
        title: string;
        copyrightText: string;
        copyrightMenus: { title: string; link: string | "#" }[];
        phone: string;
        email: string;
        address: string;
        cardTitle: string;
        cardSummery: string;
        cardBtnTitle: string;
        cardBtnTarget: "_blank" | "_self" | "_parent" | "_top";
        cardBtnUrl: string | "#";
    };
    socials: {
        title: string;
        platforms: {
            icon: string;
            title: string;
            link: string | "#";
            target: "_blank" | "_self" | "_parent" | "_top";
        }[];
    };
}

import { z } from "zod";

export const siteSettingsSchema = z.object({
    heroSection: z.object({
        title: z.string().min(1, "Title is required"),
        works: z.array(
            z.object({
                title: z.string().min(1, "Work title is required"),
                count: z.number().min(0, "Count must be non-negative"),
            })
        ),
        summery: z.string().min(1, "Summary is required"),
    }),
    stickyMenu: z.object({
        title: z.string().min(1, "Title is required"),
        summery: z.string().optional(),
        menus: z.array(
            z.object({
                title: z.string().min(1, "Menu title is required"),
                link: z.string().min(1, "Link is required"),
                count: z.number().optional(),
            })
        ),
    }),
    footer: z.object({
        title: z.string().min(1, "Title is required"),
        copyrightText: z.string().min(1, "Copyright text is required"),
        copyrightMenus: z.array(
            z.object({
                title: z.string().min(1, "Menu title is required"),
                link: z.string().min(1, "Link is required"),
            })
        ),
        phone: z.string().min(1, "Phone is required"),
        email: z.string().email("Invalid email address"),
        address: z.string().min(1, "Address is required"),
        cardTitle: z.string().min(1, "Card title is required"),
        cardSummery: z.string().min(1, "Card summary is required"),
        cardBtnTitle: z.string().min(1, "Button title is required"),
        cardBtnTarget: z.enum(["_blank", "_self", "_parent", "_top"]),
        cardBtnUrl: z.string().min(1, "Button URL is required"),
    }),
    socials: z.object({
        title: z.string().min(1, "Title is required"),
        platforms: z.array(
            z.object({
                title: z.string().min(1, "Platform title is required"),
                link: z.string().min(1, "Link is required"),
                target: z.enum(["_blank", "_self", "_parent", "_top"]),
                icon: z.string().min(1, "Icon is required"),
            })
        ),
    }),
});

export type SiteSettingsTypes = z.infer<typeof siteSettingsSchema>;

export interface HomePageItemsType {
    ket: string;
    value: SiteSettingsType | SiteSettingsTypes;
}

export interface HeroSectionCountType {
    id?: number;
    count: number;
    title: string;
}

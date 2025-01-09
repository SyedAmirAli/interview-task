import { ActionTypes, State } from "@/constants/types";
import {
    CLOSE_PRELOADER,
    DESTROY_AUTH,
    INITIATE_AUTH,
    INITIATE_SITE_SETTINGS,
    OPEN_PRELOADER,
    SET_MAIN_SCROLL_CONTAINER,
    SET_WORKS,
    TOGGLE_PRELOADER,
} from "./actions";

export const initialState: State = {
    works: [],
    mainScrollContainer: {
        ref: null,
        scroll: null,
        num: 10,
    },
    preloaderState: true,
    auth: {
        accessToken: null,
        user: null,
    },
    siteSettings: {
        heroSection: {
            title: "Crafting Digital Experiences",
            works: [
                { title: "Satisfied Customer", count: 500 },
                { title: "Years on the Market", count: 20 },
                { title: "Website Awards", count: 15 },
            ],
            summery:
                "We build engaging websites, brands & innovative e-commerce solutions.",
        },
        stickyMenu: {
            title: "Navigation",
            summery: "Navigate our site easily",
            menus: [
                { title: "Case Studies", link: "#", count: 13 },
                { title: "Our Agency", link: "#", count: 0 },
                { title: "Contact Us", link: "#", count: 0 },
                { title: "News", link: "#", count: 0 },
            ],
        },
        footer: {
            title: "We love crafting unforgettable digital experiences, brands and websites with people like you.",
            copyrightText: "© 2025 Artistweb Ltd - All rights reserved.",
            copyrightMenus: [
                { title: "Privacy Policy", link: "#" },
                { title: "Terms & Conditions", link: "#" },
            ],
            phone: "+44 207 112 82 85",
            email: "contact@artistsweb.com",
            address:
                "Artistsweb, 18 Soho Square, London, W1D 3QL, United Kingdom",
            cardTitle: "Let's get started",
            cardSummery: "We'd love to hear about your project.",
            cardBtnTitle: "Case Studies",
            cardBtnTarget: "_self",
            cardBtnUrl: "#subscribe",
        },
        socials: {
            title: "Follow Us",
            platforms: [
                {
                    title: "Instagram",
                    link: "#",
                    target: "_blank",
                    icon: "instagram",
                },
                {
                    title: "Facebook",
                    link: "#",
                    target: "_blank",
                    icon: "facebook",
                },
                {
                    title: "Twitter",
                    link: "#",
                    target: "_blank",
                    icon: "twitter",
                },
                {
                    title: "Awwwards",
                    link: "#",
                    target: "_blank",
                    icon: "Awwwards",
                },
            ],
        },
    },
};

let payload;
export default function reducer(
    state: State = initialState,
    action: ActionTypes
) {
    switch (action.type) {
        case SET_MAIN_SCROLL_CONTAINER:
            payload = action.payload as State["mainScrollContainer"];
            return {
                ...state,
                mainScrollContainer: {
                    ref: payload.ref,
                    scroll: payload.scroll,
                    num: payload.num,
                },
            };

        case OPEN_PRELOADER:
            return {
                ...state,
                preloaderState: true,
            };
        case CLOSE_PRELOADER:
            return {
                ...state,
                preloaderState: false,
            };
        case TOGGLE_PRELOADER:
            return {
                ...state,
                preloaderState: !state.preloaderState,
            };

        case INITIATE_AUTH:
            payload = action.payload as State["auth"];
            return {
                ...state,
                auth: {
                    accessToken: payload.accessToken,
                    user: payload.user,
                },
            };

        case DESTROY_AUTH:
            return {
                ...state,
                auth: {
                    accessToken: null,
                    user: null,
                },
            };

        case INITIATE_SITE_SETTINGS:
            payload = action.payload as State["siteSettings"];
            return {
                ...state,
                siteSettings: {
                    ...state.siteSettings,
                    ...payload,
                },
            };

        case SET_WORKS:
            payload = action.payload as State["works"];
            return {
                ...state,
                works: payload,
            };

        default:
            return state;
    }
}

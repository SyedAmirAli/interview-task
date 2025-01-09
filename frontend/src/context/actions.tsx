import { State } from "@/constants/types";

export const SET_MAIN_SCROLL_CONTAINER = "SET_MAIN_SCROLL_CONTAINER";
export const OPEN_PRELOADER = "OPEN_PRELOADER";
export const CLOSE_PRELOADER = "CLOSE_PRELOADER";
export const TOGGLE_PRELOADER = "TOGGLE_PRELOADER";

export const SET_WORKS = "SET_WORKS";

export const INITIATE_AUTH = "INITIATE_AUTH";
export const DESTROY_AUTH = "DESTROY_AUTH";

export const INITIATE_SITE_SETTINGS = "INITIATE_SITE_SETTINGS";

export const setWorks = (payload: State["works"]) => ({
    type: SET_WORKS,
    payload,
});

export const initiateSiteSettings = (payload: State["siteSettings"]) => ({
    type: INITIATE_SITE_SETTINGS,
    payload,
});

export const initiateAuth = (payload: State["auth"]) => ({
    type: INITIATE_AUTH,
    payload,
});

export const destroyAuth = (payload?: undefined) => ({
    type: DESTROY_AUTH,
    payload: null,
});

export const openPreloader = (payload?: State["preloaderState"]) => ({
    type: OPEN_PRELOADER,
    payload: true,
});
export const closePreloader = (payload?: State["preloaderState"]) => ({
    type: CLOSE_PRELOADER,
    payload: false,
});
export const togglePreloader = () => ({
    type: CLOSE_PRELOADER,
    payload: undefined,
});

export const setMainScrollContainer = (
    payload: State["mainScrollContainer"]
) => ({ type: SET_MAIN_SCROLL_CONTAINER, payload });

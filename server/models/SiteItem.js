import mongoose from "mongoose";

const siteItemSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true,
        },
        value: {
            type: Object,
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("SiteItem", siteItemSchema);

/* 

    const values = {
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
    };

*/

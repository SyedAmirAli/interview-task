"use client";
import Link from "next/link";
import { Briefcase, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Assets from "@/assets";

const menuItems = [
    { name: "Manage Works", icon: Briefcase, href: "/admin/works" },
    {
        name: "Manage Site Settings",
        icon: Settings,
        href: "/admin/site-settings",
    },
];

export function Sidebar() {
    return (
        <div className="flex h-full w-64 flex-col bg-white shadow-md">
            <div className="flex h-16 items-center justify-center border-b">
                <Assets.svg.logo width={70} height={40} />
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                            {
                                "bg-gray-100 text-gray-900": false, // TODO: Add active state logic
                            }
                        )}
                    >
                        <item.icon className="mr-3 h-6 w-6" />
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

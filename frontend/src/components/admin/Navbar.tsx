"use client";

import { useEffect, useState } from "react";
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/context/ContextProvider";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const app = useAppContext();

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token || !app.auth.accessToken) {
            router.push("/admin/login?redirect=" + pathname);
        }
    }, [app.auth.accessToken]);

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Sheet
                                open={isMobileMenuOpen}
                                onOpenChange={setIsMobileMenuOpen}
                            >
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="lg:hidden"
                                    >
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">
                                            Open sidebar
                                        </span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="p-0">
                                    <Sidebar />
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </div>
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <Button variant="ghost" size="icon" className="ml-3">
                            <Bell className="h-6 w-6" />
                            <span className="sr-only">View notifications</span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="ml-3">
                                    <Avatar>
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
}

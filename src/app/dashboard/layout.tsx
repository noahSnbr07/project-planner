'use server';

import React from "react";

import {
    Sidebar,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import getAuth from "@/functions/get-auth";
import database from "@/lib/database";
import Link from "next/link";
import Image from "next/image";
import { banner } from "../assets/assets";
import auth from "@/interfaces/auth";

interface _props {
    children: React.ReactNode;
}

export default async function layout({ children }: _props) {

    const { id } = await getAuth() as auth;

    const data = await database.user.findUnique({
        where: { id },
        include: { workspace: true },
    });

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader className="p-4">
                    <Link
                        href={"/dashboard"}>
                        <Image
                            alt="Banner"
                            title="Project Planner"
                            height={24}
                            className="opacity-50"
                            src={banner}
                        />
                    </Link>
                </SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            hi
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </Sidebar>
            <SidebarInset>
                <header className="flex p-4 shrink-0 items-center gap-4 border-b">
                    <SidebarTrigger />
                    <h1> <b> {data?.workspace.name} </b> </h1>
                </header>
                <div className="flex-1 gap-4 p-4 overflow-y-scroll">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
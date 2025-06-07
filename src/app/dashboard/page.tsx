'use server';

import getAuth from "@/functions/get-auth";
import auth from "@/interfaces/auth";
import database from "@/lib/database";
import Greeting from "./components/greeting";
import Projects from "./components/projects";

export default async function page() {

    const { id } = await getAuth() as auth;

    const data = await database.user.findUnique({
        where: { id },
        select: { name: true, workspace: { select: { projects: true } } },
    });

    if (!data) return <></>;

    return (
        <div className="flex gap-4 flex-col">
            <Greeting name={data.name || "[Error]"} />
            <Projects projects={data.workspace.projects} />
        </div>
    );
}
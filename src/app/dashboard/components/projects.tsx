'use server';
import { Project } from "@prisma/client";
import Link from "next/link";



interface _props {
    projects: Project[];
}

export default async function Projects({ projects }: _props) {


    return (
        <div className="grid p-4 grid-cols-1 md:grid-cols-5 gap-8">
            {projects.map((project, _index) =>
                <Link
                    key={_index}
                    href={`/project/${project.id}`}>
                    <div className="flex flex-col gap-2 px-8 py-4 border-2 rounded-md h-[128px]">
                        <b> {project.name} </b>
                        <i className="text-muted text-sm"> {project.created.toLocaleDateString()} </i>
                    </div>
                </Link>)}
        </div>
    );
}
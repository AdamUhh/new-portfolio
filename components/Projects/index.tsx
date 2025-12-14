import { useState } from "react";

import { WindowProps } from "@/lib/types";

import { FallbackImage } from "../FallbackImage";
import { projects } from "./data";

function ProjectCard({
    title,
    description,
    imageSrc,
    tags,
    onClick,
}: {
    title: string;
    description: string;
    imageSrc: string;
    tags: string[];
    onClick: () => void;
}) {
    return (
        <div
            className="relative aspect-10/11 w-full rounded bg-[#252526] transition-transform after:absolute after:inset-0 after:bg-transparent after:transition-colors after:duration-500 hover:scale-105 hover:cursor-pointer hover:after:bg-accent/5"
            onClick={onClick}
        >
            <div className="relative flex h-full flex-col overflow-hidden">
                <FallbackImage
                    src={imageSrc}
                    alt={`Thumbnail for ${title}`}
                    width={0}
                    height={0}
                    className="h-40 max-h-40 min-h-40 w-full object-cover"
                />
                <div className="flex flex-1 flex-col space-y-2 p-2">
                    <p className="text-xl">{title}</p>
                    <p className="text-accent/80">{description}</p>
                    <div className="mt-auto flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <div
                                key={tag}
                                className="w-fit rounded-xs bg-[#0a84c8] px-1.5 py-0.5 text-xs"
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ProjectsWindow({ windowId }: WindowProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const selectedProject =
        selectedIndex !== null ? projects[selectedIndex] : null;
    const ProjectComponent = selectedProject?.component;

    if (ProjectComponent)
        return <ProjectComponent onBack={() => setSelectedIndex(null)} />;

    return (
        <div className="flex size-full flex-col overflow-hidden bg-[#191919] text-accent">
            <div className="flex flex-[1_1_0] overflow-x-hidden overflow-y-auto">
                <div className="grid h-fit w-full animate-fade-in-up grid-cols-[repeat(auto-fit,minmax(16rem,20rem))] justify-center gap-4 p-4">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            title={project.title}
                            description={project.description}
                            imageSrc={project.imageSrc}
                            tags={project.tags}
                            onClick={() => setSelectedIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

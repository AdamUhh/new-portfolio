"use client";

import { InfoIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/shadcn/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/select";

import { WindowProps } from "@/lib/types";

import { FallbackImage } from "../FallbackImage";
import { TagType, projects, tagConfigs } from "./data";

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
            className="group relative aspect-10/11 w-full overflow-hidden rounded-lg bg-[#252526] shadow-md transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer hover:shadow-xl"
            onClick={onClick}
        >
            <div className="relative flex h-full flex-col overflow-hidden">
                {/* Image container with subtle zoom effect */}
                <div className="relative h-40 max-h-40 min-h-40 w-full overflow-hidden">
                    <FallbackImage
                        src={imageSrc}
                        alt={`Thumbnail for ${title}`}
                        width={0}
                        height={0}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Content section */}
                <div className="flex flex-1 flex-col space-y-3 p-4">
                    <h3 className="line-clamp-2 text-xl font-semibold text-white/95">
                        {title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-accent/70">
                        {description}
                    </p>

                    {/* Tags */}
                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        {tags.map((tag) => {
                            const config = tagConfigs[tag as TagType];
                            return (
                                <div
                                    key={tag}
                                    className="w-fit rounded px-2 py-1 text-xs font-medium transition-transform duration-200 hover:scale-105"
                                    style={{
                                        backgroundColor: config.bgColor,
                                        color: config.color || "white",
                                    }}
                                >
                                    {tag}
                                </div>
                            );
                        })}
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

    const handleProjectSelect = (value: string) => {
        const index = projects.findIndex(
            (p) => p.title.toLowerCase().replace(/\s+/g, "-") === value
        );
        if (index !== -1) {
            setSelectedIndex(index);
        }
    };

    return (
        <div className="flex size-full flex-col overflow-hidden bg-[#191919] text-accent">
            {/* Chrome-style Header */}
            <div className="flex items-center gap-2 border-b border-[#2d2d2d] bg-[#202124] px-3 py-2">
                {/* Navigation buttons */}
                <div className="flex items-center gap-1">
                    <Button
                        onClick={() => setSelectedIndex(null)}
                        disabled={selectedIndex === null}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-accent/60 hover:bg-[#2d2d2d] hover:text-accent disabled:opacity-30"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        disabled
                        className="h-8 w-8 p-0 text-accent/60 hover:bg-[#2d2d2d] hover:text-accent disabled:opacity-30"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Button>
                </div>

                {/* Address bar / Project selector */}
                <div className="flex flex-1 items-center gap-2 rounded-md bg-[#2d2d2d] px-4 py-1.5">
                    <InfoIcon className="size-4 text-accent/60" />
                    <Select
                        value={
                            selectedIndex !== null
                                ? projects[selectedIndex].title
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")
                                : ""
                        }
                        onValueChange={handleProjectSelect}
                    >
                        <SelectTrigger className="h-4! flex-1 border-0 bg-transparent p-0 text-sm text-accent/80 shadow-none focus:ring-0!">
                            <SelectValue placeholder="projects/" />
                        </SelectTrigger>
                        <SelectContent
                            position="popper"
                            className="-left-3 rounded"
                        >
                            {projects.map((project) => (
                                <SelectItem
                                    key={project.title}
                                    value={project.title
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}
                                >
                                    projects/
                                    {project.title
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-[1_1_0] overflow-x-hidden overflow-y-auto">
                {ProjectComponent ? (
                    <ProjectComponent />
                ) : (
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
                )}
            </div>
        </div>
    );
}

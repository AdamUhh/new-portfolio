import React from "react";

import { ClockHub } from "./ClockHub";
import { HeadlessDashboard } from "./HeadlessDashboard";
import { Loflo } from "./Loflo";
import { ProjectProps } from "./projects.type";

export const projects: {
    title: string;
    description: string;
    imageSrc: string;
    tags: string[];
    component: React.ComponentType<ProjectProps>;
}[] = [
    {
        title: "Clock Hub",
        description:
            "A clock app meant for extra monitors, equipped with a stopwatch and international clocks.",
        imageSrc: "/image-not-found.webp",
        tags: ["Side Project", "SvelteKit"],
        component: ClockHub,
    },
    {
        title: "LoFlo",
        description:
            "A folder-like flashcard app where users can learn through digital flashcards.",
        imageSrc: "/image-not-found.webp",
        tags: ["Side Project", "NextJS", "Typescript"],
        component: Loflo,
    },
    {
        title: "Headless Dashboard",
        description:
            "A headless e-commerce dashboard that replicates core features of Shopify.",
        imageSrc: "/image-not-found.webp",
        tags: ["Work", "NextJS", "Typescript", "AWS"],
        component: HeadlessDashboard,
    },
] as const;

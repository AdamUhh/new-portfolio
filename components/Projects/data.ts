import { ClockHub } from "./ClockHub";
import { HeadlessDashboard } from "./HeadlessDashboard";
import { Loflo } from "./Loflo";
import { ProjectProps } from "./projects.type";

export enum TagType {
    SideProject = "Side Project",
    Work = "Work",
    SvelteKit = "SvelteKit",
    NextJS = "NextJS",
    Typescript = "Typescript",
    AWS = "AWS",
    DrizzleORM = "DrizzleOrm",
    TursoDB = "TursoDB",
    CockroachDB = "CockroachDB",
}

interface TagConfig {
    bgColor: string;
    color?: string;
}

export const tagConfigs: Record<TagType, TagConfig> = {
    [TagType.SideProject]: { bgColor: "#4f83cc" },
    [TagType.Work]: { bgColor: "#f07167", color: "#000000" },
    [TagType.SvelteKit]: { bgColor: "#ff3e00" },
    [TagType.NextJS]: { bgColor: "#000000" },
    [TagType.Typescript]: { bgColor: "#3178c6" },
    [TagType.AWS]: { bgColor: "#ff9900", color: "#000000" },
    [TagType.DrizzleORM]: { bgColor: "#c6f754", color: "#000000" },
    [TagType.TursoDB]: { bgColor: "#4ff8d2", color: "#000000" },
    [TagType.CockroachDB]: { bgColor: "#6933ff" },
};

export const projects: {
    title: string;
    description: string;
    imageSrc: string;
    tags: TagType[];
    component: React.ComponentType<ProjectProps>;
}[] = [
    {
        title: "Headless Dashboard",
        description:
            "A headless e-commerce dashboard that replicates core features of Shopify.",
        imageSrc: "/projects/headless-dashboard.webp",
        tags: [
            TagType.Work,
            TagType.NextJS,
            TagType.Typescript,
            TagType.AWS,
            TagType.DrizzleORM,
            TagType.CockroachDB,
        ],
        component: HeadlessDashboard,
    },
    {
        title: "LoFlo",
        description:
            "A folder-like flashcard app where users can revise through digital flashcards.",
        imageSrc: "/projects/loflo.gif",
        tags: [
            TagType.SideProject,
            TagType.NextJS,
            TagType.Typescript,
            TagType.DrizzleORM,
            TagType.TursoDB,
        ],
        component: Loflo,
    },
    {
        title: "Clock Hub",
        description:
            "A clock app meant for extra monitors, equipped with a stopwatch and international clocks.",
        imageSrc: "/projects/clock-hub.gif",
        tags: [TagType.SideProject, TagType.SvelteKit],
        component: ClockHub,
    },
] as const;

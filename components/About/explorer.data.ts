import { APP_REGISTRY_NAMES } from "@/lib/registry-constants";

type TreeLeaf = {
    name: string;
    value: string;
    type: "tree" | "window" | "link";
};

export type TreeItem = TreeLeaf | [TreeLeaf, ...TreeItem[]];

export const explorerData = {
    tree: [
        [
            { name: "pages" },
            { name: "about.html", value: "about", type: "tree" },
            { name: "experience.ts", value: "experience", type: "tree" },
        ],
        [
            { name: "other-windows" },
            {
                name: "projects.tsx",
                value: APP_REGISTRY_NAMES.projects,
                type: "window",
            },
            {
                name: "contact.css",
                value: APP_REGISTRY_NAMES.contact,
                type: "window",
            },
        ],
        [
            { name: "links" },
            {
                name: "github.json",
                value: "https://github.com/AdamUhh",
                type: "link",
            },
            { name: "cv.tsx", value: "https://cv.adamuhh.dev", type: "link" },
        ],
    ],
};

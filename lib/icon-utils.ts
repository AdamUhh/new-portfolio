import {
    mdiCodeJson,
    mdiFile,
    mdiLanguageCss3,
    mdiLanguageHtml5,
    mdiLanguageJavascript,
    mdiLanguageMarkdown,
    mdiLanguageTypescript,
    mdiReact,
} from "@mdi/js";

enum FileExtension {
    TSX = ".tsx",
    JSX = ".jsx",
    TS = ".ts",
    JS = ".js",
    HTML = ".html",
    CSS = ".css",
    MD = ".md",
    JSON = ".json",
}

interface ExtensionConfig {
    color: string;
    icon: string;
    fullName: string;
}

const extensionConfigs: Record<FileExtension, ExtensionConfig> = {
    [FileExtension.TSX]: {
        color: "#00bcd4",
        icon: mdiReact,
        fullName: "TypeScript JSX",
    },
    [FileExtension.JSX]: {
        color: "#00bcd4",
        icon: mdiReact,
        fullName: "JavaScript JSX",
    },
    [FileExtension.TS]: {
        color: "#0a84c8",
        icon: mdiLanguageTypescript,
        fullName: "TypeScript",
    },
    [FileExtension.JS]: {
        color: "#f6df1c",
        icon: mdiLanguageJavascript,
        fullName: "JavaScript",
    },
    [FileExtension.HTML]: {
        color: "#e44d26",
        icon: mdiLanguageHtml5,
        fullName: "HTML",
    },
    [FileExtension.CSS]: {
        color: "#50a8ee",
        icon: mdiLanguageCss3,
        fullName: "Tailwind CSS",
    },
    [FileExtension.MD]: {
        color: "#42a5f5",
        icon: mdiLanguageMarkdown,
        fullName: "Markdown",
    },
    [FileExtension.JSON]: {
        color: "#debb7b",
        icon: mdiCodeJson,
        fullName: "JSON",
    },
};

export const getColorFromFileExt = (
    filename: string,
    defaultColor: string = "#fff"
): string => {
    const lastDotIndex = filename.lastIndexOf(".");
    const ext =
        lastDotIndex !== -1 ? filename.substring(lastDotIndex) : filename;

    return extensionConfigs[ext as FileExtension]?.color || defaultColor;
};

export const getIconFromFileExt = (
    filename: string,
    defaultIcon: string = mdiFile
): string => {
    const lastDotIndex = filename.lastIndexOf(".");
    const ext =
        lastDotIndex !== -1 ? filename.substring(lastDotIndex) : filename;

    return extensionConfigs[ext as FileExtension]?.icon || defaultIcon;
};

import { mdiCog } from "@mdi/js";
import { CogIcon } from "lucide-react";

import { AboutWindow, SettingsWindow } from "@/components/About";

import { AppDefinition } from "./types";

export const APP_REGISTRY_NAMES = {
    about: "about",
    projects: "projects",
    contact: "contact",
    terminal: "terminal",
    settings: "settings",
    help: "help",
} as const;

export const APP_REGISTRY: Record<string, AppDefinition> = {
    [APP_REGISTRY_NAMES.about]: {
        id: APP_REGISTRY_NAMES.about,
        title: "About",
        titlebarIcon: "📄",
        component: AboutWindow,
        isRoute: true,
        defaultSize: { width: 500, height: 400 },
    },
    [APP_REGISTRY_NAMES.settings]: {
        id: APP_REGISTRY_NAMES.settings,
        title: "Settings",
        titlebarIcon: "⚙️",
        component: SettingsWindow,
        appIcon: mdiCog,
        isMdiIcon: true,
        defaultSize: { width: 600, height: 500 },
    },
} as const;

export type AppId =
    (typeof APP_REGISTRY_NAMES)[keyof typeof APP_REGISTRY_NAMES];

export const getApp = (appId: string) => APP_REGISTRY[appId as AppId];
export const getAllApps = () => Object.values(APP_REGISTRY);

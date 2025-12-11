import { mdiCog } from "@mdi/js";
import { LucideProps } from "lucide-react";

import { AboutWindow } from "@/components/About";
import { SettingsWindow } from "@/components/Settings";
import { VSCodeIcon } from "@/components/svg/vscode";

import { APP_REGISTRY_NAMES } from "./registry-constants";
import { AppDefinition } from "./types";

export const APP_REGISTRY: Record<string, AppDefinition> = {
    [APP_REGISTRY_NAMES.about]: {
        id: APP_REGISTRY_NAMES.about,
        title: "About",
        titlebarIcon: VSCodeIcon as React.ComponentType<LucideProps>,
        component: AboutWindow,
        isRoute: true,
        defaultSize: { width: 900, height: 800 },
    },
    [APP_REGISTRY_NAMES.settings]: {
        id: APP_REGISTRY_NAMES.settings,
        title: "Settings",
        titlebarIcon: mdiCog,
        isTitleMdiIcon: true,
        component: SettingsWindow,
        appIcon: mdiCog,
        isAppMdiIcon: true,
        defaultSize: { width: 600, height: 500 },
    },
} as const;

export type AppId =
    (typeof APP_REGISTRY_NAMES)[keyof typeof APP_REGISTRY_NAMES];

export const getApp = (appId: string) => APP_REGISTRY[appId as AppId];
export const getAllApps = () => Object.values(APP_REGISTRY);

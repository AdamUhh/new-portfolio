import {
    mdiBriefcase,
    mdiConsole,
    mdiEmailEdit,
    mdiHumanGreeting,
} from "@mdi/js";
import { LucideProps } from "lucide-react";

import { AboutWindow } from "@/components/About";
import { ContactWindow } from "@/components/Contact";
import { NeedHelpWindow } from "@/components/Help";
import { ProjectsWindow } from "@/components/Projects";
import { TerminalWindow } from "@/components/Terminal";
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
    [APP_REGISTRY_NAMES.terminal]: {
        id: APP_REGISTRY_NAMES.terminal,
        title: "Bash",
        titlebarIcon: mdiConsole,
        isTitleMdiIcon: true,
        component: TerminalWindow,
        appIcon: mdiConsole,
        isAppMdiIcon: true,
        defaultSize: { width: 600, height: 500 },
    },

    [APP_REGISTRY_NAMES.projects]: {
        id: APP_REGISTRY_NAMES.projects,
        title: "My Projects",
        titlebarIcon: mdiBriefcase,
        isTitleMdiIcon: true,
        component: ProjectsWindow,
        appIcon: mdiBriefcase,
        isAppMdiIcon: true,
        defaultSize: { width: 700, height: 500 },
    },
    [APP_REGISTRY_NAMES.contact]: {
        id: APP_REGISTRY_NAMES.contact,
        title: "Contact Me",
        titlebarIcon: mdiEmailEdit,
        isTitleMdiIcon: true,
        component: ContactWindow,
        appIcon: mdiEmailEdit,
        isAppMdiIcon: true,
        defaultSize: { width: 600, height: 500 },
    },
    [APP_REGISTRY_NAMES.help]: {
        id: APP_REGISTRY_NAMES.help,
        title: "This is a joke!",
        titlebarIcon: mdiHumanGreeting,
        isTitleMdiIcon: true,
        component: NeedHelpWindow,
        appIcon: mdiHumanGreeting,
        isAppMdiIcon: true,
        defaultSize: { width: 600, height: 500 },
    },
} as const;

export type AppId =
    (typeof APP_REGISTRY_NAMES)[keyof typeof APP_REGISTRY_NAMES];

export const getApp = (appId: string) => APP_REGISTRY[appId as AppId];
export const getAllApps = () => Object.values(APP_REGISTRY);

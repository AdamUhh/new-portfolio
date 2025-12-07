import AboutApp from "@/components/About";

// import CalculatorApp from "../apps/CalculatorApp";
// import SettingsApp from "../apps/SettingsApp";
import { AppDefinition } from "./types";

export type APP_REGISTRY_NAMES_TYPE = string;
// export type APP_REGISTRY_NAMES_TYPE = keyof typeof APP_REGISTRY_NAMES;

export const APP_REGISTRY_NAMES = {
    about: "about",
} as const;

/**
 * Static registry of all apps.
 * NOT stored in React state - just imported where needed.
 * To add a new app: just add it here, no other changes needed.
 */
export const APP_REGISTRY: Record<APP_REGISTRY_NAMES_TYPE, AppDefinition> = {
    about: {
        id: "about",
        title: "About",
        icon: "📄",
        component: AboutApp,
        route: "/about",
        affectsUrl: true,
        defaultSize: { width: 500, height: 400 },
    },
    // calculator: {
    //     id: "calculator",
    //     title: "Calculator",
    //     icon: "🔢",
    //     component: CalculatorApp,
    //     route: "/calculator",
    //     affectsUrl: true,
    //     defaultSize: { width: 320, height: 480 },
    // },
    // settings: {
    //     id: "settings",
    //     title: "Settings",
    //     icon: "⚙️",
    //     component: SettingsApp,
    //     affectsUrl: false, // Settings doesn't change URL - it's a modal/overlay
    //     defaultSize: { width: 600, height: 500 },
    // },
    // notepad: {
    //     id: "notepad",
    //     title: "Notepad",
    //     icon: "📝",
    //     component: AboutApp, // Replace with actual component
    //     route: "/notepad",
    //     affectsUrl: true,
    //     allowMultiple: true, // Can open multiple notepad instances
    //     defaultSize: { width: 600, height: 400 },
    // },
};

/**
 * Get app definition by ID
 */
export function getAppDefinition(
    appId: APP_REGISTRY_NAMES_TYPE
): AppDefinition {
    return APP_REGISTRY[appId];
}

/**
 * Get app definition by route
 */
export function getAppByRoute(pathname: string): AppDefinition | undefined {
    // Extract appId from pathname: "/about" -> "about"
    const appId = pathname.replace(/^\//, "").split("/")[0];
    const app = APP_REGISTRY[appId];

    // Only return if it's a routable app
    return app?.affectsUrl ? app : undefined;
}

/**
 * Get all apps (for taskbar, app launcher, etc.)
 */
export function getAllApps(): AppDefinition[] {
    return Object.values(APP_REGISTRY);
}

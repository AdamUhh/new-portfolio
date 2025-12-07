import { APP_REGISTRY_NAMES_TYPE } from "./registry";

export interface WindowMetadata {
    id: string;
    appId: APP_REGISTRY_NAMES_TYPE;
    title: string;
    isOpen: boolean;
    isFocused: boolean;
    isMinimized: boolean;
    isExpanded: boolean;
    zIndex: number;
    position: { x: number; y: number };
    size: { width: number; height: number };
    taskbarPosition?: number; // For animation origin
}

export interface AppDefinition {
    id: APP_REGISTRY_NAMES_TYPE;
    title: string;
    icon: string;
    component: React.ComponentType<WindowComponentProps>;
    defaultSize?: { width: number; height: number };
    route?: string; // e.g., "/about", "/calculator"
    affectsUrl?: boolean; // If false, doesn't change URL (for Settings, modals)
    allowMultiple?: boolean; // If true, can open multiple instances
}

export interface WindowComponentProps {
    windowId: string;
    onClose: () => void;
    onMinimize: () => void;
    onExpand: () => void;
}

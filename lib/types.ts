import { LucideProps } from "lucide-react";

export interface WindowMetadata {
    id: string;
    appId: string;
    isFocused: boolean;
    isMinimized: boolean;
    isExpanded: boolean;
    zIndex: number;
    position: { x: number; y: number };
    size: { width: number; height: number };
}

export interface AppDefinition {
    id: string;
    title: string;
    defaultSize: { width: number; height: number };
    component: React.ComponentType<WindowProps>;
    titlebarIcon?: string;
    appIcon?: React.ComponentType<LucideProps> | string;
    isMdiIcon?: boolean;
    allowMultiple?: boolean; // If false, only one instance can be open
    isRoute?: boolean; // If true, acts as actual /route, else, /?app=route
}

export interface WindowProps {
    windowId: string;
}

export interface WindowManagerContextType {
    windows: WindowMetadata[];
    openWindow: (appId: string) => void;
    closeWindow: (windowId: string) => void;
    focusWindow: (windowId: string) => void;
    minimizeWindow: (windowId: string) => void;
    toggleWindow: (windowId: string) => void;
    toggleExpand: (windowId: string) => void;
    updatePosition: (windowId: string, x: number, y: number) => void;
    updateSize: (windowId: string, width: number, height: number) => void;
}

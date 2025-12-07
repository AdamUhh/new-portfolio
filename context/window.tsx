"use client";

import React, { createContext, useContext, useState } from "react";

import { WindowMetadata } from "@/lib/types";

interface WindowContextValue {
    windows: WindowMetadata[];
    setWindows: React.Dispatch<React.SetStateAction<WindowMetadata[]>>;
}

const WindowContext = createContext<WindowContextValue | undefined>(undefined);

export function WindowProvider({ children }: { children: React.ReactNode }) {
    const [windows, setWindows] = useState<WindowMetadata[]>([]);

    return (
        <WindowContext.Provider value={{ windows, setWindows }}>
            {children}
        </WindowContext.Provider>
    );
}

export function useWindowContext() {
    const context = useContext(WindowContext);
    if (!context) {
        throw new Error("useWindowContext must be used within WindowProvider");
    }
    return context;
}

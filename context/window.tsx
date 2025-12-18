"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import { getApp } from "@/lib/registry";
import { WindowManagerContextType, WindowMetadata } from "@/lib/types";

const WindowManagerContext = createContext<WindowManagerContextType | null>(
    null
);

export function WindowProvider({ children }: { children: React.ReactNode }) {
    const [windows, setWindows] = useState<WindowMetadata[]>([]);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const nextWindowId = useRef(1);
    const nextZIndex = useRef(1);

    const getIsMobile = () => {
        if (typeof window === "undefined") return false;
        return window.innerWidth <= 768;
    };

    const [isMobile, setIsMobile] = useState<boolean>(getIsMobile);

    useEffect(() => {
        const onResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const getMobileSize = useCallback(() => {
        if (typeof window === "undefined") {
            return { width: 0, height: 0 };
        }

        const { innerWidth, innerHeight } = window;

        return {
            width: innerWidth,
            height: innerHeight * 0.75,
        };
    }, []);

    // Sync windows from URL
    useEffect(() => {
        // Parse app IDs from query params
        const appParam = searchParams.get("app");
        const urlAppIds = appParam ? appParam.split(",") : [];

        // Parse route-based app from pathname
        const routeApp = pathname.slice(1); // Remove leading slash
        const routeAppDef = routeApp ? getApp(routeApp) : null;

        // Collect all app IDs that should be open
        const shouldBeOpen: string[] = [];

        // Add route-based app if valid
        if (routeAppDef?.isRoute) {
            shouldBeOpen.push(routeApp);
        }

        // Add query param apps
        shouldBeOpen.push(...urlAppIds);

        // If no apps should be open, clear windows
        if (shouldBeOpen.length === 0) {
            return;
        }

        setWindows((prev) => {
            const newWindows: WindowMetadata[] = [];
            const existingWindowsByApp = new Map<string, WindowMetadata[]>();

            // Group existing windows by appId
            prev.forEach((w) => {
                if (!existingWindowsByApp.has(w.appId)) {
                    existingWindowsByApp.set(w.appId, []);
                }
                existingWindowsByApp.get(w.appId)!.push(w);
            });

            // Process each app that should be open
            shouldBeOpen.forEach((appId) => {
                const app = getApp(appId);
                if (!app) return;

                const existingForApp = existingWindowsByApp.get(appId) || [];

                if (existingForApp.length > 0) {
                    // Reuse existing window(s)
                    newWindows.push(existingForApp[0]);
                    existingWindowsByApp.set(appId, existingForApp.slice(1));
                } else {
                    // Create new window
                    newWindows.push({
                        id: `window-${nextWindowId.current++}`,
                        appId,
                        isFocused: false,
                        isMinimized: false,
                        isExpanded: isMobile,
                        zIndex: nextZIndex.current++,
                        position: isMobile
                            ? { x: 0, y: 0 }
                            : {
                                  x: 100 + newWindows.length * 50,
                                  y: 100 + newWindows.length * 50,
                              },
                        size: isMobile ? getMobileSize() : app.defaultSize,
                    });
                }
            });

            // Focus the last window
            if (newWindows.length > 0) {
                newWindows[newWindows.length - 1].isFocused = true;
            }

            return newWindows;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update URL based on open windows with routes and query params
    const updateUrl = useCallback(
        (
            routePath: string,
            appId?: string,
            shouldAdd?: boolean,
            allowMultiple?: boolean
        ) => {
            // Get current app IDs from query params
            const queryApps = searchParams.get("app")?.split(",") || [];

            // Add app ID to list if specified
            if (appId && shouldAdd) {
                if (!queryApps.includes(appId) || allowMultiple)
                    queryApps.push(appId);
            }

            // Remove first occurrence of app ID if specified
            if (appId && !shouldAdd) {
                const index = queryApps.indexOf(appId);
                if (index !== -1) queryApps.splice(index, 1);
            }

            // Clone params and remove app key to rebuild it
            const params = new URLSearchParams(searchParams);
            params.delete("app");
            const base = params.toString();

            // Manually build query to keep commas unencoded
            const query = `${base}${base ? "&" : ""}${queryApps.length ? `app=${queryApps.join(",")}` : ""}`;

            // Navigate to new URL
            router.push(query ? `${routePath}?${query}` : routePath);
        },
        [router, searchParams]
    );

    const updateWindow = useCallback(
        (windowId: string, changes: Partial<WindowMetadata>) => {
            setWindows((prev) =>
                prev.map((w) => (w.id === windowId ? { ...w, ...changes } : w))
            );
        },
        []
    );

    const openWindow = useCallback(
        (appId: string) => {
            // get app registry
            const app = getApp(appId);
            if (!app) {
                console.error(`App ${appId} not found in registry`);
                return;
            }

            setWindows((prev) => {
                // Focus existing if single-instance
                if (!app.allowMultiple) {
                    const existing = prev.find((w) => w.appId === appId);
                    if (existing) {
                        return prev.map((w) =>
                            w.id === existing.id
                                ? {
                                      ...w,
                                      isFocused: true,
                                      isMinimized: false,
                                      zIndex: nextZIndex.current++,
                                  }
                                : { ...w, isFocused: false }
                        );
                    }
                }

                // Create new window
                return [
                    ...prev.map((w) => ({ ...w, isFocused: false })),
                    {
                        id: `window-${nextWindowId.current++}`,
                        appId,
                        isFocused: true,
                        isMinimized: false,
                        isExpanded: isMobile,
                        zIndex: nextZIndex.current++,
                        position: isMobile
                            ? { x: 0, y: 0 }
                            : {
                                  x: 100 + prev.length * 50,
                                  y: 100 + prev.length * 50,
                              },
                        size: isMobile ? getMobileSize() : app.defaultSize,
                    },
                ];
            });

            if (app.isRoute) {
                updateUrl(`/${appId}`);
            } else {
                updateUrl(pathname, appId, true, app.allowMultiple);
            }
        },
        [getMobileSize, isMobile, pathname, updateUrl]
    );

    const closeWindow = useCallback(
        (windowId: string) => {
            const window = windows.find((w) => w.id === windowId);
            if (!window) return;

            const app = getApp(window.appId);

            setWindows((prev) => {
                const remainingWindows = prev.filter((w) => w.id !== windowId);

                if (remainingWindows.length === 0) return remainingWindows;

                // Focus the last remaining window
                const lastWindow =
                    remainingWindows[remainingWindows.length - 1];
                return remainingWindows.map((w) => ({
                    ...w,
                    isFocused: w.id === lastWindow.id,
                    zIndex:
                        w.id === lastWindow.id
                            ? nextZIndex.current++
                            : w.zIndex,
                }));
            });
            // Update URL based on app type
            if (app.isRoute) {
                updateUrl("/");
            } else {
                updateUrl(pathname, app.id);
            }
        },
        [pathname, updateUrl, windows]
    );

    const focusWindow = useCallback((windowId: string) => {
        setWindows((prev) =>
            prev.map((w) => ({
                ...w,
                isFocused: w.id === windowId,
                zIndex: w.id === windowId ? nextZIndex.current++ : w.zIndex,
            }))
        );
    }, []);

    const minimizeWindow = useCallback(
        (windowId: string) => {
            const window = windows.find((w) => w.id === windowId);
            if (!window) return;

            updateWindow(windowId, { isMinimized: true, isFocused: false });

            const app = getApp(window.appId);
            if (app.isRoute) {
                updateUrl("/");
            } else {
                updateUrl(pathname, app.id);
            }
        },
        [pathname, updateUrl, updateWindow, windows]
    );

    const toggleWindow = useCallback(
        (windowId: string) => {
            const window = windows.find((w) => w.id === windowId);
            if (!window) return;

            if (!window.isMinimized && window.isFocused) {
                updateWindow(windowId, { isMinimized: true, isFocused: false });

                const app = getApp(window.appId);
                if (app.isRoute) {
                    updateUrl("/");
                } else {
                    updateUrl(pathname, app.id);
                }
            } else if (!window.isMinimized && !window.isFocused) {
                focusWindow(windowId);
            } else {
                setWindows((prev) =>
                    prev.map((w) => ({
                        ...w,
                        isMinimized: w.id === windowId ? false : w.isMinimized,
                        isFocused: w.id === windowId,
                        zIndex:
                            w.id === windowId ? nextZIndex.current++ : w.zIndex,
                    }))
                );

                const app = getApp(window.appId);
                if (app.isRoute) {
                    updateUrl(`/${app.id}`);
                } else {
                    updateUrl(pathname, app.id, true, app.allowMultiple);
                }
            }
        },
        [focusWindow, pathname, updateUrl, updateWindow, windows]
    );

    const toggleExpand = useCallback((windowId: string) => {
        setWindows((prev) =>
            prev.map((w) =>
                w.id === windowId
                    ? {
                          ...w,
                          isExpanded: !w.isExpanded,
                          zIndex: nextZIndex.current++,
                      }
                    : w
            )
        );
    }, []);

    const updatePosition = useCallback(
        (windowId: string, x: number, y: number) => {
            updateWindow(windowId, { position: { x, y } });
        },
        [updateWindow]
    );

    const updateSize = useCallback(
        (windowId: string, width: number, height: number) => {
            updateWindow(windowId, { size: { width, height } });
        },
        [updateWindow]
    );

    return (
        <WindowManagerContext.Provider
            value={{
                windows,
                openWindow,
                closeWindow,
                focusWindow,
                minimizeWindow,
                toggleWindow,
                toggleExpand,
                updatePosition,
                updateSize,
            }}
        >
            {children}
        </WindowManagerContext.Provider>
    );
}

export function useWindowManager() {
    const context = useContext(WindowManagerContext);
    if (!context) {
        throw new Error("useWindowManager must be used within WindowProvider");
    }
    return context;
}

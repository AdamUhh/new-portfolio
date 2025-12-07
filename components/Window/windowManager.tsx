"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

import { getAppByRoute, getAppDefinition } from "@/lib/registry";
import { WindowMetadata } from "@/lib/types";

import { useWindowContext } from "@/context/window";

let windowIdCounter = 0;

export function useWindowManager() {
    const { windows, setWindows } = useWindowContext();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    /**
     * Build URL with open windows
     */
    const buildUrlWithWindows = useCallback((openWindows: WindowMetadata[]) => {
        const urlAffectingWindows = openWindows
            .filter((w) => {
                const app = getAppDefinition(w.appId);
                return app?.affectsUrl && w.isOpen && !w.isMinimized;
            })
            .map((w) => w.appId);

        if (urlAffectingWindows.length === 0) {
            return "/";
        }

        // Primary window determines the base path
        const primaryAppId = urlAffectingWindows[0];
        const basePath = `/${primaryAppId}`;

        // Additional windows go in query params
        if (urlAffectingWindows.length > 1) {
            const otherWindows = urlAffectingWindows.slice(1);
            return `${basePath}?windows=${otherWindows.join(",")}`;
        }

        return basePath;
    }, []);

    /**
     * Update URL based on open windows
     */
    const syncUrlToWindows = useCallback(
        (windows: WindowMetadata[]) => {
            const newUrl = buildUrlWithWindows(windows);
            const currentPath =
                pathname +
                (searchParams.toString() ? `?${searchParams.toString()}` : "");

            if (newUrl !== currentPath) {
                router.push(newUrl, { scroll: false });
            }
        },
        [buildUrlWithWindows, pathname, searchParams, router]
    );

    const handleAppClick = (appId: string) => {
        const existingWindow = windows.find(
            (w) => w.appId === appId && w.isOpen
        );
        if (existingWindow) {
            if (existingWindow.isMinimized) {
                focusWindow(existingWindow.id);
            } else if (existingWindow.isFocused) {
                minimizeWindow(existingWindow.id);
            } else {
                focusWindow(existingWindow.id);
            }
        } else {
            openWindow(appId);
        }
    };
    /**
     * Open a window
     */
    const openWindow = useCallback(
        (appId: string) => {
            const app = getAppDefinition(appId);
            if (!app) {
                console.error(`App ${appId} not found in registry`);
                return;
            }

            setWindows((prev) => {
                // Check if window already exists (unless allowMultiple is true)
                if (!app.allowMultiple) {
                    const existing = prev.find(
                        (w) => w.appId === appId && w.isOpen
                    );
                    if (existing) {
                        const updated = prev.map((w) =>
                            w.id === existing.id
                                ? {
                                      ...w,
                                      isFocused: true,
                                      isMinimized: false,
                                      zIndex:
                                          Math.max(
                                              ...prev.map((win) => win.zIndex)
                                          ) + 1,
                                  }
                                : { ...w, isFocused: false }
                        );

                        if (app.affectsUrl) {
                            setTimeout(() => syncUrlToWindows(updated), 0);
                        }

                        return updated;
                    }
                }

                // Create new window
                const maxZ =
                    prev.length > 0
                        ? Math.max(...prev.map((w) => w.zIndex))
                        : 0;
                const newWindow: WindowMetadata = {
                    id: `window-${appId}-${windowIdCounter++}`,
                    appId,
                    title: app.title,
                    isOpen: true,
                    isFocused: true,
                    isMinimized: false,
                    isExpanded: false,
                    zIndex: maxZ + 1,
                    position: {
                        x: 100 + prev.length * 30,
                        y: 100 + prev.length * 30,
                    },
                    size: app.defaultSize || { width: 600, height: 400 },
                };

                const updated = [
                    ...prev.map((w) => ({ ...w, isFocused: false })),
                    newWindow,
                ];

                if (app.affectsUrl) {
                    setTimeout(() => syncUrlToWindows(updated), 0);
                }

                return updated;
            });
        },
        [setWindows, syncUrlToWindows]
    );

    /**
     * Close a window
     */
    const closeWindow = useCallback(
        (windowId: string) => {
            setWindows((prev) => {
                const updated = prev.filter((w) => w.id !== windowId);
                const closedWindow = prev.find((w) => w.id === windowId);
                const app = closedWindow
                    ? getAppDefinition(closedWindow.appId)
                    : null;

                if (app?.affectsUrl) {
                    setTimeout(() => syncUrlToWindows(updated), 0);
                }

                return updated;
            });
        },
        [setWindows, syncUrlToWindows]
    );

    /**
     * Focus a window
     */
    const focusWindow = useCallback(
        (windowId: string) => {
            setWindows((prev) => {
                const maxZ = Math.max(...prev.map((w) => w.zIndex));
                return prev.map((w) =>
                    w.id === windowId
                        ? {
                              ...w,
                              isFocused: true,
                              zIndex: maxZ + 1,
                              isMinimized: false,
                          }
                        : { ...w, isFocused: false }
                );
            });
        },
        [setWindows]
    );

    /**
     * Minimize a window
     */
    const minimizeWindow = useCallback(
        (windowId: string) => {
            setWindows((prev) => {
                const updated = prev.map((w) =>
                    w.id === windowId
                        ? { ...w, isMinimized: true, isFocused: false }
                        : w
                );

                const minimizedWindow = prev.find((w) => w.id === windowId);
                const app = minimizedWindow
                    ? getAppDefinition(minimizedWindow.appId)
                    : null;

                if (app?.affectsUrl) {
                    setTimeout(() => syncUrlToWindows(updated), 0);
                }

                return updated;
            });
        },
        [setWindows, syncUrlToWindows]
    );

    /**
     * Toggle expanded state
     */
    const toggleExpand = useCallback(
        (windowId: string) => {
            setWindows((prev) =>
                prev.map((w) =>
                    w.id === windowId ? { ...w, isExpanded: !w.isExpanded } : w
                )
            );
        },
        [setWindows]
    );

    /**
     * Update window position
     */
    const updatePosition = useCallback(
        (windowId: string, position: { x: number; y: number }) => {
            setWindows((prev) =>
                prev.map((w) => (w.id === windowId ? { ...w, position } : w))
            );
        },
        [setWindows]
    );

    /**
     * Update window size
     */
    const updateSize = useCallback(
        (windowId: string, size: { width: number; height: number }) => {
            setWindows((prev) =>
                prev.map((w) => (w.id === windowId ? { ...w, size } : w))
            );
        },
        [setWindows]
    );

    /**
     * Sync windows from URL on mount/navigation
     */
    useEffect(() => {
        const windowsToOpen: string[] = [];

        // Get primary window from pathname
        const primaryApp = getAppByRoute(pathname);
        if (primaryApp) {
            windowsToOpen.push(primaryApp.id);
        }

        // Get additional windows from query params
        const windowsParam = searchParams.get("windows");
        if (windowsParam) {
            windowsToOpen.push(...windowsParam.split(","));
        }

        // Open windows that should be open but aren't
        windowsToOpen.forEach((appId) => {
            const app = getAppDefinition(appId);
            if (!app) return;

            const existingWindow = windows.find(
                (w) => w.appId === appId && w.isOpen
            );
            if (!existingWindow) {
                setTimeout(() => openWindow(appId), 0);
            }
        });
    }, [pathname, searchParams]);

    return {
        windows,
        openWindow,
        closeWindow,
        focusWindow,
        minimizeWindow,
        toggleExpand,
        updatePosition,
        updateSize,
        handleAppClick,
    };
}

"use client";

import React, { useRef } from "react";

import { getAppDefinition } from "@/lib/registry";
import { WindowMetadata } from "@/lib/types";

import { useWindowManager } from "./windowManager";

interface WindowProps {
    window: WindowMetadata;
}

export function Window({ window: win }: WindowProps) {
    const {
        focusWindow,
        closeWindow,
        minimizeWindow,
        toggleExpand,
        updatePosition,
    } = useWindowManager();
    const app = getAppDefinition(win.appId);
    const dragRef = useRef<{
        startX: number;
        startY: number;
        startPosX: number;
        startPosY: number;
    } | null>(null);

    if (!app) return null;

    const AppComponent = app.component;

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.target !== e.currentTarget) return;
        focusWindow(win.id);

        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            startPosX: win.position.x,
            startPosY: win.position.y,
        };

        const handleMouseMove = (moveEvent: MouseEvent) => {
            if (!dragRef.current) return;
            const deltaX = moveEvent.clientX - dragRef.current.startX;
            const deltaY = moveEvent.clientY - dragRef.current.startY;
            updatePosition(win.id, {
                x: dragRef.current.startPosX + deltaX,
                y: dragRef.current.startPosY + deltaY,
            });
        };

        const handleMouseUp = () => {
            dragRef.current = null;
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    if (win.isMinimized) return null;

    const style: React.CSSProperties = win.isExpanded
        ? { left: 0, top: 0, width: "100vw", height: "calc(100vh - 48px)" }
        : {
              left: win.position.x,
              top: win.position.y,
              width: win.size.width,
              height: win.size.height,
          };

    return (
        <div
            className="absolute flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-2xl"
            style={{ ...style, zIndex: win.zIndex }}
            onClick={() => focusWindow(win.id)}
        >
            {/* Title Bar */}
            <div
                className={`flex h-8 cursor-move items-center justify-between px-3 select-none ${
                    win.isFocused
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                }`}
                onMouseDown={handleMouseDown}
            >
                <div className="flex items-center gap-2">
                    <span>{app.icon}</span>
                    <span className="text-sm font-medium">{win.title}</span>
                </div>
                <div className="flex gap-1">
                    <button
                        className="flex h-6 w-6 items-center justify-center rounded hover:bg-black/10"
                        onClick={(e) => {
                            e.stopPropagation();
                            minimizeWindow(win.id);
                        }}
                    >
                        −
                    </button>
                    <button
                        className="flex h-6 w-6 items-center justify-center rounded hover:bg-black/10"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(win.id);
                        }}
                    >
                        □
                    </button>
                    <button
                        className="flex h-6 w-6 items-center justify-center rounded hover:bg-red-500"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeWindow(win.id);
                        }}
                    >
                        ×
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
                <AppComponent
                    windowId={win.id}
                    onClose={() => closeWindow(win.id)}
                    onMinimize={() => minimizeWindow(win.id)}
                    onExpand={() => toggleExpand(win.id)}
                />
            </div>
        </div>
    );
}

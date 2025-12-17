"use client";

import {
    mdiWindowMaximize,
    mdiWindowMinimize,
    mdiWindowRestore,
} from "@mdi/js";
import Icon from "@mdi/react";
import { XIcon } from "lucide-react";
import React, { memo, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

import { Button } from "@/shadcn/button";

import { getApp } from "@/lib/registry";
import { WindowMetadata } from "@/lib/types";
import { cn } from "@/lib/utils";

import { useWindowManager } from "@/context/window";

interface WindowComponentProps {
    window: WindowMetadata;
}

function WindowBase({ window: w }: WindowComponentProps) {
    const {
        closeWindow,
        minimizeWindow,
        toggleExpand,
        updatePosition,
        updateSize,
        focusWindow,
    } = useWindowManager();

    const nodeRef = useRef<HTMLDivElement>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    const [dragPos, setDragPos] = useState({
        x: w.position.x,
        y: w.position.y,
    });

    const app = getApp(w.appId);
    if (!app || w.isMinimized) return null;

    const handleFocus = () => {
        if (!w.isFocused) focusWindow(w.id);
    };

    const handleDragStart = (e: DraggableEvent) => {
        e.stopPropagation();
        handleFocus();
        if (isResizing) return;
        setIsDragging(true);
    };

    const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
        e.stopPropagation();
        if (isResizing) return;
        const newPos = { x: Math.round(data.x), y: Math.round(data.y) };
        setDragPos(newPos);
        updatePosition(w.id, newPos.x, newPos.y);
        setIsDragging(false);
    };

    const handleResizeStart = () => {
        handleFocus();
        if (w.isExpanded) return;
        setIsResizing(true);
    };

    const handleResizeStop = (
        _e: React.SyntheticEvent,
        data: { size: { width: number; height: number } }
    ) => {
        if (w.isExpanded) return;
        updateSize(w.id, data.size.width, data.size.height);
        setIsResizing(false);
    };

    const {
        component: WindowContent,
        title,
        titlebarIcon,
        isTitleMdiIcon,
    } = app;

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".draggable-handle"
            disabled={w.isExpanded || isResizing}
            position={w.isExpanded ? { x: 0, y: 0 } : dragPos}
            onStart={handleDragStart}
            onStop={handleDragStop}
        >
            <Resizable
                width={w.size.width}
                height={w.size.height}
                onResizeStart={handleResizeStart}
                onResizeStop={handleResizeStop}
                onResize={(e, data) => {
                    e.stopPropagation();
                    updateSize(w.id, data.size.width, data.size.height);
                }}
                resizeHandles={["s", "e", "w", "n", "ne", "nw", "se", "sw"]}
                className="pointer-events-auto relative"
            >
                <div
                    ref={nodeRef}
                    data-expanded={w.isExpanded ? "true" : "false"}
                    style={
                        {
                            "--window-w": `${w.size.width}px`,
                            "--window-h": `${w.size.height}px`,
                            "--window-z": w.zIndex,
                            position: "absolute",
                        } as React.CSSProperties
                    }
                    className={cn(
                        "flex flex-col overflow-hidden bg-neutral-900 shadow-xl",

                        // size via variables
                        "z-(--window-z) h-(--window-h) w-(--window-w)",

                        // expanded mode
                        w.isExpanded &&
                            "fixed top-0 left-0 h-[calc(100vh-44px)] w-screen transform-none!",

                        // overlay & focus
                        "after:pointer-events-none after:absolute after:inset-0 after:z-10 after:bg-black/10",
                        w.isFocused && "shadow-black after:bg-transparent",
                        !w.isExpanded && "rounded-lg",

                        // transitions only when not dragging or resizing
                        !isDragging &&
                            !isResizing &&
                            "transition-[transform,width,height] duration-300 ease-in-out",

                        isResizing && "select-none"
                    )}
                >
                    {/* Titlebar */}
                    <div className="draggable-handle z-10 flex cursor-move items-center justify-between bg-[#252526] px-3 py-2 text-white shadow shadow-black/40 select-none">
                        <div className="flex items-center gap-2">
                            {titlebarIcon &&
                                (isTitleMdiIcon ? (
                                    <Icon
                                        path={titlebarIcon as string}
                                        className="size-5"
                                    />
                                ) : (
                                    React.createElement(titlebarIcon, {
                                        className: "size-5",
                                    })
                                ))}
                            <span className="text-sm font-semibold">
                                {title}
                            </span>
                        </div>

                        <div className="flex gap-1">
                            <Button
                                onClick={() => minimizeWindow(w.id)}
                                variant="ghost"
                                className="size-6 rounded bg-white/20"
                            >
                                <Icon path={mdiWindowMinimize} />
                            </Button>

                            <Button
                                onClick={() => toggleExpand(w.id)}
                                variant="ghost"
                                className="size-6 rounded bg-white/20"
                            >
                                <Icon
                                    path={
                                        w.isExpanded
                                            ? mdiWindowRestore
                                            : mdiWindowMaximize
                                    }
                                />
                            </Button>

                            <Button
                                onClick={() => closeWindow(w.id)}
                                variant="destructive"
                                className="size-6 rounded bg-red-600"
                            >
                                <XIcon className="size-4 stroke-[3.5]" />
                            </Button>
                        </div>
                    </div>

                    <div
                        className="flex-1 overflow-hidden"
                        onMouseUp={handleFocus}
                    >
                        <WindowContent windowId={w.id} />
                    </div>
                </div>
            </Resizable>
        </Draggable>
    );
}

export const Window = memo(WindowBase);

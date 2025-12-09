"use client";

import { MinusIcon, SquareIcon, XIcon } from "lucide-react";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

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
        focusWindow,
        minimizeWindow,
        toggleExpand,
        updatePosition,
    } = useWindowManager();

    const nodeRef = useRef<HTMLDivElement>(null);
    const [dragPos, setDragPos] = useState({
        x: w.position.x,
        y: w.position.y,
    });
    const livePosRef = useRef(dragPos);
    const [isDragging, setIsDragging] = useState(false);

    const onStart = useCallback(() => setIsDragging(true), []);
    const onDrag = useCallback((_e: DraggableEvent, data: DraggableData) => {
        livePosRef.current = { x: data.x, y: data.y };
    }, []);
    const onStop = useCallback(
        (_e: DraggableEvent, data: DraggableData) => {
            const newPos = { x: Math.round(data.x), y: Math.round(data.y) };
            setDragPos(newPos);
            updatePosition(w.id, newPos.x, newPos.y);
            setIsDragging(false);
        },
        [updatePosition, w.id]
    );

    const style = useMemo<React.CSSProperties>(() => {
        const baseStyle: React.CSSProperties = w.isExpanded
            ? {
                  position: "fixed",
                  left: 0,
                  top: 0,
                  width: "100vw",
                  height: "calc(100vh - 48px)",
                  zIndex: w.zIndex,
                  transform: "none",
              }
            : {
                  position: "absolute",
                  width: w.size.width,
                  height: w.size.height,
                  zIndex: w.zIndex,
              };

        if (!isDragging) baseStyle.transition = "all 0.3s ease";
        return baseStyle;
    }, [w.isExpanded, w.size.width, w.size.height, w.zIndex, isDragging]);

    const app = getApp(w.appId);
    if (!app || w.isMinimized) return null;

    const { component: WindowContent, title, titlebarIcon } = app;

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".draggable-handle"
            disabled={w.isExpanded}
            position={w.isExpanded ? { x: 0, y: 0 } : dragPos}
            onStart={onStart}
            onDrag={onDrag}
            onStop={onStop}
        >
            <div
                ref={nodeRef}
                style={style}
                className={cn(
                    "flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-xl",
                    w.isFocused && "ring-2 ring-blue-500"
                )}
                onMouseUp={() => focusWindow(w.id)}
            >
                {/* Titlebar */}
                <div className="draggable-handle flex cursor-move items-center justify-between bg-linear-to-r from-blue-500 to-blue-600 px-3 py-2 text-white select-none">
                    <div className="flex items-center gap-2">
                        {titlebarIcon && <span>{titlebarIcon}</span>}
                        <span className="text-sm font-semibold">{title}</span>
                    </div>

                    <div className="flex gap-1">
                        <Button
                            onMouseUp={(e) => {
                                e.stopPropagation();
                                minimizeWindow(w.id);
                            }}
                            variant="ghost"
                            className="size-6 rounded bg-white/20"
                        >
                            <MinusIcon className="size-3 stroke-3" />
                        </Button>

                        <Button
                            onMouseUp={(e) => {
                                e.stopPropagation();
                                toggleExpand(w.id);
                            }}
                            variant="ghost"
                            className="size-6 rounded bg-white/20"
                        >
                            <SquareIcon className="size-2.5 stroke-3" />
                        </Button>

                        <Button
                            onMouseUp={(e) => {
                                e.stopPropagation();
                                closeWindow(w.id);
                            }}
                            variant="destructive"
                            className="size-6 rounded bg-red-600"
                        >
                            <XIcon className="size-3 stroke-3" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-auto bg-gray-50 p-4">
                    <WindowContent
                        windowId={w.id}
                        onClose={() => closeWindow(w.id)}
                    />
                </div>
            </div>
        </Draggable>
    );
}

export const Window = memo(WindowBase);

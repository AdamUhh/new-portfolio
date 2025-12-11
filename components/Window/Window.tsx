"use client";

import {
    mdiWindowMaximize,
    mdiWindowMinimize,
    mdiWindowRestore,
} from "@mdi/js";
import Icon from "@mdi/react";
import { XIcon } from "lucide-react";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

import { Button } from "@/shadcn/button";

import { getApp } from "@/lib/registry";
import { WindowMetadata } from "@/lib/types";
import { cn } from "@/lib/utils";

import { useWindowManager } from "@/context/window";

// Custom styles for resize handles
const resizeHandleStyles = `
.react-resizable {
  position: relative;
}
.react-resizable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
}
.react-resizable-handle-sw {
  bottom: 0;
  left: 0;
  cursor: sw-resize;
}
.react-resizable-handle-se {
  bottom: 0;
  right: 0;
  cursor: se-resize;
}
.react-resizable-handle-nw {
  top: 0;
  left: 0;
  cursor: nw-resize;
}
.react-resizable-handle-ne {
  top: 0;
  right: 0;
  cursor: nesw-resize;
}
.react-resizable-handle-w,
.react-resizable-handle-e {
  top: 0;
  width: 20px;
  height: 100%;
  cursor: ew-resize;
  transform: rotate(0deg);
}
.react-resizable-handle-w {
  left: 0;
}
.react-resizable-handle-e {
  right: 0;
}
.react-resizable-handle-n,
.react-resizable-handle-s {
  left: 0;
  width: 100%;
  height: 20px;
  cursor: ns-resize;
  transform: rotate(0deg);
}
.react-resizable-handle-n {
  top: 0;
}
.react-resizable-handle-s {
  bottom: 0;
}
.react-resizable-handle:hover {
  background: rgba(59, 130, 246, 0.3);
}
`;

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
        updateSize,
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

    const handleFocus = useCallback(() => {
        if (!w.isFocused) focusWindow(w.id);
    }, [focusWindow, w.id, w.isFocused]);

    const handleResize = useCallback(
        (
            _e: React.SyntheticEvent,
            data: { size: { width: number; height: number } }
        ) => {
            updateSize(w.id, data.size.width, data.size.height);
        },
        [updateSize, w.id]
    );

    const style = useMemo<React.CSSProperties>(() => {
        const baseStyle: React.CSSProperties = w.isExpanded
            ? {
                  position: "fixed",
                  left: 0,
                  top: 0,
                  zIndex: w.zIndex,
                  transform: "none",
              }
            : {
                  position: "absolute",
                  zIndex: w.zIndex,
              };

        if (!isDragging) baseStyle.transition = "transform 0.3s ease";
        return baseStyle;
    }, [w.isExpanded, w.zIndex, isDragging]);

    const app = getApp(w.appId);
    if (!app || w.isMinimized) return null;

    const {
        component: WindowContent,
        title,
        titlebarIcon,
        isTitleMdiIcon,
    } = app;

    const windowContent = (
        <div
            className={cn(
                "relative flex flex-col overflow-hidden bg-white shadow-xl after:pointer-events-none after:absolute after:inset-0 after:bg-black/10",
                w.isFocused && "shadow-black after:bg-transparent",
                !w.isExpanded && "rounded-lg"
            )}
            style={{ width: "100%", height: "100%" }}
        >
            <div className="flex size-full flex-col" onMouseUp={handleFocus}>
                {/* Titlebar */}
                <div className="draggable-handle flex cursor-move items-center justify-between bg-[#252526] px-3 py-2 text-white select-none">
                    <div className="flex items-center gap-2">
                        {titlebarIcon && isTitleMdiIcon ? (
                            <Icon
                                path={titlebarIcon as string}
                                className="size-5"
                            />
                        ) : (
                            titlebarIcon &&
                            React.createElement(titlebarIcon, {
                                className: "size-5",
                            })
                        )}
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
                            <Icon path={mdiWindowMinimize} />
                        </Button>

                        <Button
                            onMouseUp={(e) => {
                                e.stopPropagation();
                                toggleExpand(w.id);
                            }}
                            variant="ghost"
                            className="size-6 rounded bg-white/20"
                        >
                            {w.isExpanded ? (
                                <Icon path={mdiWindowRestore} />
                            ) : (
                                <Icon path={mdiWindowMaximize} />
                            )}
                        </Button>

                        <Button
                            onMouseUp={(e) => {
                                e.stopPropagation();
                                closeWindow(w.id);
                            }}
                            variant="destructive"
                            className="size-6 rounded bg-red-600"
                        >
                            <XIcon className="size-4 stroke-[3.5]" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-auto bg-gray-50">
                    <WindowContent windowId={w.id} />
                </div>
            </div>
        </div>
    );

    if (w.isExpanded) {
        return (
            <div style={style}>
                <div style={{ width: "100vw", height: "calc(100vh - 44px)" }}>
                    {windowContent}
                </div>
            </div>
        );
    }

    return (
        <>
            <style>{resizeHandleStyles}</style>
            <Draggable
                nodeRef={nodeRef}
                handle=".draggable-handle"
                position={dragPos}
                onStart={onStart}
                onDrag={onDrag}
                onStop={onStop}
            >
                <div ref={nodeRef} style={style}>
                    <ResizableBox
                        width={w.size.width}
                        height={w.size.height}
                        onResize={handleResize}
                        minConstraints={[300, 200]}
                        resizeHandles={[
                            "se",
                            "sw",
                            "ne",
                            "nw",
                            "s",
                            "e",
                            "w",
                            "n",
                        ]}
                    >
                        {windowContent}
                    </ResizableBox>
                </div>
            </Draggable>
        </>
    );
}

export const Window = memo(WindowBase);

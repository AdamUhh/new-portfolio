"use client";

import { useWindowManager } from "@/context/window";

import { Window } from "./Window";

export function WindowContainer() {
    const { windows } = useWindowManager();

    return (
        <div className="pointer-events-none fixed inset-0">
            <div className="pointer-events-none relative h-full w-full">
                <div className="pointer-events-auto">
                    {windows.map((win) => (
                        <Window key={win.id} window={win} />
                    ))}
                </div>
            </div>
        </div>
    );
}

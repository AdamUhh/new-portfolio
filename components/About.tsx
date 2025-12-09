"use client";
import { useState } from "react";

import { WindowProps } from "@/lib/types";

export function HomeWindow({ windowId, onClose }: WindowProps) {
    return (
        <div>
            <h1 className="mb-4 text-2xl font-bold">Welcome Home</h1>
            <p className="text-gray-700">
                This is the home window. Window ID: {windowId}
            </p>
            <button
                onMouseUp={onClose}
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
                Close Window
            </button>
        </div>
    );
}

export function AboutWindow({ windowId }: WindowProps) {
    return (
        <div>
            <h1 className="mb-4 text-2xl font-bold">About</h1>
            <p className="mb-2 text-gray-700">
                This is a Windows-style multi-window interface.
            </p>
            <p className="mb-2 text-gray-700">
                Built with Next.js and TypeScript.
            </p>
            <ul className="list-inside list-disc space-y-1 text-gray-600">
                <li>Drag windows to move them</li>
                <li>Minimize, maximize, and close windows</li>
                <li>Click taskbar items to restore windows</li>
                <li>URL syncs with open windows</li>
            </ul>
        </div>
    );
}

export function SettingsWindow({ windowId }: WindowProps) {
    const [theme, setTheme] = useState("light");

    return (
        <div>
            <h1 className="mb-4 text-2xl font-bold">Settings</h1>

            <div className="space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Theme
                    </label>
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Language
                    </label>
                    <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

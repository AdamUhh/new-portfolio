"use client";

import { useState } from "react";

import { WindowProps } from "@/lib/types";

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

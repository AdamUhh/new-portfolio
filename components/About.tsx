import React from "react";

import { WindowComponentProps } from "@/lib/types";

export default function AboutApp({
    windowId,
    onClose,
    onMinimize,
}: WindowComponentProps) {
    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">About This App</h1>
            <p className="mb-4 text-gray-700">
                This is a Windows-style desktop interface built with Next.js and
                React.
            </p>
            <p className="text-sm text-gray-500">Window ID: {windowId}</p>

            <div className="mt-6 space-x-2">
                <button
                    onClick={onMinimize}
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    Minimize
                </button>
                <button
                    onClick={onClose}
                    className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

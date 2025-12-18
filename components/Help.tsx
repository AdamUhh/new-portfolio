"use client";

import { useEffect, useState } from "react";

import { WindowProps } from "@/lib/type-window";

import { useWindowManager } from "@/context/window";

export function NeedHelpWindow({ windowId }: WindowProps) {
    const [opacity, setOpacity] = useState(1);
    const [scale, setScale] = useState(1);
    const [countdown, setCountdown] = useState(3);
    const { closeWindow } = useWindowManager();

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountdown((prev) => Math.max(0, prev - 1));
        }, 1000);

        const fadeTimer = setTimeout(() => {
            setOpacity(0);
            setScale(0.95);
        }, 2500);

        const closeTimer = setTimeout(() => {
            closeWindow(windowId);
        }, 3500);

        return () => {
            clearInterval(countdownInterval);
            clearTimeout(fadeTimer);
            clearTimeout(closeTimer);
        };
    }, [windowId, closeWindow]);

    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#1a1a1a] p-8 text-white/95">
            {/* Subtle layered background circles */}
            <div className="animate-pulse-slow absolute top-1/4 left-1/3 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl"></div>
            <div className="animate-pulse-slow absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"></div>

            <div
                className="relative max-w-md text-center transition-all duration-1000 ease-out"
                style={{ opacity, transform: `scale(${scale})` }}
            >
                <p className="mb-1 text-xl font-semibold text-accent/70">
                    Have you tried…
                </p>
                <p className="text-3xl leading-snug font-bold text-white">
                    Talking to someone who gets paid to listen?
                </p>
                <p className="mt-2 text-sm text-accent/70 italic">
                    (Also known as a Therapist)
                </p>

                {/* subtle underline highlight */}
                <div className="animate-pulse-slow bg-accent-400 mx-auto mt-3 h-1 w-16 rounded-full"></div>

                <p className="mt-6 font-mono text-xs text-accent/30">
                    Closing in {countdown}s
                </p>
            </div>
        </div>
    );
}

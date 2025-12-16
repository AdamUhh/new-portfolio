"use client";

import { useEffect, useState } from "react";

import { WindowProps } from "@/lib/types";

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
        <div className="flex h-full w-full items-center justify-center bg-[#191919] p-8 text-white/95">
            <div
                className="text-center transition-all duration-1000 ease-out"
                style={{
                    opacity,
                    transform: `scale(${scale})`,
                }}
            >
                <p className="mb-2 text-3xl font-semibold">🤔</p>
                <p className="text-lg font-medium">Have you tried</p>
                <p className="text-2xl font-bold">
                    Talking to someone who gets paid to listen?
                </p>
                <p className="mt-2 text-sm italic">
                    (Therapy. I&apos;m talking about therapy.)
                </p>
                <p className="mt-4 text-sm">Closing in {countdown}s</p>
            </div>
        </div>
    );
}

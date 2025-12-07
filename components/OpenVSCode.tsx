"use client";

import {
    mdiBadgeAccount,
    mdiConsole,
    mdiEmailEdit,
    mdiGithub,
    mdiHumanGreeting,
    mdiLoading,
} from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getAppByRoute, getAppDefinition } from "@/lib/registry";

import { useWindowManager } from "./Window/windowManager";
import { VSCodeIcon } from "./svg/vscode";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function VSCodeLoading() {
    return (
        <div className="fixed top-1/2 left-1/2 z-10 flex min-h-[250px] min-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center space-y-10 rounded bg-[#2F2F2F] shadow-md">
            <VSCodeIcon className="size-24" />
            <div className="flex items-center justify-center gap-4 text-background">
                <span>Loading</span>
                <Icon
                    path={mdiLoading}
                    size={1}
                    color={"#fff"}
                    className="animate-spin"
                />
            </div>
        </div>
    );
}

export function TaskbarVSCode() {
    const { handleAppClick } = useWindowManager();

    const VSCodeApp = getAppDefinition("about");

    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className="relative mx-auto h-auto w-fit rounded-none bg-accent p-2 after:absolute after:bottom-0 after:h-[3px] after:w-full after:content-normal after:bg-blue-600 hover:bg-accent/70"
                        variant="ghost"
                        onMouseUp={() => handleAppClick(VSCodeApp.id)}
                    >
                        <VSCodeIcon className="size-7" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="dark">
                    <p>Open Portfolio</p>
                </TooltipContent>
            </Tooltip>
        </>
    );
}

export function DesktopItems() {
    const [isVSCodeOpen, setIsVSCodeOpen] = useState(false);

    const pathname = usePathname();
    const { openWindow, windows } = useWindowManager();

    // Sync URL to window state
    useEffect(() => {
        if (pathname === "/") return;

        const app = getAppByRoute(pathname);
        if (app) {
            // Check if window is already open
            const existingWindow = windows.find(
                (w) => w.appId === app.id && w.isOpen
            );
            if (!existingWindow) {
                openWindow(app.id);
            }
        }
    }, [pathname, openWindow, windows]);

    const handleVSCodeClick = () => {
        setIsVSCodeOpen(true);
    };

    return (
        <div className="flex flex-col gap-3">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className="aspect-square h-24 flex-col rounded text-background hover:bg-accent/70"
                        variant="ghost"
                        onMouseUp={handleVSCodeClick}
                        asChild
                    >
                        <Link href={"/about"}>
                            <VSCodeIcon className="size-8" />
                            Portfolio
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="dark">
                    <p>Browse my projects and featured work.</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className="aspect-square h-24 flex-col rounded text-background hover:bg-accent/70"
                        variant="ghost"
                        asChild
                    >
                        <Link href="https://github.com/AdamUhh" target="_blank">
                            <Icon path={mdiGithub} className="size-10" />
                            GitHub
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="dark">
                    <p>Check out my repos and code activity.</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className="aspect-square h-24 flex-col rounded text-background hover:bg-accent/70"
                        variant="ghost"
                    >
                        <Icon path={mdiConsole} className="size-10" />
                        Terminal
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="dark">
                    <p>Explore a terminal-styled version of my portfolio.</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className="aspect-square h-24 flex-col rounded text-background hover:bg-accent/70"
                        variant="ghost"
                        asChild
                    >
                        <Link href="https://cv.adamuhh.dev" target="_blank">
                            <Icon path={mdiBadgeAccount} className="size-10" />
                            CV
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="dark">
                    <p>View my CV.</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className="aspect-square h-24 flex-col rounded text-background hover:bg-accent/70"
                        variant="ghost"
                        onMouseUp={handleVSCodeClick}
                        asChild
                    >
                        <Link href={"/contact"}>
                            <Icon path={mdiEmailEdit} className="size-10" />
                            Contact
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="dark">
                    <p>Want to reach me?</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className="aspect-square h-24 flex-col rounded text-background hover:bg-accent/70"
                        variant="ghost"
                    >
                        <Icon path={mdiHumanGreeting} className="size-10" />
                        Need Help?
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="dark">
                    <p>Confused as to where to go?</p>
                </TooltipContent>
            </Tooltip>

            {isVSCodeOpen && <VSCodeLoading />}
        </div>
    );
}

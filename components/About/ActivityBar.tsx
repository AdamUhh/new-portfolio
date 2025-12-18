"use client";

import {
    mdiBadgeAccount,
    mdiConsole,
    mdiDevTo,
    mdiEmailEdit,
    mdiGithub,
    mdiHome,
    mdiInformationOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";

import { Button } from "@/shadcn/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/tooltip";

import { APP_REGISTRY_NAMES } from "@/lib/constants-registry";

import { useWindowManager } from "@/context/window";

export function ActivityBar({ winId }: { winId: string }) {
    const { openWindow, closeWindow } = useWindowManager();

    return (
        <div className="flex w-12 flex-col justify-between bg-[#333333]">
            <div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative size-12 rounded-xs hover:bg-accent/10"
                            onPointerUp={(e) => {
                                e.stopPropagation();
                                closeWindow(winId);
                            }}
                        >
                            <Icon
                                className="size-6.5 text-accent/70"
                                path={mdiHome}
                            />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="dark" side="right">
                        Go to Desktop
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative size-12 rounded-xs after:absolute after:inset-0 after:content-center after:border-l-2 after:border-l-white hover:bg-accent/10"
                        >
                            <Icon
                                className="size-6.5 text-white"
                                path={mdiInformationOutline}
                            />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="dark" side="right">
                        Go to About (you&apos;re here)
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative size-12 rounded-xs hover:bg-accent/10"
                            onPointerUp={(e) => {
                                e.stopPropagation();
                                openWindow(APP_REGISTRY_NAMES.projects);
                            }}
                        >
                            <Icon
                                className="size-6.5 text-accent/70"
                                path={mdiDevTo}
                            />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="dark" side="right">
                        Check out my projects
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative size-12 rounded-xs hover:bg-accent/10"
                            onPointerUp={(e) => {
                                e.stopPropagation();
                                openWindow(APP_REGISTRY_NAMES.contact);
                            }}
                        >
                            <Icon
                                className="size-6.5 text-accent/70"
                                path={mdiEmailEdit}
                            />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="dark" side="right">
                        Want to contact me?
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative size-12 rounded-xs hover:bg-accent/10"
                            asChild
                        >
                            <Link
                                href={"https://cv.adamUhh.dev"}
                                target="_blank"
                            >
                                <Icon
                                    className="size-6.5 text-accent/70"
                                    path={mdiBadgeAccount}
                                />
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="dark" side="right">
                        View my CV
                    </TooltipContent>
                </Tooltip>
            </div>
            <div>
                <Button
                    variant="ghost"
                    className="relative size-12 rounded-xs hover:bg-accent/10"
                    onPointerUp={(e) => {
                        e.stopPropagation();
                        openWindow(APP_REGISTRY_NAMES.terminal);
                    }}
                >
                    <Icon path={mdiConsole} className="size-6.5 text-white" />
                </Button>
                <Button
                    variant="ghost"
                    className="relative size-12 rounded-xs hover:bg-accent/10"
                    asChild
                >
                    <Link href={"https://github.com/AdamUhh"} target="_blank">
                        <Icon
                            className="size-6.5 text-white"
                            path={mdiGithub}
                        />
                    </Link>
                </Button>
            </div>
        </div>
    );
}

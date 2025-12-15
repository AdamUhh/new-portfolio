"use client";

import {
    mdiBattery90,
    mdiChevronUp,
    mdiMicrosoft,
    mdiVolumeHigh,
} from "@mdi/js";
import Icon from "@mdi/react";
import { WifiIcon } from "lucide-react";

import { Button } from "@/shadcn/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/tooltip";

import { Clock } from "@/components/Clock";
import { VSCodeIcon } from "@/components/svg/vscode";

import { getApp } from "@/lib/registry";
import { APP_REGISTRY_NAMES } from "@/lib/registry-constants";
import { WindowMetadata } from "@/lib/types";
import { cn } from "@/lib/utils";

import { useWindowManager } from "@/context/window";

function TaskbarVSCode({ win }: { win: WindowMetadata | undefined }) {
    const { openWindow, toggleWindow } = useWindowManager();

    const handleWindow = () => {
        if (!win) openWindow(APP_REGISTRY_NAMES.about);
        else toggleWindow(win.id);
    };

    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className={cn(
                            "relative mx-auto h-auto w-fit rounded-none p-2 transition-none after:absolute after:bottom-0 after:h-[3px] after:w-full after:content-normal after:bg-transparent hover:bg-accent/70",
                            win?.isFocused ? "bg-accent after:bg-blue-600" : ""
                        )}
                        variant="ghost"
                        onMouseUp={handleWindow}
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

function TaskbarItem({ win }: { win: WindowMetadata }) {
    const { toggleWindow } = useWindowManager();

    const app = getApp(win.appId);

    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className={cn(
                            "relative mx-auto h-auto w-fit rounded-none p-2 transition-none after:absolute after:bottom-0 after:h-[3px] after:w-full after:content-normal after:bg-transparent hover:bg-accent/70",
                            win.isFocused ? "bg-accent after:bg-blue-600" : ""
                        )}
                        variant="ghost"
                        onMouseUp={() => toggleWindow(win.id)}
                    >
                        {app?.appIcon ? (
                            app.isAppMdiIcon ? (
                                <Icon
                                    path={app.appIcon as string}
                                    className="size-7"
                                />
                            ) : (
                                <app.appIcon className="size-7" />
                            )
                        ) : (
                            <VSCodeIcon className="size-7" />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="dark">
                    <p>{app.title}</p>
                </TooltipContent>
            </Tooltip>
        </>
    );
}

export function Taskbar() {
    const { windows } = useWindowManager();

    const aboutWindow = windows.filter(
        (w) => w.appId === APP_REGISTRY_NAMES.about
    )?.[0];

    const openWindows = windows.filter(
        (w) => w.appId !== APP_REGISTRY_NAMES.about
    );

    return (
        <footer className="fixed bottom-0 left-0 grid h-11 w-screen grid-cols-3 bg-gray-400">
            <div className="not-tablet:hidden" />
            <ul className="mx-auto flex h-full w-fit flex-nowrap items-center justify-center gap-1">
                <Icon path={mdiMicrosoft} className="size-9" />
                <TaskbarVSCode win={aboutWindow} />
                {openWindows.map((win) => (
                    <TaskbarItem key={win.id} win={win} />
                ))}
            </ul>
            <ul className="my-auto ml-auto grid h-fit grid-cols-[1fr_1fr_1fr_1fr_100px] items-center gap-4">
                <Icon path={mdiChevronUp} className="size-4" />
                <Icon path={mdiBattery90} className="size-4 rotate-90" />
                <button title="Wifi">
                    <WifiIcon className="size-4" />
                </button>
                <Icon path={mdiVolumeHigh} className="size-4" />
                <Clock className="pr-4 text-center text-xs" hideSeconds />
            </ul>
        </footer>
    );
}
//

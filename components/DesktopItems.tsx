"use client";

import {
    mdiBadgeAccount,
    mdiBriefcase,
    mdiCog,
    mdiConsole,
    mdiEmailEdit,
    mdiGithub,
    mdiHumanGreeting,
} from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";

import { APP_REGISTRY_NAMES } from "@/lib/registry-constants";

import { useWindowManager } from "@/context/window";

import { VSCodeIcon } from "./svg/vscode";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

// function VSCodeLoading() {
//     return (
//         <div className="fixed top-1/2 left-1/2 z-10 flex min-h-[250px] min-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center space-y-10 rounded bg-[#2F2F2F] shadow-md">
//             <VSCodeIcon className="size-24" />
//             <div className="flex items-center justify-center gap-4 text-background">
//                 <span>Loading</span>
//                 <Icon
//                     path={mdiLoading}
//                     size={1}
//                     color={"#fff"}
//                     className="animate-spin"
//                 />
//             </div>
//         </div>
//     );
// }

export function DesktopItems() {
    const { openWindow } = useWindowManager();

    return (
        <div className="flex max-h-[calc(100vh-44px)] w-fit flex-col flex-wrap gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className="aspect-square h-24 flex-col rounded text-background hover:bg-accent/70"
                        variant="ghost"
                        onMouseUp={() => openWindow(APP_REGISTRY_NAMES.about)}
                    >
                        <VSCodeIcon className="size-8" />
                        About me
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="dark">
                    <p>Browse about me and my skills</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className="aspect-square h-24 flex-col rounded text-background hover:bg-accent/70"
                        variant="ghost"
                        onMouseUp={() =>
                            openWindow(APP_REGISTRY_NAMES.projects)
                        }
                    >
                        <Icon path={mdiBriefcase} className="size-10" />
                        Projects
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
                        onMouseUp={() =>
                            openWindow(APP_REGISTRY_NAMES.terminal)
                        }
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
                        onMouseUp={() => openWindow(APP_REGISTRY_NAMES.contact)}
                    >
                        <Icon path={mdiEmailEdit} className="size-10" />
                        Contact
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
                        onMouseUp={() =>
                            openWindow(APP_REGISTRY_NAMES.settings)
                        }
                    >
                        <Icon path={mdiCog} className="size-10" />
                        Settings
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="dark">
                    <p>Open Settings</p>
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
        </div>
    );
}

"use client";

import {
    mdiBattery90,
    mdiChevronUp,
    mdiMicrosoft,
    mdiVolumeHigh,
} from "@mdi/js";
import Icon from "@mdi/react";
import { WifiIcon } from "lucide-react";

import { Clock } from "@/components/Clock";
import { TaskbarVSCode } from "@/components/OpenVSCode";

export function Taskbar() {
    return (
        <footer className="fixed bottom-0 left-0 grid h-11 w-screen grid-cols-3 bg-gray-400">
            <div className="not-tablet:hidden" />
            <ul className="grid h-full w-full grid-cols-[60px_60px] items-center justify-center">
                <Icon path={mdiMicrosoft} className="mx-auto size-9" />
                <TaskbarVSCode />
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

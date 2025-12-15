import {
    mdiAlertOutline,
    mdiBellOutline,
    mdiCloseCircleOutline,
    mdiCodeTags,
    mdiGit,
    mdiHistory,
} from "@mdi/js";
import Icon from "@mdi/react";

import { Clock, TimeOnApp } from "@/components/Clock";

export function StatusBar() {
    return (
        <div className="flex h-5 w-full justify-between bg-[#2b7ccc] text-xs text-white">
            <div className="flex space-x-2.5">
                <div className="flex h-full w-fit items-center bg-[#32815d] px-3">
                    <Icon path={mdiCodeTags} className="size-3.5" />
                </div>
                <div className="flex items-center gap-1">
                    <Icon path={mdiGit} className="size-3.5" />
                    <span>main*</span>
                </div>
                <div className="flex items-center gap-1">
                    <Icon path={mdiCloseCircleOutline} className="size-3.5" />
                    <span>0</span>
                    <Icon path={mdiAlertOutline} className="size-3.5" />
                    <span>0</span>
                </div>
                <div className="flex items-center gap-1">
                    <Icon path={mdiHistory} className="size-3.5" />
                    <TimeOnApp />
                </div>
            </div>

            <div className="flex space-x-2.5 pr-2">
                <div className="flex items-center gap-1">
                    <Clock hideDate />
                </div>
                <div className="flex items-center gap-1">
                    <Icon path={mdiBellOutline} className="size-3.5" />
                </div>
            </div>
        </div>
    );
}

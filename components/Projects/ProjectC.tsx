import { Button } from "@/shadcn/button";

import { ProjectAProps } from "./ClockHub";

export function ProjectC({ onBack }: ProjectAProps) {
    return (
        <div>
            <p>Project B</p>

            <Button onMouseUp={onBack}>Go Back</Button>
        </div>
    );
}

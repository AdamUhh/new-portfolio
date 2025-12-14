import { Button } from "@/shadcn/button";

import { ProjectAProps } from "./ClockHub";

export function ProjectB({ onBack }: ProjectAProps) {
    return (
        <div>
            <p>Project B</p>

            <Button onMouseUp={onBack}>Go Back</Button>
        </div>
    );
}

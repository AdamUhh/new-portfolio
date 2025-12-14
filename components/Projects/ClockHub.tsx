import { Button } from "@/shadcn/button";

import { FallbackImage } from "../FallbackImage";
import { ProjectProps } from "./projects.type";

export function ClockHub({ onBack }: ProjectProps) {
    return (
        <div className="flex size-full flex-col overflow-hidden bg-[#191919] text-accent">
            {/* Content */}
            <div className="flex-1 animate-fade-in-up overflow-y-auto p-8">
                <div className="mx-auto max-w-3xl space-y-8">
                    {/* Title */}
                    <div className="space-y-3">
                        <h1 className="text-5xl font-bold">Clock Hub</h1>
                        <p className="text-lg text-accent/80">
                            A clock app for extra monitors with world clocks,
                            stopwatch, and timer functionality.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://clockhub.netlify.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded bg-[#0a84c8] px-4 py-2 text-sm transition-colors hover:bg-[#0a84c8]/80"
                            >
                                View Live Demo
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Preview Image */}
                    <div className="overflow-hidden rounded-lg border border-[#3e3e42] bg-[#252526]">
                        <FallbackImage
                            src="/image-not-found.webp"
                            alt="Clock Hub Interface"
                            width={0}
                            height={0}
                            className="h-64 w-full object-cover"
                        />
                    </div>

                    {/* Why I Made It */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">
                            Why I Made It
                        </h2>
                        <p className="leading-relaxed text-accent/80">
                            I have a second monitor that usually sits idle, and
                            I wanted to put it to use. Rather than just
                            displaying the desktop, I built Clock Hub to make it
                            actually useful—tracking multiple timezones for
                            remote work or friend timezones, timing productivity
                            sessions, and keeping an eye on the time on the side
                            without cluttering my main workspace.
                        </p>
                    </section>

                    {/* What It Does */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">What It Does</h2>
                        <ul className="space-y-2 text-accent/80">
                            <li className="flex items-center gap-2">
                                <span className="mt-1 text-[#0a84c8]">•</span>
                                <span>
                                    Display multiple world clocks/timezones.
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="mt-1 text-[#0a84c8]">•</span>
                                <span>Stopwatch to track task timings.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="mt-1 text-[#0a84c8]">•</span>
                                <span>
                                    Clean, minimal interface for secondary
                                    displays.
                                </span>
                            </li>
                        </ul>
                    </section>

                    {/* Challenges */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">Challenges</h2>
                        <p className="leading-relaxed text-accent/80">
                            Not really difficult to make, but I suppose the
                            biggest challenge was keeping the clock updates
                            smooth and performant, even working when in
                            hibernation.
                        </p>
                    </section>

                    {/* Tech Stack */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">Tech Stack</h2>
                        <div className="flex flex-wrap gap-2">
                            <span className="rounded border border-[#3e3e42] bg-[#252526] px-3 py-1.5 text-sm">
                                SvelteKit
                            </span>
                            <span className="rounded border border-[#3e3e42] bg-[#252526] px-3 py-1.5 text-sm">
                                TypeScript
                            </span>
                            <span className="rounded border border-[#3e3e42] bg-[#252526] px-3 py-1.5 text-sm">
                                Tailwind CSS
                            </span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

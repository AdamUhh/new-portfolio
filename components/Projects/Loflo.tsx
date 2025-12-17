import { ExternalLinkIcon } from "lucide-react";

import { LOFLO_LINK } from "@/lib/link-constants";

import { FallbackImage } from "../FallbackImage";

export function Loflo() {
    return (
        <div className="flex size-full flex-col overflow-hidden bg-[#191919] text-accent">
            {/* Content */}
            <div className="flex-1 animate-fade-in-up overflow-y-auto p-8">
                <div className="mx-auto max-w-3xl space-y-8">
                    {/* Title */}
                    <div className="space-y-3">
                        <h1 className="text-5xl font-bold">Loflo</h1>
                        <p className="text-lg text-accent/80">
                            A folder-based flashcard app where users can revise
                            through digital flashcards.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href={LOFLO_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded bg-[#0a84c8] px-4 py-2 text-sm transition-colors hover:bg-[#0a84c8]/80"
                            >
                                View Github
                                <ExternalLinkIcon className="size-4" />
                            </a>
                        </div>
                    </div>

                    {/* Preview Image */}
                    <div className="overflow-hidden rounded-lg border border-[#3e3e42] bg-[#252526]">
                        <FallbackImage
                            src="/projects/loflo.gif"
                            alt="Loflo app Interface"
                            width={0}
                            height={0}
                            className="aspect-video w-full object-cover"
                        />
                    </div>

                    {/* Why I Made It */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">
                            Why I Made It
                        </h2>
                        <p className="leading-relaxed text-accent/80">
                            At the time, I wanted to learn about NextJS v14, and
                            thought that building a simple flashcard app would
                            be perfect for learning the framework while still
                            shipping something relatively useful.
                        </p>
                    </section>

                    {/* What It Does */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">What It Does</h2>
                        <ul className="space-y-2 text-accent/80">
                            <li className="flex items-center gap-2">
                                <span className="mt-1 text-[#0a84c8]">•</span>
                                <span>
                                    Organises flashcards into folders for
                                    structured learning.
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="mt-1 text-[#0a84c8]">•</span>
                                <span>
                                    Allows users to create, edit, and review
                                    digital flashcards.
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="mt-1 text-[#0a84c8]">•</span>
                                <span>
                                    Offers filters to quickly find what you
                                    need.
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="mt-1 text-[#0a84c8]">•</span>
                                <span>
                                    Supports accessibility with text-to-speech
                                    functionality.
                                </span>
                            </li>
                        </ul>
                    </section>

                    {/* Challenges */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">Challenges</h2>
                        <p className="leading-relaxed text-accent/80">
                            Styling and theming turned out to be trickier than
                            expected, and after some experimentation, a minimal
                            design felt like the best fit. Still, it felt too
                            bare, and I needed to improve the UX and
                            quality-of-life - I used the app daily and noticed
                            area that could be smoother, adding features like
                            bookmarks, text-to-speech, subfolders, filters, etc.
                            that weren&apos;t part of the original plan.
                        </p>
                    </section>

                    {/* Tech Stack */}
                    {/* <section className="space-y-3"> */}
                    {/*     <h2 className="text-2xl font-semibold">Tech Stack</h2> */}
                    {/*     <div className="flex flex-wrap gap-2"> */}
                    {/*         <span className="rounded border border-[#3e3e42] bg-[#252526] px-3 py-1.5 text-sm"> */}
                    {/*             SvelteKit */}
                    {/*         </span> */}
                    {/*         <span className="rounded border border-[#3e3e42] bg-[#252526] px-3 py-1.5 text-sm"> */}
                    {/*             TypeScript */}
                    {/*         </span> */}
                    {/*         <span className="rounded border border-[#3e3e42] bg-[#252526] px-3 py-1.5 text-sm"> */}
                    {/*             Tailwind CSS */}
                    {/*         </span> */}
                    {/*     </div> */}
                    {/* </section> */}
                </div>
            </div>
        </div>
    );
}

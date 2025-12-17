import { ExternalLinkIcon } from "lucide-react";

import { HEADLESS_DASHBOARD_LINK } from "@/lib/link-constants";

import { FallbackImage } from "../FallbackImage";

export function HeadlessDashboard() {
    return (
        <div className="flex size-full flex-col overflow-hidden bg-[#191919] text-accent">
            {/* Content */}
            <div className="flex-1 animate-fade-in-up overflow-y-auto p-8">
                <div className="mx-auto max-w-3xl space-y-8">
                    {/* Title */}
                    <div className="space-y-3">
                        <h1 className="text-5xl font-bold">
                            Headless CMS Dashboard
                        </h1>
                        <p className="text-lg text-accent/80">
                            A headless e-commerce dashboard that replicates core
                            features of Shopify.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href={HEADLESS_DASHBOARD_LINK}
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
                        <video
                            width="0"
                            height="0"
                            className="aspect-video w-full object-cover"
                            controls
                            preload="none"
                        >
                            <source
                                src="/projects/headless-dashboard.mp4"
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                        <p className="p-1 text-sm text-accent/80">
                            Please view the github for more videos.
                        </p>
                    </div>

                    {/* Why I Made It */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">
                            Why I Made It
                        </h2>
                        <p className="leading-relaxed text-accent/80">
                            This was my second time building a dashboard,
                            designed as a headless CMS to manage content and
                            data independently of the frontend. Even as a work
                            project, I learned a lot about structuring code,
                            optimizing data efficiently, and ensuring security.
                        </p>
                        <p className="leading-relaxed text-accent/80">
                            Since its a headless dashboard, I also built a
                            storefront. Any changes (to products/blogs) from the
                            dashboard are reflected in the storefront.
                        </p>
                    </section>

                    {/* What It Does */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">What It Does</h2>
                        <ul className="space-y-2 text-accent/80">
                            <li className="flex items-center gap-2">
                                <span className="mt-1 text-[#0a84c8]">•</span>
                                <span>
                                    Manage collections, models, brands, and
                                    tags.
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="mt-1 text-[#0a84c8]">•</span>
                                <span>
                                    Create, edit, and duplicate products with
                                    ease.
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="mt-1 text-[#0a84c8]">•</span>
                                <span>
                                    Filter and update inventory quickly,
                                    including bulk edits for efficiency.
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="mt-1 text-[#0a84c8]">•</span>
                                <span>
                                    Manage blog content with flexible draft and
                                    publishing workflows.
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="mt-1 text-[#0a84c8]">•</span>
                                <span>
                                    Automatically applies content-aware cropping
                                    to uploaded media, ensuring products are
                                    always displayed clearly and attractively,
                                    without extra whitespace.
                                </span>
                            </li>
                        </ul>
                    </section>

                    {/* Challenges */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">Challenges</h2>
                        <p className="leading-relaxed text-accent/80">
                            Building this dashboard came with a lot of learning
                            opportunities/challenges. I implemented caching to
                            prevent API and database overload, and added
                            content-aware cropping for image uploads, which made
                            for an interesting and enjoyable problem to figure
                            out and solve.
                        </p>
                        <p className="leading-relaxed text-accent/80">
                            Structuring everything cleanly in NextJS without
                            creating messy code was another key focus.
                            Validation schemas we&apos;re suprisingly difficult
                            to implement cleanly. I had to redo validation
                            multiple times until I finally found a structure to
                            follow, creating multiple schemas for client or
                            server as required; this helped me better understand
                            data handling and architecture.
                        </p>
                        <p className="leading-relaxed text-accent/80">
                            Next came the UX and quality-of-life improvements. I
                            focused on making the workflow smooth, from creating
                            collections, models, brands, and tags, to creating
                            and editing products. Inventory needed filters,
                            quick ways to edit quantities, and other handy
                            features I added along the way.
                        </p>
                        <p className="leading-relaxed text-accent/80">
                            When it came to blogs, I took a step back to map out
                            how drafts, published posts, and unpublished drafts
                            would work together, especially since I wanted the
                            flexibility to save both a draft and a published
                            version simultaneously. Additionally, I used TipTap
                            as my Markdown, and the base
                        </p>
                    </section>

                    {/* Optimizations */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">
                            Optimizations
                        </h2>
                        <p className="leading-relaxed text-accent/80">
                            One of the more interesting optimizations I worked
                            on was indexing. I hadn’t done much of this before,
                            so I seeded the database, measured query times, and
                            iterated until I found efficient SQL and indexes.
                        </p>

                        <p className="leading-relaxed text-accent/80">
                            As I mentioned previously, I also cached all API
                            calls for collections, brands, models, and tags.
                            Without caching, every product creation or edit
                            would trigger multiple requests, so this made a huge
                            difference.
                        </p>

                        <p className="leading-relaxed text-accent/80">
                            To reduce server load, I optimized forms on the
                            client side so only changed data is sent. This
                            significantly cut down the amount of data sent.
                        </p>

                        <p className="leading-relaxed text-accent/80">
                            The same approach applied to images: instead of
                            deleting and uploading new ones, I simply updated
                            the S3 ID, and refreshed the CloudFront CDN.
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

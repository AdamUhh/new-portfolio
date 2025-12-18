import { ClockHub } from "./ClockHub";
import { HeadlessDashboard } from "./HeadlessDashboard";
import { Loflo } from "./Loflo";
import { ProjectProps } from "./projects.type";

export enum TagType {
    SideProject = "Side Project",
    Work = "Work",
    SvelteKit = "SvelteKit",
    NextJS = "NextJS",
    Typescript = "Typescript",
    AWS = "AWS",
    DrizzleORM = "DrizzleOrm",
    TursoDB = "TursoDB",
    CockroachDB = "CockroachDB",
}

interface TagConfig {
    bgColor: string;
    color?: string;
}

export const tagConfigs: Record<TagType, TagConfig> = {
    [TagType.SideProject]: { bgColor: "#4f83cc" },
    [TagType.Work]: { bgColor: "#f07167", color: "#000000" },
    [TagType.SvelteKit]: { bgColor: "#ff3e00" },
    [TagType.NextJS]: { bgColor: "#000000" },
    [TagType.Typescript]: { bgColor: "#3178c6" },
    [TagType.AWS]: { bgColor: "#ff9900", color: "#000000" },
    [TagType.DrizzleORM]: { bgColor: "#c6f754", color: "#000000" },
    [TagType.TursoDB]: { bgColor: "#4ff8d2", color: "#000000" },
    [TagType.CockroachDB]: { bgColor: "#6933ff" },
};

// Updated projectsData structure
export const projectsData: Record<
    string,
    {
        title: string;
        description: string;
        imageSrc: string;
        tags: TagType[];
        component: React.ComponentType<ProjectProps>;
        rawText: string;
    }
> = {
    "headless-dashboard": {
        title: "Headless Dashboard",
        description:
            "A headless e-commerce dashboard that replicates core features of Shopify.",
        imageSrc: "/projects/headless-dashboard.gif",
        tags: [
            TagType.Work,
            TagType.NextJS,
            TagType.Typescript,
            TagType.AWS,
            TagType.DrizzleORM,
            TagType.CockroachDB,
        ],
        component: HeadlessDashboard,
        rawText: `Headless CMS Dashboard

A headless e-commerce dashboard that replicates core features of Shopify.

> Why I Made It
This was my second time building a dashboard, designed as a headless CMS to manage content and data independently of the frontend. Even as a work project, I learned a lot about structuring code, optimizing data efficiently, and ensuring security.

Since its a headless dashboard, I also built a storefront. Any changes (to products/blogs) from the dashboard are reflected in the storefront.

> What It Does
  • Manage collections, models, brands, and tags.
  • Create, edit, and duplicate products with ease.
  • Filter and update inventory quickly, including bulk edits for efficiency.
  • Manage blog content with flexible draft and publishing workflows.
    • Automatically applies content-aware cropping to uploaded media, ensuring products are always displayed clearly and attractively, without extra whitespace.

> Challenges
Building this dashboard came with a lot of learning opportunities/challenges. I implemented caching to prevent API and database overload, and added content-aware cropping for image uploads, which made for an interesting and enjoyable problem to figure out and solve.

Structuring everything cleanly in NextJS without creating messy code was another key focus. Validation schemas were suprisingly difficult to implement cleanly. I had to redo validation multiple times until I finally found a structure to follow, creating multiple schemas for client or server as required; this helped me better understand data handling and architecture.

Next came the UX and quality-of-life improvements. I focused on making the workflow smooth, from creating collections, models, brands, and tags, to creating and editing products. The inventory needed filters, quick ways to edit quantities, and other handy features I added along the way.

When it came to blogs, I took a step back to map out how drafts, published posts, and unpublished drafts would work together, especially since I wanted the flexibility to save both a draft and a published version simultaneously. Additionally, I used TipTap as my Markdown, and the base.

> Optimizations
One of the more interesting optimizations I worked on was indexing. I hadn’t done much of this before, so I seeded the database, measured query times, and iterated until I figured out and wrote efficient SQL and indexes.

As I mentioned previously, I also cached all API calls for collections, brands, models, and tags. Without caching, every product creation or edit would trigger multiple requests, so this made a huge difference.

To reduce server load, I optimized forms on the client side so only changed data is sent. This significantly cut down the amount of data sent.

The same approach applied to images: instead of deleting and uploading new ones, I simply updated the S3 ID, and refreshed the CloudFront CDN.

> Tech Stack
NextJS, TypeScript, AWS, Drizzle ORM, Cockroach DB
`,
    },
    loflo: {
        title: "LoFlo",
        description:
            "A folder-like flashcard app where users can revise through digital flashcards.",
        imageSrc: "/projects/loflo.gif",
        tags: [
            TagType.SideProject,
            TagType.NextJS,
            TagType.Typescript,
            TagType.DrizzleORM,
            TagType.TursoDB,
        ],
        component: Loflo,
        rawText: `Loflo

A folder-based flashcard app where users can revise through digital flashcards.

> Why I Made It
At the time, I wanted to learn about NextJS v14, and thought that building a simple flashcard app would be perfect for learning the framework while still shipping something relatively useful.

> What It Does
  • Organises flashcards into folders for structured learning.
  • Allows users to create, edit, and review digital flashcards.
  • Offers filters to quickly find what you need.
  • Supports accessibility with text-to-speech functionality.

> Challenges
Styling and theming turned out to be trickier than expected, and after some experimentation, a minimal design felt like the best fit. Still, it felt too bare, and I needed to improve the UX and quality-of-life - I used the app daily and noticed area that could be smoother, adding features like bookmarks, text-to-speech, subfolders, filters, etc. that weren't part of the original plan.

> Tech Stack
NextJS, TypeScript, Drizzle ORM, Turso DB
`,
    },
    "clock-hub": {
        title: "Clock Hub",
        description:
            "A clock app meant for extra monitors, equipped with a stopwatch and international clocks.",
        imageSrc: "/projects/clock-hub.gif",
        tags: [TagType.SideProject, TagType.SvelteKit],
        component: ClockHub,
        rawText: `Clock Hub

A clock app for extra monitors with world clocks, stopwatch, and timer functionality.

> Why I Made It
I have a second monitor that usually sits idle, and I wanted to put it to use. Rather than just displaying the desktop, I built Clock Hub to make it actually useful. I use it to track different timezones, remote work or friends, timing productivity sessions, and keeping an eye on the time on the side without cluttering my main workspace.

> What It Does
  • Display multiple world clocks/timezones.
  • Stopwatch to track task timings.
  • Clean, minimal interface for secondary displays.

> Challenges
Not really difficult to make, but I suppose the biggest challenge was keeping the clock updates smooth and performant, even working when in hibernation.

> Tech Stack
SvelteKit
`,
    },
} as const;

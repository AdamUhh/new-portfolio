"use client";

import {
    mdiAlertOutline,
    mdiBadgeAccount,
    mdiBellOutline,
    mdiClose,
    mdiCloseCircleOutline,
    mdiCodeTags,
    mdiConsole,
    mdiDevTo,
    mdiDotsHorizontal,
    mdiEmailEdit,
    mdiFileMultipleOutline,
    mdiFolderOpen,
    mdiGit,
    mdiGithub,
    mdiHistory,
    mdiInformationOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
    CSSProperties,
    ComponentProps,
    Dispatch,
    SetStateAction,
    useState,
} from "react";

import { Button } from "@/shadcn/button";
import { Separator } from "@/shadcn/separator";
import { SidebarInset, SidebarProvider } from "@/shadcn/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/tooltip";

import { Clock, TimeOnApp } from "@/components/Clock";
import { FallbackImage } from "@/components/FallbackImage";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
} from "@/components/ui/sidebar";

import { calculateAgeParts } from "@/lib/calculate-age";
import { getColorFromFileExt, getIconFromFileExt } from "@/lib/icon-utils";
import { APP_REGISTRY_NAMES } from "@/lib/registry-constants";
import { WindowProps } from "@/lib/types";
import { cn } from "@/lib/utils";

import { useWindowManager } from "@/context/window";

import { TriggerFlappyBird } from "../FlappyBird";
import { Skill, skillDict, skillList } from "./skills";

function ActivityBar({ winId }: { winId: string }) {
    const { openWindow, closeWindow } = useWindowManager();

    return (
        <div className="flex w-12 flex-col justify-between bg-[#333333]">
            <div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative size-12 rounded-xs hover:bg-accent/10"
                            onMouseUp={() => closeWindow(winId)}
                        >
                            <Icon
                                className="size-6.5 text-accent/70"
                                path={mdiFileMultipleOutline}
                            />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="dark">
                        Go to Desktop
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative size-12 rounded-xs after:absolute after:inset-0 after:content-center after:border-l-2 after:border-l-white hover:bg-accent/10"
                        >
                            <Icon
                                className="size-6.5 text-white"
                                path={mdiInformationOutline}
                            />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="dark">
                        Go to About (you&apos;re here)
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative size-12 rounded-xs hover:bg-accent/10"
                            onMouseUp={() =>
                                openWindow(APP_REGISTRY_NAMES.projects)
                            }
                        >
                            <Icon
                                className="size-6.5 text-accent/70"
                                path={mdiDevTo}
                            />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="dark">
                        Check out my projects
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative size-12 rounded-xs hover:bg-accent/10"
                            onMouseUp={() =>
                                openWindow(APP_REGISTRY_NAMES.contact)
                            }
                        >
                            <Icon
                                className="size-6.5 text-accent/70"
                                path={mdiEmailEdit}
                            />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="dark">
                        Want to contact me?
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative size-12 rounded-xs hover:bg-accent/10"
                            asChild
                        >
                            <Link
                                href={"https://cv.adamUhh.dev"}
                                target="_blank"
                            >
                                <Icon
                                    className="size-6.5 text-accent/70"
                                    path={mdiBadgeAccount}
                                />
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="dark">View my CV</TooltipContent>
                </Tooltip>
            </div>
            <div>
                <Button
                    variant="ghost"
                    className="relative size-12 rounded-xs hover:bg-accent/10"
                >
                    <Icon path={mdiConsole} className="size-6.5 text-white" />
                </Button>
                <Button
                    variant="ghost"
                    className="relative size-12 rounded-xs hover:bg-accent/10"
                    asChild
                >
                    <Link href={"https://github.com/AdamUhh"} target="_blank">
                        <Icon
                            className="size-6.5 text-white"
                            path={mdiGithub}
                        />
                    </Link>
                </Button>
            </div>
        </div>
    );
}

type TreeLeaf = {
    name: string;
    value: string;
    type: "tree" | "window" | "link";
};
type TreeItem = TreeLeaf | [TreeLeaf, ...TreeItem[]];

const data = {
    tree: [
        [
            { name: "pages" },
            { name: "about.html", value: "about", type: "tree" },
            { name: "experience.ts", value: "experience", type: "tree" },
        ],
        [
            { name: "other-windows" },
            {
                name: "projects.tsx",
                value: APP_REGISTRY_NAMES.projects,
                type: "window",
            },
            {
                name: "contact.css",
                value: APP_REGISTRY_NAMES.contact,
                type: "window",
            },
        ],
        [
            { name: "links" },
            {
                name: "github.json",
                value: "https://github.com/AdamUhh",
                type: "link",
            },
            { name: "cv.tsx", value: "https://cv.adamuhh.dev", type: "link" },
        ],
    ],
};

export function AppSidebar({
    setExplorerTab,
    ...props
}: {
    setExplorerTab: Dispatch<SetStateAction<"about" | "experience">>;
} & ComponentProps<typeof Sidebar>) {
    const { openWindow } = useWindowManager();

    return (
        <Sidebar {...props}>
            <SidebarContent>
                <SidebarGroup className="p-0 py-1">
                    <SidebarGroupLabel className="flex items-center justify-between uppercase">
                        <span>Explorer</span>
                        <Icon path={mdiDotsHorizontal} className="size-4" />
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Collapsible
                            className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                            defaultOpen={true}
                        >
                            <CollapsibleTrigger
                                asChild
                                className="gap-1 px-1 text-xs uppercase"
                            >
                                <SidebarMenuButton>
                                    <ChevronRight className="transition-transform" />
                                    VSCode-Portfolio
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenu className="px-1">
                                    {data.tree.map((item, index) => (
                                        <Tree
                                            key={index}
                                            item={item as TreeItem}
                                            setExplorerTab={setExplorerTab}
                                            openWindow={openWindow}
                                        />
                                    ))}
                                </SidebarMenu>
                            </CollapsibleContent>
                        </Collapsible>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
function Tree({
    item,
    openWindow,
    setExplorerTab,
}: {
    item: TreeItem;
    openWindow: (appId: string) => void;
    setExplorerTab: Dispatch<SetStateAction<"about" | "experience">>;
}) {
    const [dataItem, ...items] = Array.isArray(item) ? item : [item];

    if (!items.length) {
        if (dataItem.type === "tree") {
            return (
                <SidebarMenuButton
                    isActive={dataItem.value === "about"}
                    onMouseUp={() => setExplorerTab(dataItem.value as "about")}
                    className="gap-1"
                >
                    <Icon
                        path={getIconFromFileExt(dataItem.name)}
                        color={getColorFromFileExt(dataItem.name)}
                        className="size-4.5!"
                    />
                    {dataItem.name}
                </SidebarMenuButton>
            );
        }
        if (dataItem.type === "window") {
            return (
                <SidebarMenuButton
                    isActive={dataItem.value === "about"}
                    onMouseUp={() => openWindow(dataItem.value)}
                    className="gap-1"
                >
                    <Icon
                        path={getIconFromFileExt(dataItem.name)}
                        color={getColorFromFileExt(dataItem.name)}
                        className="size-4.5!"
                    />
                    {dataItem.name}
                </SidebarMenuButton>
            );
        }

        if (dataItem.type === "link") {
            return (
                <SidebarMenuButton asChild className="gap-1">
                    <Link href={dataItem.value} target="_blank">
                        <Icon
                            path={getIconFromFileExt(dataItem.name)}
                            color={getColorFromFileExt(dataItem.name)}
                            className="size-4.5!"
                        />
                        {dataItem.name}
                    </Link>
                </SidebarMenuButton>
            );
        }
    }

    return (
        <SidebarMenuItem>
            <Collapsible
                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                defaultOpen={
                    dataItem.name === "pages" ||
                    dataItem.name === "other-windows" ||
                    dataItem.name === "links"
                }
            >
                <CollapsibleTrigger asChild className="gap-1">
                    <SidebarMenuButton>
                        <ChevronRight className="transition-transform" />
                        <Icon
                            path={mdiFolderOpen}
                            color={"#F7C427"}
                            className="size-4.5!"
                        />
                        {dataItem.name}
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {items.map((subItem, index) => (
                            <Tree
                                key={index}
                                item={subItem}
                                setExplorerTab={setExplorerTab}
                                openWindow={openWindow}
                            />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    );
}

function ExplorerBar() {
    const [explorerTab, setExplorerTab] = useState<"about" | "experience">(
        "about"
    );

    return (
        <div className="relative flex flex-1 overflow-hidden bg-[#252526]">
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "12rem",
                        "--sidebar-width-mobile": "12rem",
                        "--sidebar": "#252526",
                        "--sidebar-foreground": "#ffffff",
                        "--sidebar-accent-foreground": "#ffffff",
                    } as CSSProperties
                }
                className="min-h-auto"
            >
                <AppSidebar
                    variant="inset"
                    className="absolute! h-full! p-0!"
                    style={
                        {
                            width: "12rem",
                        } as CSSProperties
                    }
                    setExplorerTab={setExplorerTab}
                />
                <SidebarInset className="m-0! overflow-hidden bg-[#1e1e1e]">
                    <div className="flex flex-col overflow-hidden bg-[#1e1e1e] text-white">
                        <Tabs
                            value={explorerTab}
                            onValueChange={setExplorerTab as () => string}
                            className="overflow-hidden rounded-none"
                        >
                            <TabsList className="w-full justify-start rounded-none bg-[#252526] p-0">
                                <div className="relative">
                                    <TabsTrigger
                                        className="h-full flex-0 justify-start rounded-none border-none bg-[#2d2d2d] pr-8 pl-5 text-white/70 hover:bg-accent/10 data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-white"
                                        value="about"
                                    >
                                        <Icon
                                            path={getIconFromFileExt(".html")}
                                            color={getColorFromFileExt(".html")}
                                        />
                                        About.html
                                    </TabsTrigger>

                                    <TabsTrigger
                                        className="absolute top-0 right-0 bg-transparent!"
                                        value="experience"
                                    >
                                        <Icon
                                            path={mdiClose}
                                            className="size-3.5 text-white"
                                        />
                                    </TabsTrigger>
                                </div>

                                <div className="relative">
                                    <TabsTrigger
                                        className="h-full flex-0 justify-start rounded-none border-none bg-[#2d2d2d] pr-8 pl-5 text-white/70 hover:bg-accent/10 data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-white"
                                        value="experience"
                                        id="open-experience"
                                    >
                                        <Icon
                                            path={getIconFromFileExt(".ts")}
                                            color={getColorFromFileExt(".ts")}
                                        />
                                        Experience.ts
                                    </TabsTrigger>

                                    <TabsTrigger
                                        className="absolute top-0 right-0 bg-transparent!"
                                        value="about"
                                    >
                                        <Icon
                                            path={mdiClose}
                                            className="size-3.5 text-white"
                                        />
                                    </TabsTrigger>
                                </div>
                            </TabsList>
                            <TabsContent
                                value="about"
                                className="space-y-6 overflow-y-auto px-6 py-4"
                            >
                                <Header />
                                <Details setExplorerTab={setExplorerTab} />
                            </TabsContent>
                            <TabsContent
                                value="experience"
                                className="space-y-6 overflow-y-auto px-6 py-4"
                            >
                                <Skills />
                                <Projects />
                                <Experience />
                            </TabsContent>
                        </Tabs>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
function Header() {
    const { openWindow } = useWindowManager();
    return (
        <div className="flex gap-4">
            <FallbackImage
                src="/logo_600x600.png"
                alt="AdamUhh Logo"
                width={0}
                height={0}
                className="aspect-square size-48 rounded-xs"
            />
            <div className="my-auto flex flex-col gap-2">
                <div className="flex flex-wrap items-end gap-2">
                    <h1 className="text-3xl">AdamUhh</h1>
                    <code className="h-6 rounded bg-[#4b4b4b] px-2 py-px font-mono text-sm text-white/50">
                        full_stack.developer
                    </code>
                </div>
                <div className="flex flex-wrap gap-2 text-accent/80">
                    <span>Adam M.</span>
                    <Separator className="bg-accent/30" />

                    <div className="flex flex-wrap gap-4">
                        <span>Male</span>
                        <Separator
                            orientation="vertical"
                            className="h-auto! bg-accent/30"
                        />

                        <span>v{calculateAgeParts()} (Years Old)</span>
                        <Separator
                            orientation="vertical"
                            className="h-auto! bg-accent/30"
                        />

                        <span>Dubai (GMT+4)</span>
                    </div>
                </div>
                <p className="mt-4 text-accent/80">
                    I&apos;m a developer... I think?
                </p>
                <div className="flex flex-wrap gap-4">
                    <Button
                        variant="link"
                        asChild
                        className="w-fit px-0 text-accent/80 underline hover:text-accent"
                    >
                        <Link href={"https://cv.adamuhh.dev"}>View CV</Link>
                    </Button>
                    <Button
                        variant="link"
                        asChild
                        className="w-fit px-0 text-accent/80 underline hover:text-accent"
                    >
                        <Link href={"https://github.com/AdamUhh"}>
                            View GitHub
                        </Link>
                    </Button>
                    <Button
                        variant="link"
                        className="w-fit px-0 text-accent/80 underline hover:text-accent"
                        onMouseUp={() =>
                            openWindow(APP_REGISTRY_NAMES.projects)
                        }
                    >
                        View Projects
                    </Button>
                </div>
            </div>
        </div>
    );
}
function Details({
    setExplorerTab,
}: {
    setExplorerTab: Dispatch<SetStateAction<"about" | "experience">>;
}) {
    return (
        <div>
            <div className="relative flex space-x-4 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-accent/20">
                <h2 className="relative w-fit pb-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-accent/80">
                    Details
                </h2>

                <h2
                    className="relative w-fit pb-2 text-accent/80 hover:cursor-pointer"
                    onMouseUp={() => setExplorerTab("experience")}
                >
                    Experience & Skills
                </h2>
            </div>
            <div className="mt-8 space-y-6">
                <div>
                    <h3 className="text-3xl">Bio</h3>
                    <p className="text-accent/70">
                        Hello, I&apos;m Adam.{" "}
                        <span className="text-accent">
                            I enjoy building web apps and software apps.
                        </span>
                    </p>
                </div>

                <div>
                    <h3 className="text-3xl">Interests & Hobbies</h3>
                    <p className="text-accent/70">
                        I spend my time on{" "}
                        <span className="text-accent">
                            3D printing, reading, and drawing
                        </span>
                        . I like work that{" "}
                        <span className="text-accent">teaches me</span>{" "}
                        something new; This includes{" "}
                        <span className="text-accent">challenging tasks</span>,
                        or things no one seems to want to do.{" "}
                        <span className="text-accent">I just wanna learn.</span>
                    </p>
                </div>

                <div>
                    <h3 className="text-3xl">
                        What it&apos;s like to work with me
                    </h3>
                    <p className="text-accent/80">
                        People have described me as a{" "}
                        <span className="text-accent">stoic</span>. I stay{" "}
                        <span className="text-accent">focused on the work</span>{" "}
                        and handle whatever a project requires, though I do tend
                        to drift off when the work becomes monotonous and
                        I&apos;m just sitting.{" "}
                        <span className="text-accent">
                            Deadlines aren’t something I enjoy, I doubt anyone
                            does, but I understand them.
                        </span>
                    </p>
                </div>

                <Education />
                <div>
                    <h3 className="mb-2 text-3xl">
                        Hmm... Let&apos;s do something else
                    </h3>
                    <TriggerFlappyBird />
                </div>
            </div>
        </div>
    );
}
function SkillBox({
    category,
    skills,
    experienceFilter,
}: {
    category: string;
    skills: Skill[];
    experienceFilter: string;
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="relative flex min-w-72 flex-1 flex-col rounded-xl border-3 border-border/20 p-3 font-mono text-sm">
            <Button
                variant="ghost"
                className="absolute -top-3 right-4 h-fit rounded bg-[#1e1e1e] p-0 text-accent/30 hover:bg-[#1e1e1e] hover:text-accent/50"
                onMouseUp={() => setIsCollapsed((prev) => !prev)}
            >
                [ {isCollapsed ? "show" : "hide"} ]
            </Button>

            <div className={cn(isCollapsed && "flex items-end")}>
                <p>
                    <span
                        className={cn(
                            "text-[#2e95d3]",
                            isCollapsed && "opacity-60"
                        )}
                    >
                        .{category}
                    </span>
                    <span className="ml-2">&#123;</span>
                </p>

                <ul
                    className={cn(
                        "h-fit list-none pl-5 font-medium text-accent/70",
                        isCollapsed && "pl-0"
                    )}
                >
                    {isCollapsed
                        ? "..."
                        : skills.map(({ name, experience }) => (
                              <li
                                  key={name}
                                  className={cn(
                                      "leading-6",
                                      experienceFilter === "Show All" ||
                                          experience === experienceFilter
                                          ? ""
                                          : "opacity-40"
                                  )}
                              >
                                  <span className="text-[#d5626a]">{name}</span>
                                  :
                                  <span className="text-[#c49262]">
                                      &quot;{experience}&quot;;
                                  </span>
                              </li>
                          ))}
                </ul>
                <span>&#125;</span>
            </div>
        </div>
    );
}

function Skills() {
    const [experienceFilter, setExperienceFilter] = useState("Show All");

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-3xl">Skills</h2>
                <p className="text-accent/70">
                    Here are the tools and technologies I&apos;ve worked with
                    before, and my competency with them
                </p>
            </div>
            <div className="relative grid w-full grid-cols-3 justify-center space-x-2">
                <Button
                    variant="link"
                    className={cn(
                        "mx-auto w-fit p-0 text-accent/70",
                        experienceFilter === "Show All" &&
                            "text-accent underline"
                    )}
                    onClick={() => setExperienceFilter("Show All")}
                >
                    Show All
                </Button>

                {Object.values(skillList).map((experience) => (
                    <Button
                        key={experience}
                        variant="link"
                        className={cn(
                            "mx-auto w-fit p-0 text-accent/70",
                            experienceFilter === experience &&
                                "text-accent underline"
                        )}
                        onClick={() => setExperienceFilter(experience)}
                    >
                        {experience}
                    </Button>
                ))}
            </div>
            <div className="flex flex-wrap gap-3">
                {Object.entries(skillDict).map(([category, skills]) => (
                    <SkillBox
                        key={category}
                        category={category}
                        skills={skills}
                        experienceFilter={experienceFilter}
                    />
                ))}
            </div>
        </div>
    );
}
function Education() {
    return (
        <div>
            <h3 className="text-3xl">Education</h3>
            <div className="flex max-w-[600px] flex-col gap-2 text-accent/95">
                <div>
                    <h4 className="flex justify-between gap-4 text-xl">
                        Google
                        <span className="text-base text-accent/80">2024</span>
                    </h4>
                    <p className="text-accent/80">
                        Google Cybersecurity Certificate
                    </p>
                </div>

                <div>
                    <h4 className="flex justify-between gap-4 text-xl">
                        University of the People
                        <span className="text-base text-accent/80">
                            2020 - 2024
                        </span>
                    </h4>
                    <p className="text-accent/80">
                        Bachelor&apos;s Degree in Computer Science
                    </p>
                </div>
            </div>
        </div>
    );
}

function Projects() {
    const { openWindow } = useWindowManager();
    return (
        <div>
            <h3 className="text-3xl">Projects</h3>
            <p className="text-accent/80">
                Now that you&apos;ve seen my skills, check out my{" "}
                <Button
                    variant="secondary"
                    className="rounded"
                    onMouseUp={() => openWindow(APP_REGISTRY_NAMES.projects)}
                >
                    Projects
                </Button>
            </p>
        </div>
    );
}
function Experience() {
    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-3xl">Experience</h2>
                <p className="text-accent/70"></p>
            </div>
        </div>
    );
}

function StatusBar() {
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

export function AboutWindow({ windowId }: WindowProps) {
    return (
        <div className="flex size-full flex-col overflow-hidden">
            <div className="flex flex-[1_1_0] overflow-x-hidden overflow-y-auto">
                <ActivityBar winId={windowId} />
                <ExplorerBar />
            </div>
            <StatusBar />
        </div>
    );
}

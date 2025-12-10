"use client";

import {
    mdiAlertOutline,
    mdiBellOutline,
    mdiClose,
    mdiCloseCircleOutline,
    mdiCodeTags,
    mdiConsole,
    mdiFileMultipleOutline,
    mdiGit,
    mdiGithub,
    mdiHistory,
    mdiOpenInNew,
} from "@mdi/js";
import Icon from "@mdi/react";
import { ChevronRight, File, Folder } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/shadcn/button";
import { Separator } from "@/shadcn/separator";
import {
    SidebarInset,
    SidebarMenuBadge,
    SidebarProvider,
} from "@/shadcn/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/tabs";

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
import { APP_REGISTRY_NAMES } from "@/lib/registry-constants";
import { ArrayElementOf } from "@/lib/type-utils";
import { WindowProps } from "@/lib/types";

import { useWindowManager } from "@/context/window";

import { TriggerFlappyBird } from "../FlappyBird";

function ActivityBar() {
    return (
        <div className="flex w-12 flex-col justify-between bg-[#333333]">
            <div>
                <Button
                    variant="ghost"
                    className="relative size-12 rounded-xs after:absolute after:inset-0 after:content-center after:border-l-2 after:border-l-white hover:bg-accent/10"
                >
                    <Icon
                        className="size-6.5 text-white"
                        path={mdiFileMultipleOutline}
                    />
                </Button>
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

type SidebarDataType = {
    links: { name: string; href: string }[];
    windows: { name: string; appId: keyof typeof APP_REGISTRY_NAMES }[];
    tree: string[];
};

const data: SidebarDataType = {
    links: [
        { name: "Github", href: "https://github.com/AdamUhh" },
        { name: "CV", href: "https://cv.adamuhh.dev" },
    ],
    windows: [
        {
            name: "Projects",
            appId: APP_REGISTRY_NAMES.settings,
        },
        {
            name: "Contact",
            appId: APP_REGISTRY_NAMES.contact,
        },
    ],
    tree: ["About.ts", "Skills.md"],
};

function AppSidebarLinks({
    item,
}: {
    item: ArrayElementOf<SidebarDataType["links"]>;
}) {
    return (
        <SidebarMenuButton asChild>
            <Link href={item.href} target="_blank">
                <File />
                {item.name}
                <SidebarMenuBadge>
                    <Icon path={mdiOpenInNew} className="size-4" />
                </SidebarMenuBadge>
            </Link>
        </SidebarMenuButton>
    );
}

function AppSidebarWindows({
    item,
}: {
    item: ArrayElementOf<SidebarDataType["windows"]>;
}) {
    const { openWindow } = useWindowManager();
    return (
        <SidebarMenuButton
            onMouseUp={(e) => {
                e.stopPropagation();
                openWindow(item.appId);
            }}
        >
            <File />
            {item.name}
        </SidebarMenuButton>
    );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Files</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.tree.map((item, index) => (
                                <Tree key={index} item={item} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Other Windows</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.windows.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <AppSidebarWindows item={item} />
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Links</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.links.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <AppSidebarLinks item={item} />
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

type TreeItem = string | TreeItem[];

function Tree({ item }: { item: TreeItem }) {
    const [name, ...items] = Array.isArray(item) ? item : [item];

    if (!items.length) {
        return (
            <SidebarMenuButton isActive={name === "button.tsx"}>
                <File />
                {name}
            </SidebarMenuButton>
        );
    }

    return (
        <SidebarMenuItem>
            <Collapsible
                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                defaultOpen={name === "components" || name === "ui"}
            >
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <ChevronRight className="transition-transform" />
                        <Folder />
                        {name}
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {items.map((subItem, index) => (
                            <Tree key={index} item={subItem} />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    );
}

function ExplorerBar() {
    const [explorerTab, setExplorerTab] = React.useState<
        "about" | "experience"
    >("about");

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
                    } as React.CSSProperties
                }
                className="min-h-auto"
            >
                <AppSidebar
                    variant="inset"
                    className="absolute! h-full! p-0!"
                    style={
                        {
                            width: "12rem",
                        } as React.CSSProperties
                    }
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
                                        <File />
                                        About.ts
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
                                        <File />
                                        Experience.md
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
                            <TabsContent value="experience">
                                <Skills />
                                <Skills />
                            </TabsContent>
                        </Tabs>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
function Header() {
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
            </div>
        </div>
    );
}
function Details({
    setExplorerTab,
}: {
    setExplorerTab: React.Dispatch<
        React.SetStateAction<"about" | "experience">
    >;
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
                    <h3 className="text-2xl text-accent/90">Bio</h3>
                    <p className="text-accent/80">
                        Hello, I&apos;m Adam. I enjoy building web apps and
                        software apps.
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl text-accent/90">
                        Interests & Hobbies
                    </h3>
                    <p className="text-accent/80">
                        I spend my time on 3D printing, reading, and drawing. I
                        like work that teaches me something new; This includes
                        challenging tasks, or things no one seems to want to do.
                        I just wanna learn.
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl text-accent/90">
                        What it&apos;s like to work with me
                    </h3>
                    <p className="text-accent/80">
                        People have described me as stoic. I stay focused on the
                        work and handle whatever a project requires, though I do
                        tend to drift off when the work becomes monotonous and
                        I&apos;m just sitting. Deadlines aren’t something I
                        enjoy, I doubt anyone does, but I understand them.
                    </p>
                </div>

                <div>
                    <h3 className="mb-2 text-2xl text-accent/90">
                        Wanna play a game?
                    </h3>
                    <TriggerFlappyBird />
                </div>
            </div>
        </div>
    );
}
function Skills() {
    return <div>Experience & skills</div>;
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

export function AboutWindow({}: WindowProps) {
    return (
        <div className="flex size-full flex-col overflow-hidden">
            <div className="flex flex-[1_1_0] overflow-x-hidden overflow-y-auto">
                <ActivityBar />
                <ExplorerBar />
            </div>
            <StatusBar />
        </div>
    );
}

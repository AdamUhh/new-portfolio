import { Metadata } from "next";
import { notFound } from "next/navigation";

import { FallbackImage } from "@/components/FallbackImage";
import { DesktopItems } from "@/components/OpenVSCode";
import { Taskbar } from "@/components/Taskbar";
import { WindowContainer } from "@/components/Window/WindowContainer";

import { getAllApps, getApp } from "@/lib/registry";

type Props = {
    params: Promise<{ appId: string }>;
};

// Generate metadata for each app
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { appId } = await params;
    const app = getApp(appId);

    if (!app) {
        return {
            title: "Not Found",
        };
    }

    return {
        title: `${app.title} - Desktop OS`,
    };
}

export async function generateStaticParams() {
    const apps = getAllApps();

    return apps
        .filter((app) => app.hasRoute)
        .map((app) => ({
            appId: app.id,
        }));
}

function BackgroundWallpaper() {
    return (
        <FallbackImage
            alt="Windows background image"
            src="/wallpaper.png"
            className="fixed inset-0 -z-10 object-cover"
            width={0}
            height={0}
            style={{ width: "100%", height: "100%" }}
        />
    );
}

export default async function Home({ params }: Props) {
    const { appId } = await params;
    const app = getApp(appId);

    // If app doesn't exist, show 404
    if (!app) {
        notFound();
    }

    return (
        <div className="relative flex min-h-screen font-albert-sans font-medium">
            <main className="flex h-full w-full">
                <BackgroundWallpaper />
                <DesktopItems />
                <WindowContainer />
            </main>
            <Taskbar />
        </div>
    );
}

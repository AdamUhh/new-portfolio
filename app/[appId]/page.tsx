import { Metadata } from "next";
import { notFound } from "next/navigation";

import { DesktopItems } from "@/components/Desktop/DesktopItems";
import { Taskbar } from "@/components/Desktop/Taskbar";
import { FallbackImage } from "@/components/FallbackImage";
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
        .filter((app) => app.isRoute)
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
            <main className="flex h-full w-full overflow-hidden">
                <BackgroundWallpaper />
                <DesktopItems />
                <WindowContainer />
            </main>
            <Taskbar />
        </div>
    );
}

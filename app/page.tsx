import { FallbackImage } from "@/components/FallbackImage";
import { DesktopItems } from "@/components/DesktopItems";
import { Taskbar } from "@/components/Taskbar";
import { WindowContainer } from "@/components/Window/WindowContainer";

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

export default function Home() {
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

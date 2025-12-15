// import HolyLoader from "holy-loader";
import type { Metadata } from "next";
import {
    Albert_Sans,
    Geist,
    Geist_Mono,
    Inter,
    JetBrains_Mono,
    Schibsted_Grotesk,
} from "next/font/google";

import { HOST_LINK } from "@/lib/link-constants";

import { WindowProvider } from "@/context/window";

import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const grotesk = Schibsted_Grotesk({
    variable: "--font-schibsted-grotesk",
    subsets: ["latin"],
});

const JetBrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono" });

const albertSans = Albert_Sans({
    variable: "--font-albert-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AdamUhh's Portfolio",
    description: "Welcome to my portfolio",
    generator: "Next.js",
    applicationName: "AdamUhh's Portfolio",
    keywords: ["Next.js", "Portfolio", "Developer Portfolio"],
    creator: "AdamUhh",
    openGraph: {
        title: "AdamUhh's Portfolio",
        description: "Welcome to my portfolio",
        url: HOST_LINK,
        siteName: "AdamUhh's Portfolio",
        images: [
            {
                url: new URL("logo_600x600.png", HOST_LINK).href,
                width: 600,
                height: 600,
                alt: "AdamUhh Logo",
            },
            {
                url: new URL("logo_1000x1000.png", HOST_LINK).href,
                width: 1000,
                height: 1000,
                alt: "AdamUhh Logo",
            },
        ],
        locale: "en_US",
        type: "profile",
        firstName: "Adam",
        lastName: "M.",
        username: "AdamUhh",
        gender: "Male",
    },
    metadataBase: new URL(HOST_LINK),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${albertSans.variable} ${JetBrainsMono.variable} ${inter.variable} ${grotesk.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {/* <HolyLoader showSpinner={false} /> */}
                <WindowProvider>{children}</WindowProvider>
            </body>
        </html>
    );
}

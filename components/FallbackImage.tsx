"use client";

import Image, { ImageProps } from "next/image";

export function FallbackImage(props: ImageProps) {
    const { src, alt, priority = false, ...rest } = props;

    return (
        <Image
            {...rest}
            unoptimized
            loading={priority ? "eager" : "lazy"}
            src={src || (null as unknown as string)}
            alt={alt}
            aria-label={alt}
            priority={priority}
            onError={(event) => {
                event.currentTarget.src = "/image-not-found.webp";
            }}
        />
    );
}

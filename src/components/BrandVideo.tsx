"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Play } from "lucide-react";

export default function BrandVideo({
  src,
  poster,
  label = "Play the Seaside Wellness story",
}: {
  src: string;
  poster: string;
  label?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    requestAnimationFrame(() => ref.current?.play());
  };

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink shadow-[var(--shadow-lift)] ring-1 ring-shell">
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls={playing}
        preload="none"
        playsInline
        className="h-full w-full object-cover"
        onPause={() => {}}
      />
      {!playing && (
        <button
          type="button"
          onClick={start}
          aria-label={label}
          className="group absolute inset-0 grid place-items-center"
        >
          <Image src={poster} alt="" fill sizes="100vw" className="object-cover" />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-ink/30" />
          <span className="relative grid size-20 place-items-center rounded-full bg-white/95 text-gold-600 shadow-xl transition-transform duration-300 group-hover:scale-110">
            <Play className="size-8 translate-x-0.5 fill-current" />
          </span>
          <span className="absolute bottom-6 left-6 right-6 text-left font-display text-2xl text-white sm:text-3xl">
            {label}
          </span>
        </button>
      )}
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";

const GLSLHills = dynamic(
  () => import("@/components/ui/glsl-hills").then((m) => m.GLSLHills),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-ink" />,
  }
);

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <GLSLHills
        className="h-full w-full opacity-80"
        color={[0.5, 0.47, 0.62]}
        cameraZ={135}
        speed={0.4}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" />
      <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-ink to-transparent" />
    </div>
  );
}

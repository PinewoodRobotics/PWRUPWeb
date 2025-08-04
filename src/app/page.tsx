import Link from "next/link";

import { api, HydrateClient } from "~/trpc/server";
import { WavyBackground } from "~/components/ui/wavy-background";
import { TextHoverEffect } from "~/components/ui/text-hover-effect";
import { GlowingEffectDemo } from "~/components/glow-bento/glowing-bento-grid";
import { CardCarousel } from "~/components/blog-carosuel/cards";
import { SmoothScroll } from "~/components/ui/smooth-scroll";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      {/* Fixed wavy background behind everything */}
      <WavyBackground
        containerClassName="fixed inset-0 -z-10"
        className="hidden"
        colors={["#70cd35"]}
      />

      {/* Smooth scroll wrapper for homepage content only */}
      <SmoothScroll>
        {/* Your scrollable content */}
        <main className="relative z-10 -mt-20 min-h-[100vh]">
          <div
            id="coverTitle"
            className="flex h-screen w-screen items-center justify-center"
          >
            <TextHoverEffect text="4765" />
          </div>

          <div className="min-h-[100vh] w-screen bg-black">
            <div className="container mx-auto py-20">
              <GlowingEffectDemo />
            </div>

            {/* Card Carousel Section */}
            <CardCarousel />
          </div>
        </main>
      </SmoothScroll>
    </HydrateClient>
  );
}

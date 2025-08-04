"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import CardDemo from "~/components/ui/card";
import { api } from "~/trpc/react";

// Carousel component for cards
export function CardCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Fetch recent blog posts
  const {
    data: recentPosts,
    isLoading,
    error,
  } = api.post.getRecentPosts.useQuery({
    limit: 8,
  });

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    // Initialize Lenis for the horizontal scroll container only
    lenisRef.current = new Lenis({
      wrapper: scrollContainerRef.current,
      content: scrollContainerRef.current.firstElementChild as HTMLElement,
      orientation: "horizontal",
      gestureOrientation: "horizontal", // Only handle horizontal gestures
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Animation loop
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full py-20">
        <h2 className="mb-8 text-center text-3xl font-bold text-white">
          Recent Blog Posts
        </h2>
        <div className="flex justify-center">
          <div className="text-white">Loading recent posts...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full py-20">
        <h2 className="mb-8 text-center text-3xl font-bold text-white">
          Recent Blog Posts
        </h2>
        <div className="flex justify-center">
          <div className="text-red-400">
            Error loading posts: {error.message}
          </div>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!recentPosts || recentPosts.length === 0) {
    return (
      <div className="w-full py-20">
        <h2 className="mb-8 text-center text-3xl font-bold text-white">
          Recent Blog Posts
        </h2>
        <div className="flex justify-center">
          <div className="text-gray-400">No recent posts found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-20">
      <h2 className="mb-8 text-center text-3xl font-bold text-white">
        Recent Blog Posts
      </h2>
      <div className="relative">
        {/* Scrollable container with Lenis */}
        <div
          ref={scrollContainerRef}
          className="custom-scrollbar overflow-x-auto pb-4"
          style={{ height: "auto" }}
        >
          <div className="flex gap-6">
            {/* Left spacer for scroll padding */}
            <div className="w-[8rem] flex-shrink-0"></div>

            {/* Render actual blog posts */}
            {recentPosts.map((post, i) => (
              <div key={`${post.link}-${i}`} className="flex-shrink-0">
                <CardDemo post={post} />
              </div>
            ))}

            {/* Right spacer for scroll padding */}
            <div className="w-[8rem] flex-shrink-0"></div>
          </div>
        </div>

        {/* Gradient overlays for fade effect */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-20 bg-gradient-to-r from-black to-transparent"></div>
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-20 bg-gradient-to-l from-black to-transparent"></div>
      </div>
    </div>
  );
}

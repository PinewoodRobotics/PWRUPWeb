"use client";

import { useState, useEffect } from "react";
import {
  SectionHeader,
  ArticleCard,
  FeaturedArticle,
  HeroSection,
  type PostWithLink,
} from "~/components";
import { ArchiveCard } from "~/components/articles/archive-card";
import { BlogFilters } from "~/components/blog/blog-filters";
import { api } from "~/trpc/react";

interface BlogPageProps {
  params: Promise<{
    year: string;
  }>;
}

export default function BlogPage({ params }: BlogPageProps) {
  const [year, setYear] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<PostWithLink[]>([]);

  // Get the year from params
  useEffect(() => {
    params.then(({ year: yearParam }) => {
      setYear(yearParam);
    });
  }, [params]);

  // Fetch posts
  const { data: allPosts, isLoading } = api.post.getPosts.useQuery();
  const postsNow = allPosts?.[year] ?? [];
  const featuredPost: PostWithLink | null = filteredPosts[0] ?? null;

  // Handle filtered posts change
  const handleFilteredPostsChange = (filtered: PostWithLink[]) => {
    setFilteredPosts(filtered);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col gap-5">
      <HeroSection />

      <main className="mx-auto max-w-6xl px-6">
        {/* Featured Article */}
        <section id="featured" className="pb-20">
          <SectionHeader title="Featured Article" />
          {featuredPost && <FeaturedArticle post={featuredPost} />}
        </section>

        {/* Filters */}
        <section className="pb-8">
          <BlogFilters
            posts={postsNow}
            onFilteredPostsChange={handleFilteredPostsChange}
          />
        </section>

        {/* Articles Grid */}
        <section className="pb-20">
          <SectionHeader title="All Articles" />

          <div className="grid gap-8 lg:grid-cols-2">
            {filteredPosts.map((post: PostWithLink, index: number) => (
              <ArticleCard
                key={`${post.link}-${index}`}
                post={post}
                index={index}
                articleLink={post.link}
              />
            ))}
          </div>

          {filteredPosts.length === 0 && postsNow.length > 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-400">
                No articles match your current filters.
              </p>
            </div>
          )}
        </section>

        {allPosts && (
          <section className="border-t border-gray-800/50 py-20">
            <SectionHeader title="Archive" />

            <div className="grid gap-4 md:grid-cols-3">
              <ArchiveCard
                key={year}
                title={year}
                articleCount={allPosts[year]?.length ?? 0}
                badgeVariant="primary"
                clickLink={`/blog/${year}`}
              />
              {Object.keys(allPosts)
                .filter((postYear) => postYear !== year)
                .map((postYear) => (
                  <ArchiveCard
                    key={postYear}
                    title={postYear}
                    articleCount={allPosts[postYear]?.length ?? 0}
                    badgeVariant="secondary"
                    clickLink={`/blog/${postYear}`}
                  />
                ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

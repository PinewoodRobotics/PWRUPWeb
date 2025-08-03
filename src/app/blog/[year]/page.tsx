import {
  Header,
  Footer,
  SectionHeader,
  ArticleCard,
  FeaturedArticle,
  Badge,
  HeroSection,
  type Post,
} from "~/components";
import { ArchiveCard } from "~/components/articles/archive-card";
import { api } from "~/trpc/server";

interface BlogPageProps {
  params: Promise<{
    year: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { year } = await params;
  const posts = await api.post.getPosts();
  const postsNow = posts[year];
  const featuredPost: Post | null = null;
  console.log(posts);

  return (
    <div className="flex min-h-screen flex-col gap-5">
      <HeroSection />

      <main className="mx-auto max-w-6xl px-6">
        {/* Featured Article */}
        <section id="featured" className="pb-20">
          <SectionHeader title="Featured Article" />
          {featuredPost && <FeaturedArticle post={featuredPost} />}
        </section>

        {/* Recent Articles Grid */}
        <section className="pb-20">
          <SectionHeader
            title="All Articles"
            action={
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Showing {postsNow?.length ?? 0} articles
                </span>
              </div>
            }
          />

          <div className="grid gap-8 lg:grid-cols-2">
            {postsNow?.map((post, index) => (
              <ArticleCard
                key={index}
                post={post}
                index={index}
                articleLink={post.link}
              />
            ))}
          </div>
        </section>

        <section className="border-t border-gray-800/50 py-20">
          <SectionHeader title="Archive" />

          <div className="grid gap-4 md:grid-cols-3">
            <ArchiveCard
              key={year}
              title={year}
              articleCount={posts[year]?.length ?? 0}
              badgeVariant="primary"
              clickLink={`/blog/${year}`}
            />
            {/* for year in posts */}
            {Object.keys(posts)
              .filter((postYear) => postYear !== year)
              .map((postYear) => (
                <ArchiveCard
                  key={postYear}
                  title={postYear}
                  articleCount={posts[postYear]?.length ?? 0}
                  badgeVariant="secondary"
                  clickLink={`/blog/${postYear}`}
                />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}

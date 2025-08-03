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

const featuredPost: Post | null = null;
const allPosts: Post[] = [];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col gap-5">
      <Header />
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
                  Showing {allPosts.length} articles
                </span>
              </div>
            }
          />

          <div className="grid gap-8 lg:grid-cols-2">
            {allPosts.map((post, index) => (
              <ArticleCard key={index} post={post} index={index} />
            ))}
          </div>
        </section>

        <section className="border-t border-gray-800/50 py-20">
          <SectionHeader title="Archive" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-800/50 bg-gray-900/30 p-6">
              <h4 className="mb-3 font-semibold text-white">2024 Season</h4>
              <p className="mb-4 text-sm text-gray-400">
                Current competition year with 12 articles covering our latest
                innovations.
              </p>
              <Badge variant="primary">12 Articles</Badge>
            </div>
            <div className="rounded-lg border border-gray-800/50 bg-gray-900/30 p-6">
              <h4 className="mb-3 font-semibold text-white">2023 Season</h4>
              <p className="mb-4 text-sm text-gray-400">
                Our championship year with technical deep-dives and competition
                recaps.
              </p>
              <Badge>8 Articles</Badge>
            </div>
            <div className="rounded-lg border border-gray-800/50 bg-gray-900/30 p-6">
              <h4 className="mb-3 font-semibold text-white">Getting Started</h4>
              <p className="mb-4 text-sm text-gray-400">
                Essential guides for new team members and robotics beginners.
              </p>
              <Badge>5 Articles</Badge>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

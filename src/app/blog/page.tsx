import {
  Header,
  Footer,
  SectionHeader,
  ArticleCard,
  FeaturedArticle,
  Badge,
  Button,
  HeroSection,
} from "~/components";
import { featuredPost, posts } from "~/lib/data";

const categories = [
  { name: "All", count: 15, active: true },
  { name: "Technical", count: 6 },
  { name: "Competition", count: 4 },
  { name: "Manufacturing", count: 3 },
  { name: "Team", count: 2 },
];

const additionalPosts = [
  {
    title: "Mecanum Wheel Drive System Deep Dive",
    date: "Dec 28, 2023",
    excerpt:
      "Understanding the mathematics and control algorithms behind our omnidirectional drive system for maximum field mobility.",
    author: "Alex Rodriguez",
    category: "Technical",
    readTime: "15 min read",
  },
  {
    title: "Vision Processing for Game Element Recognition",
    date: "Dec 25, 2023",
    excerpt:
      "Implementing OpenCV and machine learning pipelines to reliably detect and track game pieces in real-time.",
    author: "Emma Thompson",
    category: "Technical",
    readTime: "12 min read",
  },
  {
    title: "CAD to Reality: Precision Manufacturing Workflow",
    date: "Dec 22, 2023",
    excerpt:
      "Our complete process from digital design to physical parts, ensuring tolerances and quality in every component.",
    author: "David Kim",
    category: "Manufacturing",
    readTime: "8 min read",
  },
  {
    title: "Rookie Year Lessons: What We Learned",
    date: "Dec 20, 2023",
    excerpt:
      "Reflecting on our first competition season and the valuable insights that shaped our approach to robotics.",
    author: "Sarah Chen",
    category: "Team",
    readTime: "7 min read",
  },
];

const allPosts = [...posts, ...additionalPosts];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col gap-5">
      <Header />
      <HeroSection />

      <main className="mx-auto max-w-6xl px-6">
        <section id="featured" className="pb-20">
          <SectionHeader title="Featured Article" />
          <FeaturedArticle post={featuredPost} />
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

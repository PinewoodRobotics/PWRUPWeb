import Link from "next/link";
import { SectionHeader } from "../ui/section-header";
import { ArticleCard } from "./article-card";
import type { PostWithLink } from "../types";

interface RecentArticlesProps {
  posts: PostWithLink[];
}

export function RecentArticles({ posts }: RecentArticlesProps) {
  return (
    <section className="pb-20">
      <SectionHeader
        title="Recent Articles"
        action={
          <Link
            href="/posts"
            className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
          >
            View All →
          </Link>
        }
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {posts.map((post, index) => (
          <ArticleCard
            key={index}
            post={post}
            index={index}
            articleLink={post.link}
          />
        ))}
      </div>
    </section>
  );
}

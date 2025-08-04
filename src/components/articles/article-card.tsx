import Link from "next/link";
import { Badge } from "../ui/badge";
import { AuthorAvatar } from "../ui/author-avatar";
import { GlowingEffect } from "../ui/glowing-effect";
import type { Post } from "../types";

interface ArticleCardProps {
  post: Post;
  index: number;
  articleLink: string;
}

export function ArticleCard({ post, index, articleLink }: ArticleCardProps) {
  return (
    <Link href={articleLink}>
      <article className="group relative rounded-xl border border-gray-800/50 bg-gray-900/30 p-8 transition-all duration-300 hover:border-gray-700/50 hover:bg-gray-900/50">
        <GlowingEffect
          disabled={false}
          proximity={100}
          spread={30}
          blur={2}
          movementDuration={1.5}
          borderWidth={2}
        />
        <div className="relative z-10">
          <div className="mb-4 flex items-center space-x-3">
            <Badge>{post.category}</Badge>
            <span className="text-xs text-gray-600">•</span>
            <span className="text-xs text-gray-500">{post.readTime}</span>
          </div>
          <h4 className="mb-4 text-xl leading-tight font-semibold text-white transition-colors group-hover:text-gray-300">
            {post.title}
          </h4>
          <p className="mb-6 leading-relaxed text-gray-400">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <AuthorAvatar name={post.author} date={post.date} size="sm" />
            <span className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
              Read →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

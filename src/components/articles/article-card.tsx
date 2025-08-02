import Link from "next/link";
import { Badge } from "../ui/badge";
import { AuthorAvatar } from "../ui/author-avatar";
import type { Post } from "../types";

interface ArticleCardProps {
  post: Post;
  index: number;
}

export function ArticleCard({ post, index }: ArticleCardProps) {
  return (
    <article className="group rounded-xl border border-gray-800/50 bg-gray-900/30 p-8 transition-all duration-300 hover:border-gray-700/50 hover:bg-gray-900/50">
      <div className="mb-4 flex items-center space-x-3">
        <Badge>{post.category}</Badge>
        <span className="text-xs text-gray-600">•</span>
        <span className="text-xs text-gray-500">{post.readTime}</span>
      </div>
      <h4 className="mb-4 text-xl leading-tight font-semibold text-white transition-colors group-hover:text-gray-300">
        <Link href={`/posts/${index + 1}`}>{post.title}</Link>
      </h4>
      <p className="mb-6 leading-relaxed text-gray-400">{post.excerpt}</p>
      <div className="flex items-center justify-between">
        <AuthorAvatar name={post.author} date={post.date} size="sm" />
        <Link
          href={`/posts/${index + 1}`}
          className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
        >
          Read →
        </Link>
      </div>
    </article>
  );
}

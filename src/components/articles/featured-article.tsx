import Link from "next/link";
import { Badge } from "../ui/badge";
import { AuthorAvatar } from "../ui/author-avatar";
import type { Post, PostWithLink } from "../types";

interface FeaturedArticleProps {
  post: PostWithLink;
}

export function FeaturedArticle({ post }: FeaturedArticleProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-800/50 bg-gradient-to-br from-gray-900 to-gray-900/50 shadow-2xl shadow-black/20 transition-all duration-300 hover:border-gray-700/50">
      <div className="flex flex-col md:flex-row">
        <div className="flex w-full items-center justify-center py-8 md:w-2/5 md:py-0">
          <div className="mx-auto flex aspect-[4/3] w-full max-w-[340px] items-center justify-center bg-gradient-to-br px-6 md:max-w-[400px] lg:max-w-[500px]">
            <img
              src={post.image ?? "/placeholder.svg"}
              alt={post.title}
              className="h-full w-full rounded-lg object-cover"
              width={500}
              height={300}
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
          <div className="mb-6 flex items-center space-x-3">
            <Badge variant="primary">{post.category}</Badge>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{post.readTime}</span>
          </div>
          <h4 className="mb-4 text-2xl leading-tight font-semibold text-white md:text-3xl">
            <Link
              href={post.link}
              className="transition-colors hover:text-gray-300"
            >
              {post.title}
            </Link>
          </h4>
          <p className="mb-8 text-base leading-relaxed text-gray-400 md:text-lg">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <AuthorAvatar name={post.author} date={post.date} />
            <Link
              href={post.link}
              className="inline-flex items-center text-sm font-medium text-orange-400 transition-colors hover:text-orange-300"
            >
              Read Article
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

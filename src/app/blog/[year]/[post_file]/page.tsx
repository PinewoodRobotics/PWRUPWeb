import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import styles from "./markdown.module.css";
import { Mermaid } from "~/components/ui/mermaid";

// Import highlight.js for manual registration if needed
import "highlight.js/lib/common";

interface BlogPageProps {
  params: Promise<{
    year: string;
    post_file: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { year, post_file } = await params;

  const post = await api.post.getPost({ year, filename: post_file });

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl bg-gray-950 px-4 py-8 text-gray-100">
      <article className="prose prose-lg mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-100">
            {post.title}
          </h1>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <span>By {post.author}</span>
            <span>•</span>
            <span>{post.readTime}</span>
            <span>•</span>
            <span className="rounded-full bg-blue-900 px-2 py-1 text-xs text-blue-200">
              {post.category}
            </span>
          </div>

          {post.excerpt && (
            <p className="border-l-4 border-blue-400 pl-4 text-xl text-gray-300 italic">
              {post.excerpt}
            </p>
          )}
          <div className="mt-10 mb-16 h-1 w-full bg-gray-800" />
        </header>

        {/* Content */}
        {post.content && (
          <div
            className={`prose prose-invert prose-xl max-w-none ${styles.content}`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                [
                  rehypeHighlight,
                  {
                    detect: true,
                    ignoreMissing: true,
                  },
                ],
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: "wrap" }],
              ]}
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className ?? "");
                  const language = match ? match[1] : "";

                  if (language === "mermaid" && typeof children === "string") {
                    return <Mermaid chart={children.replace(/\n$/, "")} />;
                  }

                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        )}
      </article>
    </div>
  );
}

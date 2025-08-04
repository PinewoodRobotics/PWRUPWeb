import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import styles from "./markdown.module.css";
import { Mermaid } from "~/components/ui/mermaid";
import { TracingBeam } from "~/components/ui/tracing-beam";

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
    <div className="bg-gray-950 text-gray-100">
      <TracingBeam className="px-6">
        <div className="container mx-auto max-w-4xl py-8">
          <article className="prose prose-lg mx-auto">
            {/* Header */}
            <header className="mb-10">
              <div className="mb-4 w-fit rounded-full bg-black px-4 py-1 text-sm text-white">
                {post.category}
              </div>

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
              </div>

              {post.excerpt && (
                <p className="border-l-4 border-lime-400 pl-4 text-xl text-gray-300 italic">
                  {post.excerpt}
                </p>
              )}
            </header>

            {/* Content */}
            {post.content && (
              <div
                className={`prose prose-sm dark:prose-invert text-sm ${styles.content}`}
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

                      if (
                        language === "mermaid" &&
                        typeof children === "string"
                      ) {
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
      </TracingBeam>
    </div>
  );
}

import { api } from "~/trpc/server";
import { notFound } from "next/navigation";

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
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <article className="prose prose-lg mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {post.title}
          </h1>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
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
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
              {post.category}
            </span>
          </div>

          {post.excerpt && (
            <p className="border-l-4 border-blue-500 pl-4 text-xl text-gray-600 italic">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Content */}
        {post.content && (
          <div
            className="prose prose-lg max-w-none"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </article>
    </div>
  );
}

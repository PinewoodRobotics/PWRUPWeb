"use client";
import Link from "next/link";
import type { PostWithLink } from "~/components/types";
import { AuthorAvatar } from "./author-avatar";

interface CardDemoProps {
  post: PostWithLink;
}

export default function CardDemo({ post }: CardDemoProps) {
  // Use post image if available, otherwise fallback to a default image
  const backgroundImageUrl = post.image
    ? post.image
    : "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80";

  return (
    <Link href={post.link} className="group/card block w-full max-w-xs">
      <div
        className="card backgroundImage relative mx-auto flex h-96 max-w-sm cursor-pointer flex-col justify-between overflow-hidden rounded-md bg-cover bg-center p-4 shadow-xl"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      >
        <div className="absolute top-0 left-0 h-full w-full opacity-60 transition duration-300 group-hover/card:bg-black"></div>
        <div className="z-10 flex flex-row items-center space-x-4">
          <AuthorAvatar name={post.author} date={post.date} size="sm" />
          <div className="flex flex-col">
            <p className="relative z-10 text-base font-normal text-gray-50">
              {post.author}
            </p>
            <p className="text-sm text-gray-400">{post.readTime}</p>
          </div>
        </div>
        <div className="text content">
          <h1 className="relative z-10 text-xl font-bold text-gray-50 md:text-2xl">
            {post.title}
          </h1>
          <p className="relative z-10 my-4 text-sm font-normal text-gray-50">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}

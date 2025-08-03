import { z } from "zod";
import fs from "fs/promises";
import { marked } from "marked";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { posts } from "~/server/db/schema";
import path from "path";
import type { Post, PostWithLink } from "~/components";

function parsePost(content: string, includeContent = false): Post {
  const lines = content.split("\n");
  const metadata: Partial<Post> = {};
  let contentStartIndex = 0;

  // Parse metadata lines that start with #
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (!line?.startsWith("#")) {
      contentStartIndex = i;
      break;
    }

    const match = /^#(\w+)\s+(.+)$/.exec(line);
    if (match) {
      const [, key, value] = match;
      if (key && value) {
        switch (key.toLowerCase()) {
          case "title":
            metadata.title = value;
            break;
          case "date":
            metadata.date = value;
            break;
          case "excerpt":
            metadata.excerpt = value;
            break;
          case "author":
            metadata.author = value;
            break;
          case "category":
            metadata.category = value;
            break;
          case "readtime":
            metadata.readTime = value;
            break;
          case "image":
            metadata.image = value;
            break;
        }
      }
    }
  }

  // Parse markdown content if requested
  let parsedContent;
  if (includeContent) {
    parsedContent = lines.slice(contentStartIndex).join("\n").trim();
  }

  return {
    title: metadata.title ?? "",
    date: metadata.date ?? "",
    excerpt: metadata.excerpt ?? "",
    author: metadata.author ?? "",
    category: metadata.category ?? "",
    readTime: metadata.readTime ?? "",
    image: metadata.image,
    content: parsedContent ?? "",
  };
}

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        name: input.name,
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),

  getPosts: publicProcedure.query(async () => {
    // todo: improve this bc right now VERY SUBOPTIMAL
    const allYears = await fs.readdir(path.join(process.cwd(), "public/blogs"));
    const postsByYear: Record<string, PostWithLink[]> = {};
    for (const folder of allYears) {
      const files = await fs.readdir(
        path.join(process.cwd(), "public/blogs", folder),
      );

      const yearPosts: PostWithLink[] = [];
      for (const file of files) {
        const content = await fs.readFile(
          path.join(process.cwd(), "public/blogs", folder, file),
          "utf-8",
        );
        const post = parsePost(content, false);
        yearPosts.push({
          ...post,
          link: `/blog/${folder}/${file}`,
        });
      }

      postsByYear[folder] = yearPosts;
    }

    return postsByYear;
  }),

  getPost: publicProcedure
    .input(
      z.object({
        year: z.string(),
        filename: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const filePath = path.join(
          process.cwd(),
          "public/blogs",
          input.year,
          `${input.filename}`,
        );

        const content = await fs.readFile(filePath, "utf-8");
        return parsePost(content, true); // Include content for individual post
      } catch (error) {
        console.error(
          `Error reading post ${input.year}/${input.filename}:`,
          error,
        );
        return null;
      }
    }),
});

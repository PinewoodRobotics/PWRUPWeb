import { z } from "zod";
import fs from "fs/promises";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { posts } from "~/server/db/schema";
import path from "path";
import type { Post } from "~/components";

function parsePost(content: string): Post {
  const [
    titleLine,
    dateLine,
    excerptLine,
    authorLine,
    categoryLine,
    readTimeLine,
    imageLine,
  ] = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 7);

  return {
    title: titleLine?.replace(/^#title\s+/i, "") ?? "",
    date: dateLine?.replace(/^#date\s+/i, "") ?? "",
    excerpt: excerptLine?.replace(/^#excerpt\s+/i, "") ?? "",
    author: authorLine?.replace(/^#author\s+/i, "") ?? "",
    category: categoryLine?.replace(/^#category\s+/i, "") ?? "",
    readTime: readTimeLine?.replace(/^#readtime\s+/i, "") ?? "",
    image: imageLine?.replace(/^#image\s+/i, "") ?? undefined,
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

  getPosts: publicProcedure.query(async ({ ctx }) => {
    // todo: improve this bc right now VERY SUBOPTIMAL
    const allYears = await fs.readdir(path.join(process.cwd(), "public/blog"));
    const postsByYear: Record<string, Post[]> = {};
    for (const folder of allYears) {
      const files = await fs.readdir(
        path.join(process.cwd(), "public/blog", folder),
      );

      const yearPosts: Post[] = [];
      for (const file of files) {
        const content = await fs.readFile(
          path.join(process.cwd(), "public/blog", folder, file),
          "utf-8",
        );
        const post = parsePost(content);
        yearPosts.push(post);
      }

      postsByYear[folder] = yearPosts;
    }

    return postsByYear;
  }),
});

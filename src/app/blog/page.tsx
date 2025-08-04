import { redirect } from "next/navigation";

export default function BlogPage() {
  // For now, redirect to the 2026 blog page since that's where the posts are
  redirect("/blog/2025");
}

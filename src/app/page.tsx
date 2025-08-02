import Link from "next/link";
import {
  Header,
  Footer,
  HeroSection,
  FeaturedArticle,
  RecentArticles,
  TeamSection,
  SectionHeader,
  Button,
} from "~/components";
import { featuredPost, posts, teamMembers } from "~/lib/data";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />

      <div className="flex h-screen items-center justify-center">
        <Button href="/blog">Blog</Button>
      </div>

      <Footer />
    </div>
  );
}

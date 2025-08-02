export interface Post {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  image?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
}

export interface NavigationItem {
  href: string;
  label: string;
}

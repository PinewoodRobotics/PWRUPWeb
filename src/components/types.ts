export interface Post {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  image?: string;
  content?: string;
}

export interface PostWithLink extends Post {
  link: string;
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

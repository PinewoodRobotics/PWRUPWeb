import type { Post, TeamMember } from "~/components/types";

export const featuredPost: Post = {
  title: "Building Our Championship Robot: A Complete Engineering Journey",
  date: "Jan 15, 2024",
  excerpt:
    "From initial concept sketches to championship victory, discover how our team engineered a winning robot using cutting-edge technology, innovative problem-solving techniques, and months of iterative design.",
  author: "Sarah Chen",
  category: "Competition",
  readTime: "12 min read",
  image: "/placeholder.svg?height=300&width=500",
};

export const posts: Post[] = [
  {
    title: "Advanced Sensor Integration for Autonomous Navigation",
    date: "Jan 12, 2024",
    excerpt:
      "Exploring LIDAR, computer vision, and IMU fusion for precise robot positioning in dynamic environments.",
    author: "Alex Rodriguez",
    category: "Technical",
    readTime: "8 min read",
  },
  {
    title: "3D Printing Revolution: Custom Parts for Peak Performance",
    date: "Jan 10, 2024",
    excerpt:
      "How we leverage additive manufacturing to create lightweight, durable components that give us a competitive edge.",
    author: "David Kim",
    category: "Manufacturing",
    readTime: "6 min read",
  },
  {
    title: "Competition Recap: Regional Championships Success",
    date: "Jan 8, 2024",
    excerpt:
      "A detailed breakdown of our performance, strategy decisions, and lessons learned from the regional competition.",
    author: "Lisa Wang",
    category: "Competition",
    readTime: "10 min read",
  },
  {
    title: "Team Spotlight: Meet Our Lead Programmer",
    date: "Jan 5, 2024",
    excerpt:
      "An in-depth interview with Emma Thompson about her journey in robotics and programming philosophy.",
    author: "Mike Johnson",
    category: "Team",
    readTime: "5 min read",
  },
  {
    title: "Autonomous Navigation Breakthrough",
    date: "Jan 2, 2024",
    excerpt:
      "How we achieved precise autonomous movement using advanced pathfinding algorithms and real-time obstacle detection.",
    author: "Sarah Chen",
    category: "Technical",
    readTime: "9 min read",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Team Captain & Systems Architect",
    bio: "Leading our team through design challenges and competition strategy. Specializes in project management, system architecture, and cross-functional coordination.",
    expertise: ["Project Management", "System Design", "Strategy"],
  },
  {
    name: "Alex Rodriguez",
    role: "Lead Mechanical Engineer",
    bio: "Specializing in mechanical design and system integration. Expert in CAD design, manufacturing processes, and structural optimization.",
    expertise: ["CAD Design", "Manufacturing", "Structural Analysis"],
  },
  {
    name: "Emma Thompson",
    role: "Lead Software Engineer",
    bio: "Developing autonomous systems and control algorithms. Focuses on computer vision, machine learning applications, and real-time control systems.",
    expertise: ["Computer Vision", "Machine Learning", "Control Systems"],
  },
  {
    name: "David Kim",
    role: "Manufacturing & Operations Lead",
    bio: "Managing fabrication processes and quality control. Expert in 3D printing, precision manufacturing, and supply chain optimization.",
    expertise: ["3D Printing", "Quality Control", "Operations"],
  },
];

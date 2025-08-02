import Link from "next/link";
import { Logo } from "../ui/logo";
import type { NavigationItem } from "../types";

const navigationItems: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Articles" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="hidden items-center space-x-8 md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";

const navigationLinks = [
  { href: "/posts", label: "Articles" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/about", label: "About" },
];

const socialLinks = [
  { href: "/contact", label: "Contact" },
  { href: "#", label: "GitHub" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-800/50 bg-gray-900/30">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-700 bg-gradient-to-br from-gray-700 to-gray-800">
                <div className="h-4 w-4 rounded-sm bg-gradient-to-br from-orange-400 to-orange-500"></div>
              </div>
              <div>
                <h4 className="font-semibold text-white">TechTitans</h4>
                <p className="text-xs text-gray-400">Team 2847</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              Building the future through innovative robotics and engineering
              excellence. Follow our journey from concept to competition.
            </p>
          </div>
          <div>
            <h5 className="mb-4 font-semibold text-white">Navigation</h5>
            <ul className="space-y-3 text-sm">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="mb-4 font-semibold text-white">Connect</h5>
            <ul className="space-y-3 text-sm">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800/50 pt-8">
          <p className="text-xs text-gray-500">
            © 2024 TechTitans Robotics Team. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

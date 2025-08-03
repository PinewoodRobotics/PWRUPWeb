import Link from "next/link";
import { Badge } from "~/components/ui/badge";

interface ArchiveCardProps {
  title: string;
  description?: string;
  articleCount: number;
  clickLink: string;
  badgeVariant?: "primary" | "secondary";
}

export function ArchiveCard({
  title,
  description,
  articleCount,
  clickLink = "/blog",
  badgeVariant = "secondary",
}: ArchiveCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-800/50 bg-gray-900/30 p-6">
      <Link
        href={clickLink}
        className="mb-2 w-fit font-semibold text-white transition-colors duration-200 hover:text-orange-400 focus-visible:text-orange-400"
      >
        {title}
      </Link>

      <div className="flex items-center gap-2">
        <Badge variant={badgeVariant}>
          {articleCount} Article{articleCount === 1 ? "" : "s"}
        </Badge>
      </div>
    </div>
  );
}

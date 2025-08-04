import Link from "next/link";
import { Calendar, FileText, ChevronRight } from "lucide-react";

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
  const isPrimary = badgeVariant === "primary";

  return (
    <Link
      href={clickLink}
      className="group block transition-all duration-300 hover:scale-105"
    >
      <div
        className={`relative overflow-hidden rounded-xl border p-6 transition-all duration-300 ${
          isPrimary
            ? "border-[#70cd35]/50 bg-gradient-to-br from-[#70cd35]/10 to-[#70cd35]/5 shadow-lg shadow-[#70cd35]/20"
            : "border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:border-gray-600/50"
        } group-hover:shadow-xl`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`rounded-lg p-2 transition-colors duration-300 ${
                  isPrimary
                    ? "bg-[#70cd35]/20 text-[#70cd35]"
                    : "bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50 group-hover:text-gray-300"
                } `}
              >
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3
                  className={`text-xl font-bold transition-colors duration-300 ${
                    isPrimary
                      ? "text-[#70cd35]"
                      : "text-white group-hover:text-[#70cd35]"
                  } `}
                >
                  {title}
                </h3>
                {description && (
                  <p className="mt-1 text-sm text-gray-400">{description}</p>
                )}
              </div>
            </div>

            <ChevronRight
              className={`h-5 w-5 transition-all duration-300 group-hover:translate-x-1 ${isPrimary ? "text-[#70cd35]" : "text-gray-400 group-hover:text-[#70cd35]"} `}
            />
          </div>

          <div className="flex items-center gap-2">
            <FileText
              className={`h-4 w-4 transition-colors duration-300 ${isPrimary ? "text-[#70cd35]" : "text-gray-500 group-hover:text-gray-400"} `}
            />
            <span
              className={`text-sm font-medium transition-colors duration-300 ${isPrimary ? "text-[#70cd35]" : "text-gray-400 group-hover:text-gray-300"} `}
            >
              {articleCount} Article{articleCount === 1 ? "" : "s"}
            </span>
          </div>

          {isPrimary && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#70cd35]/20 px-3 py-1 text-xs font-medium text-[#70cd35]">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#70cd35]" />
              Current Year
            </div>
          )}
        </div>

        {/* Hover Effect */}
        <div
          className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
            isPrimary
              ? "bg-gradient-to-r from-[#70cd35]/5 to-transparent"
              : "bg-gradient-to-r from-gray-700/10 to-transparent"
          } `}
        />
      </div>
    </Link>
  );
}

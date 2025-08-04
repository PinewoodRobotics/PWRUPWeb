"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Filter, SortAsc, SortDesc, X } from "lucide-react";
import type { PostWithLink } from "~/components/types";

interface BlogFiltersProps {
  posts: PostWithLink[];
  onFilteredPostsChange: (filteredPosts: PostWithLink[]) => void;
}

type SortOption =
  | "date-desc"
  | "date-asc"
  | "title-asc"
  | "title-desc"
  | "author-asc"
  | "author-desc";

export function BlogFilters({
  posts,
  onFilteredPostsChange,
}: BlogFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique authors and categories
  const uniqueAuthors = useMemo(() => {
    return Array.from(new Set(posts.map((post) => post.author))).sort();
  }, [posts]);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(posts.map((post) => post.category))).sort();
  }, [posts]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const contentMatch =
          post.content?.toLowerCase().includes(query) || false;
        const excerptMatch = post.excerpt.toLowerCase().includes(query);
        const authorMatch = post.author.toLowerCase().includes(query);
        const categoryMatch = post.category.toLowerCase().includes(query);

        // Prioritize title matches
        return (
          titleMatch ||
          contentMatch ||
          excerptMatch ||
          authorMatch ||
          categoryMatch
        );
      });

      // Sort by relevance (title matches first)
      if (searchQuery.trim()) {
        filtered = filtered.sort((a, b) => {
          const aTitle = a.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const bTitle = b.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

          if (aTitle && !bTitle) return -1;
          if (!aTitle && bTitle) return 1;

          // Count occurrences in content for secondary sorting
          const aCount =
            (a.content?.toLowerCase().split(searchQuery.toLowerCase()).length ||
              1) - 1;
          const bCount =
            (b.content?.toLowerCase().split(searchQuery.toLowerCase()).length ||
              1) - 1;

          return bCount - aCount;
        });
      }
    }

    // Author filter
    if (selectedAuthors.length > 0) {
      filtered = filtered.filter((post) =>
        selectedAuthors.includes(post.author),
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((post) =>
        selectedCategories.includes(post.category),
      );
    }

    // Sort
    if (!searchQuery.trim()) {
      // Only apply sorting if not searching (search has its own relevance sorting)
      filtered = filtered.sort((a, b) => {
        switch (sortBy) {
          case "date-desc":
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          case "date-asc":
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          case "title-asc":
            return a.title.localeCompare(b.title);
          case "title-desc":
            return b.title.localeCompare(a.title);
          case "author-asc":
            return a.author.localeCompare(b.author);
          case "author-desc":
            return b.author.localeCompare(a.author);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [posts, searchQuery, selectedAuthors, selectedCategories, sortBy]);

  // Update parent component when filtered posts change
  useEffect(() => {
    onFilteredPostsChange(filteredAndSortedPosts);
  }, [filteredAndSortedPosts, onFilteredPostsChange]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedAuthors([]);
    setSelectedCategories([]);
    setSortBy("date-desc");
  };

  const hasActiveFilters =
    searchQuery.trim() ||
    selectedAuthors.length > 0 ||
    selectedCategories.length > 0 ||
    sortBy !== "date-desc";

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search articles by title, content, author, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pr-4 pl-10 text-white placeholder-gray-400 focus:border-[#70cd35] focus:ring-1 focus:ring-[#70cd35] focus:outline-none"
        />
      </div>

      {/* Filter Toggle and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700"
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 rounded-full bg-[#70cd35] px-2 py-0.5 text-xs text-black">
                {selectedAuthors.length +
                  selectedCategories.length +
                  (searchQuery.trim() ? 1 : 0) +
                  (sortBy !== "date-desc" ? 1 : 0)}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <X className="h-4 w-4" />
              Clear all
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-[#70cd35] focus:ring-1 focus:ring-[#70cd35] focus:outline-none"
          >
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="author-asc">Author (A-Z)</option>
            <option value="author-desc">Author (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Expandable Filters */}
      {showFilters && (
        <div className="grid gap-6 rounded-lg border border-gray-700 bg-gray-800/50 p-6 md:grid-cols-2">
          {/* Author Filter */}
          <div>
            <h3 className="mb-3 font-medium text-white">Authors</h3>
            <div className="space-y-2">
              {uniqueAuthors.map((author) => (
                <label key={author} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedAuthors.includes(author)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAuthors([...selectedAuthors, author]);
                      } else {
                        setSelectedAuthors(
                          selectedAuthors.filter((a) => a !== author),
                        );
                      }
                    }}
                    className="rounded border-gray-600 bg-gray-700 text-[#70cd35] focus:ring-[#70cd35]"
                  />
                  <span className="text-gray-300">{author}</span>
                  <span className="text-xs text-gray-500">
                    ({posts.filter((p) => p.author === author).length})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="mb-3 font-medium text-white">Categories</h3>
            <div className="space-y-2">
              {uniqueCategories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories([
                          ...selectedCategories,
                          category,
                        ]);
                      } else {
                        setSelectedCategories(
                          selectedCategories.filter((c) => c !== category),
                        );
                      }
                    }}
                    className="rounded border-gray-600 bg-gray-700 text-[#70cd35] focus:ring-[#70cd35]"
                  />
                  <span className="text-gray-300">{category}</span>
                  <span className="text-xs text-gray-500">
                    ({posts.filter((p) => p.category === category).length})
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-400">
        Showing {filteredAndSortedPosts.length} of {posts.length} articles
        {searchQuery.trim() && (
          <span className="ml-2">
            for "<span className="text-[#70cd35]">{searchQuery}</span>"
          </span>
        )}
      </div>
    </div>
  );
}

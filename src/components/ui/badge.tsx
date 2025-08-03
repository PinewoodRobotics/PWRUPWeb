import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function Badge({ children, variant = "secondary" }: BadgeProps) {
  const variants = {
    primary:
      "px-3 py-1.5 bg-[#70cd35] text-black text-xs font-semibold rounded-full border border-[#70cd35] shadow-md",
    secondary:
      "px-2.5 py-1 bg-gray-800/80 text-[#70cd35] text-xs font-medium rounded-full border border-gray-700",
  };

  return <span className={variants[variant]}>{children}</span>;
}

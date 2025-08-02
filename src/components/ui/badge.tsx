interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function Badge({ children, variant = "secondary" }: BadgeProps) {
  const variants = {
    primary:
      "px-3 py-1.5 bg-orange-500/10 text-orange-400 text-xs font-medium rounded-full border border-orange-500/20",
    secondary:
      "px-2.5 py-1 bg-gray-800/50 text-gray-400 text-xs font-medium rounded-md border border-gray-700/50",
  };

  return <span className={variants[variant]}>{children}</span>;
}

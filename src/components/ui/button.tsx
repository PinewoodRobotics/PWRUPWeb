import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const variants = {
    primary:
      "inline-flex items-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors",
    secondary:
      "inline-flex items-center px-6 py-3 border border-gray-700 text-gray-300 font-medium rounded-lg hover:border-gray-600 hover:text-white transition-colors",
  };

  return (
    <Link href={href} className={`${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

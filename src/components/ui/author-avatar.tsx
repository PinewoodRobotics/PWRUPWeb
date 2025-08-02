interface AuthorAvatarProps {
  name: string;
  date: string;
  size?: "sm" | "md" | "lg";
}

export function AuthorAvatar({ name, date, size = "md" }: AuthorAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex items-center space-x-3">
      <div
        className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-gradient-to-br from-gray-700 to-gray-800`}
      >
        <span className={`${textSizeClasses[size]} font-medium text-white`}>
          {initials}
        </span>
      </div>
      <div>
        <p className={`${textSizeClasses[size]} font-medium text-white`}>
          {name}
        </p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
  );
}

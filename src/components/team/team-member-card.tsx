import { Badge } from "../ui/badge";
import type { TeamMember } from "../types";

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="rounded-xl border border-gray-800/50 bg-gray-900/30 p-8 transition-all duration-300 hover:border-gray-700/50">
      <div className="mb-6 flex items-start space-x-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-700 to-gray-800">
          <span className="text-sm font-semibold text-white">{initials}</span>
        </div>
        <div>
          <h4 className="mb-1 text-lg font-semibold text-white">
            {member.name}
          </h4>
          <p className="mb-3 text-sm font-medium text-orange-400">
            {member.role}
          </p>
        </div>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-gray-400">{member.bio}</p>
      <div className="flex flex-wrap gap-2">
        {member.expertise.map((skill, skillIndex) => (
          <Badge key={skillIndex}>{skill}</Badge>
        ))}
      </div>
    </div>
  );
}

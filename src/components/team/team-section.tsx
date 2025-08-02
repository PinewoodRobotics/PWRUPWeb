import { SectionHeader } from "../ui/section-header";
import { TeamMemberCard } from "./team-member-card";
import type { TeamMember } from "../types";

interface TeamSectionProps {
  teamMembers: TeamMember[];
}

export function TeamSection({ teamMembers }: TeamSectionProps) {
  return (
    <section className="border-t border-gray-800/50 py-20">
      <SectionHeader title="Our Team" />

      <div className="grid gap-8 md:grid-cols-2">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </section>
  );
}

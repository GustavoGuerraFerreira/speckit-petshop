import { ResponsiveImage } from '@/components/shared/ResponsiveImage';
import type { TeamMember } from '@/types/content';

export type TeamMemberCardProps = { member: TeamMember };

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <article className="flex items-start gap-4 rounded-xl bg-card p-4 shadow-card">
      <ResponsiveImage
        image={member.photo}
        sizes="96px"
        className="aspect-square rounded-full"
        pictureClassName="w-24 shrink-0"
      />
      <div>
        <h3 className="text-h3 font-bold">{member.name}</h3>
        <p className="font-medium text-primary">{member.role}</p>
        <ul className="mt-2 space-y-1 text-muted-foreground">
          {member.qualifications.map((qualification) => (
            <li key={qualification}>{qualification}</li>
          ))}
          {member.professionalRegistry !== undefined && <li>{member.professionalRegistry}</li>}
        </ul>
      </div>
    </article>
  );
}

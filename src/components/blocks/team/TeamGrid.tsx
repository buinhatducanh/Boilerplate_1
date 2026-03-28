import { Section, SectionHeader, Grid, Card } from "@/components/primitives";

// ============================================================
// TeamGrid – Giới thiệu đội ngũ dạng grid cards.
// Dùng cho: About page, team page.
// ============================================================

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  social?: { platform: string; url: string }[];
}

export interface TeamGridProps {
  badge?: string;
  title: string;
  subtitle?: string;
  members: TeamMember[];
  cols?: 2 | 3 | 4;
}

export function TeamGrid({ badge, title, subtitle, members, cols = 3 }: TeamGridProps) {
  return (
    <Section>
      <SectionHeader badge={badge} title={title} subtitle={subtitle} />
      <Grid cols={cols} className="mt-12">
        {members.map((member, i) => (
          <Card key={i} variant="ghost" className="text-center">
            <img
              src={member.avatar}
              alt={member.name}
              className="mx-auto h-24 w-24 rounded-full object-cover"
            />
            <h3 className="mt-4 font-semibold">{member.name}</h3>
            <p className="text-sm text-primary">{member.role}</p>
            {member.bio && (
              <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
            )}
            {member.social && (
              <div className="mt-3 flex justify-center gap-3">
                {member.social.map((s, j) => (
                  <a
                    key={j}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            )}
          </Card>
        ))}
      </Grid>
    </Section>
  );
}

/**
 * Recognition queue data.
 *
 * Per-employee recognition metadata (days-since, context, draft message)
 * lives here. Identity (name, role, department, avatar) is sourced from
 * the canonical `homeCast` so the same Sarah Chen / Marcus Lee / etc.
 * shows up identically in the Automations feed, Insights cards, and
 * everywhere else.
 */

import { castAvatar, getCastMember } from './homeCast';

export type RecognitionContextType = 'milestone' | 'project' | 'peer-mention' | 'goal-hit';

export interface RecognitionEmployee {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  daysSinceLastRecognized: number;
  contextType: RecognitionContextType;
  contextLabel: string;
  contextDetail: string;
  draftMessage: string;
}

interface RecognitionMeta {
  daysSinceLastRecognized: number;
  contextType: RecognitionContextType;
  contextLabel: string;
  contextDetail: string;
  draftMessage: string;
}

export const recognitionInsight = {
  department: 'Customer Success',
  totalEmployees: 14,
  daysThreshold: 90,
  headline: 'Recognition has gone quiet in Customer Success',
  description:
    "14 team members haven't been recognized in 90+ days. I've drafted messages from milestones, project work, and peer mentions in 1:1 notes.",
};

const recognitionMeta: Record<string, RecognitionMeta> = {
  'sarah-chen': {
    daysSinceLastRecognized: 142,
    contextType: 'milestone',
    contextLabel: '5-year anniversary',
    contextDetail: 'Hit her 5-year anniversary on Apr 12. No team recognition posted.',
    draftMessage:
      "Five years of carrying customers through the hardest parts of their journey — congrats on the anniversary, Sarah. Your steady hand has made this team what it is. Here's to many more.",
  },
  'marcus-lee': {
    daysSinceLastRecognized: 118,
    contextType: 'project',
    contextLabel: 'Onboarding revamp shipped',
    contextDetail: 'Led the new customer onboarding flow rollout that shipped Mar 18.',
    draftMessage:
      "The new onboarding flow shipped because you wouldn't let it go out half-baked, Marcus. Customers are getting to value faster, and the team has a model to follow. Real impact.",
  },
  'priya-patel': {
    daysSinceLastRecognized: 96,
    contextType: 'peer-mention',
    contextLabel: 'Peer mention in retro',
    contextDetail: '"Priya unblocked us three times this sprint" — from Q1 team retro notes.',
    draftMessage:
      "Heard your name come up in the Q1 retro for unblocking the team three different times. The kind of work that doesn't show up in a dashboard but holds everything together. Thank you, Priya.",
  },
  'james-kim': {
    daysSinceLastRecognized: 134,
    contextType: 'goal-hit',
    contextLabel: 'Hit team NPS goal',
    contextDetail: 'Customer Success NPS landed at 62 in Q1 — 4 points over the team goal.',
    draftMessage:
      "62 NPS in Q1 — that's not luck, that's the way you've coached this team to actually listen to customers. Thanks for setting the bar, James.",
  },
  'aisha-williams': {
    daysSinceLastRecognized: 108,
    contextType: 'goal-hit',
    contextLabel: 'Q1 quota exceeded',
    contextDetail: 'Closed 118% of Q1 renewal quota.',
    draftMessage:
      "118% to quota in a quarter where renewals were anything but easy — strong work, Aisha. The way you keep accounts close pays off in moments like this.",
  },
  'diego-rodriguez': {
    daysSinceLastRecognized: 91,
    contextType: 'project',
    contextLabel: 'Migration project complete',
    contextDetail: 'Migrated 50+ legacy customers to the new platform on schedule.',
    draftMessage:
      "Fifty migrations, on time, no fires — Diego, that takes patience and a lot of careful work. Customers landed soft because of you.",
  },
  'hannah-nguyen': {
    daysSinceLastRecognized: 127,
    contextType: 'project',
    contextLabel: 'Led training initiative',
    contextDetail: 'Built and ran the new CSM enablement series — 4 sessions, 22 attendees.',
    draftMessage:
      "Building enablement on top of a full book of business is hard, and you did it generously, Hannah. The team is sharper because you took the time.",
  },
  'tom-bennett': {
    daysSinceLastRecognized: 102,
    contextType: 'goal-hit',
    contextLabel: 'Major renewal closed',
    contextDetail: 'Closed the Acme renewal — largest CS renewal of the quarter.',
    draftMessage:
      "Acme was at risk and you closed it cleanly. That kind of recovery work doesn't happen without trust built over months. Great work, Tom.",
  },
  'olivia-martinez': {
    daysSinceLastRecognized: 156,
    contextType: 'project',
    contextLabel: 'Process improvement',
    contextDetail: 'Rebuilt the handoff between Sales and CS — average ramp dropped by 6 days.',
    draftMessage:
      "Six days off the average ramp — Olivia, that's the kind of behind-the-scenes work that quietly changes the whole engine. Thank you.",
  },
  'raj-mehta': {
    daysSinceLastRecognized: 113,
    contextType: 'peer-mention',
    contextLabel: 'Critical escalation resolved',
    contextDetail: '"Raj saved the Polaris account" — flagged in the CSM 1:1 notes from Apr 8.',
    draftMessage:
      "Polaris was a hard week and you carried it. Hearing from the CSM that you saved that account isn't a small thing — it's the kind of work the company runs on.",
  },
  'zara-ahmed': {
    daysSinceLastRecognized: 98,
    contextType: 'peer-mention',
    contextLabel: 'Mentoring new hires',
    contextDetail: 'Two new CSMs called out her mentorship in their 30-day check-ins.',
    draftMessage:
      "Two new CSMs both said the same thing in their 30-days: that you made the start manageable. Mentorship is invisible work — thank you for doing it well, Zara.",
  },
  'felix-torres': {
    daysSinceLastRecognized: 121,
    contextType: 'peer-mention',
    contextLabel: 'Cross-team partnership',
    contextDetail: 'Partner Sales rep called him out as "the easiest person to work with on CS."',
    draftMessage:
      "The Sales team picked you out as the easiest CS partner to work with — Felix, that reputation is rare and worth saying out loud. Thanks for representing us so well.",
  },
  'naomi-brooks': {
    daysSinceLastRecognized: 105,
    contextType: 'peer-mention',
    contextLabel: 'Customer testimonial',
    contextDetail: 'Customer named her by name in a written testimonial submitted Apr 19.',
    draftMessage:
      "A customer wrote in by name to thank you, Naomi. That doesn't happen often, and it's the clearest signal that the relationship work matters. Great job.",
  },
  'wei-liu': {
    daysSinceLastRecognized: 138,
    contextType: 'project',
    contextLabel: 'Quarterly insights report',
    contextDetail: 'Q1 insights report shipped on time and was cited in the leadership review.',
    draftMessage:
      "The Q1 insights report ended up on the leadership table because it was sharp and on time, Wei. You make the rest of us smarter — thank you for that.",
  },
};

export const recognitionEmployees: RecognitionEmployee[] = Object.entries(
  recognitionMeta,
).map(([id, meta]) => {
  const member = getCastMember(id);
  return {
    id,
    name: `${member.firstName} ${member.lastName}`,
    role: member.role,
    department: member.department,
    avatar: castAvatar(id),
    ...meta,
  };
});

export const recognitionContextMeta: Record<
  RecognitionContextType,
  { label: string; pillType: 'info' | 'success' | 'discovery' | 'warning' }
> = {
  milestone: { label: 'Milestone', pillType: 'success' },
  project: { label: 'Project', pillType: 'info' },
  'peer-mention': { label: 'Peer mention', pillType: 'discovery' },
  'goal-hit': { label: 'Goal hit', pillType: 'success' },
};

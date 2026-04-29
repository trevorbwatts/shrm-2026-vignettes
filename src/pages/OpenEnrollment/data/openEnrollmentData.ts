export type EnrollmentStatus = 'not-started' | 'in-progress' | 'incomplete' | 'complete';
export type EnrollmentStage = 'setup' | 'active' | 'final-48' | 'closed';
export type ReminderTier = 'tier-1' | 'tier-2' | 'tier-3' | 'manager-loop';
export type AssistantSurface = 'ask' | 'benefits-page' | 'enrollment-flow';

export interface PlanDocument {
  id: string;
  title: string;
  type: 'medical' | 'dental' | 'vision' | 'fsa' | 'hsa' | '401k' | 'life' | 'disability' | 'eligibility';
  pages: number;
  importedAt: string;
}

export interface ReminderTierConfig {
  id: ReminderTier;
  label: string;
  description: string;
  audience: string;
  channel: 'email' | 'email + slack' | 'email + sms' | 'manager email';
  trigger: string;
  scheduledFor: string;
  recipients: number;
}

export interface EnrollmentEmployee {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  photoUrl: string;
  status: EnrollmentStatus;
  startedAt?: string;
  lastTouched?: string;
  lastReminder?: string;
  managerName?: string;
  daysRemaining: number;
  blocker?: string;
}

export interface EnrollmentException {
  id: string;
  employee: { firstName: string; lastName: string; jobTitle: string; department: string; photoUrl: string };
  reason: string;
  context: string;
  whyJudgmentNeeded: string;
  suggestedAction: string;
  receivedAt: string;
}

export interface AssistantConversation {
  id: string;
  surface: AssistantSurface;
  employeeFirstName: string;
  employeePhotoUrl: string;
  question: string;
  answerExcerpt: string;
  citations: string[];
  ts: string;
}

export const planDocuments: PlanDocument[] = [
  { id: 'p1', title: 'Aetna PPO 2026 Summary', type: 'medical', pages: 18, importedAt: 'Sep 12' },
  { id: 'p2', title: 'Aetna HDHP 2026 Summary', type: 'medical', pages: 16, importedAt: 'Sep 12' },
  { id: 'p3', title: 'Kaiser HMO 2026 Summary', type: 'medical', pages: 14, importedAt: 'Sep 12' },
  { id: 'p4', title: 'Delta Dental 2026 Plan', type: 'dental', pages: 8, importedAt: 'Sep 12' },
  { id: 'p5', title: 'VSP Vision 2026 Plan', type: 'vision', pages: 6, importedAt: 'Sep 12' },
  { id: 'p6', title: 'Healthcare FSA Limits 2026', type: 'fsa', pages: 4, importedAt: 'Sep 13' },
  { id: 'p7', title: 'HSA Eligibility & Contribution Limits', type: 'hsa', pages: 5, importedAt: 'Sep 13' },
  { id: 'p8', title: 'Fidelity 401(k) Plan Document', type: '401k', pages: 22, importedAt: 'Sep 13' },
  { id: 'p9', title: 'Voluntary Life & AD&D Schedule', type: 'life', pages: 6, importedAt: 'Sep 13' },
  { id: 'p10', title: 'Long-Term Disability Plan', type: 'disability', pages: 8, importedAt: 'Sep 13' },
  { id: 'p11', title: 'Eligibility Rules — Full-Time, Part-Time, Variable Hour', type: 'eligibility', pages: 5, importedAt: 'Sep 14' },
  { id: 'p12', title: 'Domestic Partner & Dependent Definitions', type: 'eligibility', pages: 3, importedAt: 'Sep 14' },
];

export const reminderTiers: ReminderTierConfig[] = [
  {
    id: 'tier-1',
    label: 'Tier 1 — Not started',
    description: 'Friendly nudge to employees who haven\'t opened the enrollment flow yet.',
    audience: 'Not started',
    channel: 'email',
    trigger: '7 days before close',
    scheduledFor: 'Tonight, 6:00 PM',
    recipients: 23,
  },
  {
    id: 'tier-2',
    label: 'Tier 2 — In progress',
    description: 'Reminder to employees who started but haven\'t submitted yet.',
    audience: 'In progress',
    channel: 'email + slack',
    trigger: '4 days before close',
    scheduledFor: 'Wed Oct 22, 9:00 AM',
    recipients: 14,
  },
  {
    id: 'tier-3',
    label: 'Tier 3 — Incomplete',
    description: 'Last-call reminder to anyone with missing required selections.',
    audience: 'Submitted but incomplete',
    channel: 'email + sms',
    trigger: '2 days before close',
    scheduledFor: 'Fri Oct 24, 9:00 AM',
    recipients: 6,
  },
  {
    id: 'manager-loop',
    label: 'Manager loop — Final 48 hours',
    description: 'Auto-loops the employee\'s manager for any holdouts in the final 48 hours.',
    audience: 'Holdouts in final 48 hours',
    channel: 'manager email',
    trigger: '48 hours before close',
    scheduledFor: 'Sat Oct 25, 9:00 AM',
    recipients: 0,
  },
];

export const enrollmentEmployees: EnrollmentEmployee[] = [
  { id: 'e1', firstName: 'Alex', lastName: 'Chen', jobTitle: 'Senior Software Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/150?u=alex-chen', status: 'complete', startedAt: 'Oct 14', lastTouched: 'Oct 14', daysRemaining: 6 },
  { id: 'e2', firstName: 'Maya', lastName: 'Rodriguez', jobTitle: 'Senior Software Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/150?u=maya-rodriguez', status: 'complete', startedAt: 'Oct 13', lastTouched: 'Oct 13', daysRemaining: 6 },
  { id: 'e3', firstName: 'Ben', lastName: 'Park', jobTitle: 'Software Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/150?u=ben-park', status: 'in-progress', startedAt: 'Oct 16', lastTouched: 'Oct 17', lastReminder: 'Oct 16', managerName: 'Daniel Chen', daysRemaining: 6, blocker: 'HSA contribution amount unselected' },
  { id: 'e4', firstName: 'Zara', lastName: 'Ibrahim', jobTitle: 'Senior Product Manager', department: 'Product', photoUrl: 'https://i.pravatar.cc/150?u=zara-ibrahim', status: 'complete', startedAt: 'Oct 15', lastTouched: 'Oct 15', daysRemaining: 6 },
  { id: 'e5', firstName: 'Lila', lastName: 'Nakamura', jobTitle: 'Senior Designer', department: 'Design', photoUrl: 'https://i.pravatar.cc/150?u=lila-nakamura', status: 'in-progress', startedAt: 'Oct 16', lastTouched: 'Oct 16', managerName: 'Jenna Liu', daysRemaining: 6, blocker: 'Comparing PPO vs HDHP' },
  { id: 'e6', firstName: 'Theo', lastName: 'Marsh', jobTitle: 'Account Executive', department: 'Sales', photoUrl: 'https://i.pravatar.cc/150?u=theo-marsh', status: 'not-started', managerName: 'Marcus Webb', daysRemaining: 6 },
  { id: 'e7', firstName: 'Riya', lastName: 'Khanna', jobTitle: 'Customer Success Manager', department: 'Customer Success', photoUrl: 'https://i.pravatar.cc/150?u=riya-khanna', status: 'complete', startedAt: 'Oct 14', lastTouched: 'Oct 14', daysRemaining: 6 },
  { id: 'e8', firstName: 'Jordan', lastName: 'Bell', jobTitle: 'Software Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/150?u=jordan-bell', status: 'not-started', managerName: 'Daniel Chen', daysRemaining: 6 },
  { id: 'e9', firstName: 'Nia', lastName: 'Adeyemi', jobTitle: 'Marketing Manager', department: 'Marketing', photoUrl: 'https://i.pravatar.cc/150?u=nia-adeyemi', status: 'in-progress', startedAt: 'Oct 17', lastTouched: 'Oct 17', managerName: 'Priya Raman', daysRemaining: 6 },
  { id: 'e10', firstName: 'Owen', lastName: 'Reyes', jobTitle: 'Senior Product Manager', department: 'Product', photoUrl: 'https://i.pravatar.cc/150?u=owen-reyes', status: 'incomplete', startedAt: 'Oct 15', lastTouched: 'Oct 16', managerName: 'Priya Raman', daysRemaining: 6, blocker: 'Beneficiaries unspecified for life insurance' },
  { id: 'e11', firstName: 'Sage', lastName: 'Olsen', jobTitle: 'Designer', department: 'Design', photoUrl: 'https://i.pravatar.cc/150?u=sage-olsen', status: 'not-started', managerName: 'Jenna Liu', daysRemaining: 6 },
  { id: 'e12', firstName: 'Dev', lastName: 'Patel', jobTitle: 'Engineering Manager', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/150?u=dev-patel', status: 'complete', startedAt: 'Oct 13', lastTouched: 'Oct 13', daysRemaining: 6 },
];

export const enrollmentExceptions: EnrollmentException[] = [
  {
    id: 'x1',
    employee: { firstName: 'Hana', lastName: 'Iwasaki', jobTitle: 'Software Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/150?u=hana-iwasaki' },
    reason: 'Mid-cycle qualifying event',
    context: 'Hana submitted a marriage qualifying event on Oct 18 (during open enrollment). She wants to add her spouse mid-enrollment, which the standard flow doesn\'t support without a manual override.',
    whyJudgmentNeeded: 'Need to confirm whether the spouse is added with an Oct 18 effective date (qualifying event rule) or Jan 1 (standard OE effective date). Two different premium calculations.',
    suggestedAction: 'Confirm effective date with Hana, then approve override.',
    receivedAt: '2 hours ago',
  },
  {
    id: 'x2',
    employee: { firstName: 'Roman', lastName: 'Velazquez', jobTitle: 'Software Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/150?u=roman-velazquez' },
    reason: 'Domestic partner documentation incomplete',
    context: 'Roman is enrolling his domestic partner. Affidavit is signed but the secondary residency doc is missing. Eligibility rule allows a 30-day grace period for the secondary doc.',
    whyJudgmentNeeded: 'Whether to provisionally enroll the partner with a follow-up tickler, or delay until the doc lands. Roman is traveling for the next two weeks.',
    suggestedAction: 'Provisionally enroll with a Nov 18 tickler for the secondary doc.',
    receivedAt: '5 hours ago',
  },
  {
    id: 'x3',
    employee: { firstName: 'Imani', lastName: 'Bryant', jobTitle: 'Senior Software Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/150?u=imani-bryant' },
    reason: 'HSA contribution exceeds annual limit',
    context: 'Imani enrolled in the HDHP and elected the family HSA limit ($8,550). Her spouse already contributed $5,000 to a separate HSA at his employer this year. Combined household contribution would exceed the limit by $1,150.',
    whyJudgmentNeeded: 'Imani needs to lower her election or coordinate with her spouse. The agent already explained the limit; she\'s asking what others typically do.',
    suggestedAction: 'Schedule a 15-min call to talk through the tradeoffs.',
    receivedAt: 'Yesterday',
  },
  {
    id: 'x4',
    employee: { firstName: 'Felix', lastName: 'Aragón', jobTitle: 'Account Executive', department: 'Sales', photoUrl: 'https://i.pravatar.cc/150?u=felix-aragon' },
    reason: 'Variable-hour eligibility threshold',
    context: 'Felix moved from full-time to a 28-hour part-time schedule on Sep 1. Eligibility rule for medical requires 30+ hours; eligibility for dental requires 20+ hours.',
    whyJudgmentNeeded: 'Felix is asking whether the variable-hour measurement period (12 months prior) keeps him eligible for medical despite the recent reduction. Rule has a look-back exception you sometimes apply.',
    suggestedAction: 'Review look-back history; confirm with him by EOD.',
    receivedAt: 'Yesterday',
  },
];

export const assistantConversations: AssistantConversation[] = [
  {
    id: 'c1',
    surface: 'enrollment-flow',
    employeeFirstName: 'Ben',
    employeePhotoUrl: 'https://i.pravatar.cc/150?u=ben-park',
    question: 'Should I pick the PPO or the HDHP?',
    answerExcerpt: 'It depends on how you use care. The HDHP has a $3,200 individual deductible but lower premiums and unlocks the HSA. The PPO has a $750 deductible and copays...',
    citations: ['Aetna PPO 2026 Summary', 'Aetna HDHP 2026 Summary', 'HSA Eligibility & Contribution Limits'],
    ts: '4 min ago',
  },
  {
    id: 'c2',
    surface: 'ask',
    employeeFirstName: 'Lila',
    employeePhotoUrl: 'https://i.pravatar.cc/150?u=lila-nakamura',
    question: 'Is my domestic partner eligible for dental coverage?',
    answerExcerpt: 'Yes — domestic partners are eligible for dental, vision, and medical, with a signed affidavit and one secondary proof-of-residency document...',
    citations: ['Domestic Partner & Dependent Definitions', 'Delta Dental 2026 Plan'],
    ts: '12 min ago',
  },
  {
    id: 'c3',
    surface: 'benefits-page',
    employeeFirstName: 'Jordan',
    employeePhotoUrl: 'https://i.pravatar.cc/150?u=jordan-bell',
    question: 'How much can I contribute to my 401(k) this year?',
    answerExcerpt: 'For 2026, the IRS limit is $23,500. If you turn 50 this year, you can contribute an additional $7,500 catch-up...',
    citations: ['Fidelity 401(k) Plan Document'],
    ts: '23 min ago',
  },
  {
    id: 'c4',
    surface: 'enrollment-flow',
    employeeFirstName: 'Owen',
    employeePhotoUrl: 'https://i.pravatar.cc/150?u=owen-reyes',
    question: 'Do I need to name a beneficiary for life insurance?',
    answerExcerpt: 'Yes. The voluntary life policy requires at least one primary beneficiary with a percentage allocation that totals 100%...',
    citations: ['Voluntary Life & AD&D Schedule'],
    ts: '38 min ago',
  },
  {
    id: 'c5',
    surface: 'ask',
    employeeFirstName: 'Sage',
    employeePhotoUrl: 'https://i.pravatar.cc/150?u=sage-olsen',
    question: 'When does my coverage start?',
    answerExcerpt: 'Your 2026 elections take effect Jan 1, 2026. Anything you elect during open enrollment doesn\'t change your current 2025 coverage...',
    citations: ['Eligibility Rules — Full-Time, Part-Time, Variable Hour'],
    ts: '1 hr ago',
  },
];

export const cycleDates = {
  opensOn: 'Oct 14, 2025',
  closesOn: 'Oct 27, 2025',
  effectiveOn: 'Jan 1, 2026',
};

export const stageStats = {
  setup: {
    docsImported: 12,
    eligibilityRulesGenerated: 17,
    reminderTiers: 4,
  },
  active: {
    totalEmployees: 247,
    complete: 197,
    inProgress: 38,
    notStarted: 23,
    incomplete: 6,
    daysRemaining: 6,
  },
  final48: {
    holdouts: 12,
    managersLooped: 8,
    expectedClose: 'Oct 27, 5:00 PM',
  },
  closed: {
    completionRate: 99.6,
    onTime: true,
    exceptionsHandled: 14,
    assistantConversations: 612,
    hoursSavedVsLastYear: 38,
  },
};

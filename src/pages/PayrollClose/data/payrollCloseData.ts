export type CycleStage = 'active' | 'approval' | 'closed';

export type ExceptionType = 'outside-policy' | 'pending-edit' | 'missing-punch';

export type AssistantOutcome = 'resolved' | 'routed-to-maya';

export interface TimesheetException {
  id: string;
  type: ExceptionType;
  employee: { firstName: string; lastName: string; jobTitle: string; department: string; photoUrl: string };
  headline: string;
  context: string;
  whyJudgmentNeeded: string;
  suggestedAction: string;
  receivedAt: string;
}

export interface PayrollAssistantConversation {
  id: string;
  outcome: AssistantOutcome;
  employeeFirstName: string;
  employeeLastName: string;
  employeePhotoUrl: string;
  question: string;
  answerExcerpt: string;
  citations: string[];
  routedReason?: string;
  ts: string;
}

export const cycleDates = {
  periodStart: 'Apr 14, 2026',
  periodEnd: 'Apr 25, 2026',
  approvalDeadline: 'Thu Apr 30, 4:00 PM',
  paycheckDate: 'Fri May 1, 2026',
};

export const stageStats = {
  active: {
    totalEmployees: 247,
    timesheetsSubmitted: 198,
    cleanSoFar: 184,
    exceptionsSoFar: 6,
    questionsThisWeek: 39,
    questionsResolvedByAssistant: 36,
  },
  approval: {
    totalEmployees: 247,
    autoApproved: 229,
    exceptions: 4,
    questionsThisCycle: 47,
    questionsRoutedToMaya: 4,
    timesheetsTotal: 247,
    timesheetsApproved: 243,
  },
  closed: {
    totalPayroll: 2_184_300,
    employeesPaid: 247,
    onTime: true,
    exceptionsHandled: 4,
    assistantConversations: 47,
    hoursSavedVsLastYear: 9,
  },
};

export const timesheetExceptions: TimesheetException[] = [
  {
    id: 'tx1',
    type: 'outside-policy',
    employee: { firstName: 'Marcus', lastName: 'Diaz', jobTitle: 'Software Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/150?u=marcus-diaz' },
    headline: '53 hours logged · 13 hours of unapproved overtime',
    context: 'Marcus logged 53 hours over the period. Standard week is 40 hours. The 13 OT hours fell on Apr 22–24, during the analytics rewrite freeze. No OT approval on file.',
    whyJudgmentNeeded: 'Daniel Chen verbally approved the push but didn\'t submit the OT request in Bamboo. You can either approve retroactively or kick back to Daniel for the formal approval.',
    suggestedAction: 'Approve OT and ping Daniel to file the form going forward.',
    receivedAt: 'Wed 2:14 PM',
  },
  {
    id: 'tx2',
    type: 'pending-edit',
    employee: { firstName: 'Helena', lastName: 'Vu', jobTitle: 'Senior Software Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/150?u=helena-vu' },
    headline: 'Retroactive correction for Apr 17 · -30 min',
    context: 'Helena submitted a correction reducing Apr 17 by 30 minutes. Her original entry showed 8.5 hours; she says she clocked out for an unpaid coffee with a candidate. Manager (Daniel Chen) approved the edit on Apr 22.',
    whyJudgmentNeeded: 'This is a downward adjustment Helena flagged on her own. Standard policy is to accept self-reported reductions, but this one happened mid-cycle and the original entry already feeds into a delivery report.',
    suggestedAction: 'Accept the correction. The hour difference is small enough that no downstream report needs reissue.',
    receivedAt: 'Wed 4:42 PM',
  },
  {
    id: 'tx3',
    type: 'missing-punch',
    employee: { firstName: 'Roman', lastName: 'Velazquez', jobTitle: 'Software Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/150?u=roman-velazquez' },
    headline: 'Apr 22 · clocked in 8:48 AM, no clock-out',
    context: 'Roman clocked in at 8:48 AM on Apr 22 and never clocked out. Calendar shows him on a 4:00 PM Slack call and his last commit landed at 5:23 PM. Slack activity continued until 5:47 PM.',
    whyJudgmentNeeded: 'I can suggest 5:47 PM as the clock-out based on activity signal, but it\'s an inference. Roman should confirm.',
    suggestedAction: 'Send Roman a one-click confirmation prompt for 5:47 PM.',
    receivedAt: 'Thu 9:12 AM',
  },
  {
    id: 'tx4',
    type: 'outside-policy',
    employee: { firstName: 'Felix', lastName: 'Aragón', jobTitle: 'Account Executive', department: 'Sales', photoUrl: 'https://i.pravatar.cc/150?u=felix-aragon' },
    headline: 'Worked through unpaid lunch on 3 days',
    context: 'Felix\'s shift schedule includes a 30-minute unpaid lunch each day. On Apr 16, 18, and 24 he logged continuous time across the lunch window. Pattern matches "ate at desk during a customer escalation."',
    whyJudgmentNeeded: 'CA labor law requires a 30-minute meal break after 5 hours; the pattern is a compliance flag. Either the lunch was actually taken (correct the timesheet) or it wasn\'t (he\'s owed premium pay and the lunch break needs to be rescheduled going forward).',
    suggestedAction: 'Reach out to Felix and his manager. Treat as a coaching moment, not a payroll override.',
    receivedAt: 'Thu 10:28 AM',
  },
];

export const payrollAssistantConversations: PayrollAssistantConversation[] = [
  {
    id: 'pa1',
    outcome: 'resolved',
    employeeFirstName: 'Sage',
    employeeLastName: 'Olsen',
    employeePhotoUrl: 'https://i.pravatar.cc/150?u=sage-olsen',
    question: 'Why does my paycheck look different this period?',
    answerExcerpt: 'Your 401(k) contribution went up by 1% on Apr 1 (you set this in March). That added ~$74 to pre-tax deductions. Your gross is unchanged.',
    citations: ['Pay statement Apr 1, 2026', '401(k) elections history'],
    ts: '2 hours ago',
  },
  {
    id: 'pa2',
    outcome: 'resolved',
    employeeFirstName: 'Ben',
    employeeLastName: 'Park',
    employeePhotoUrl: 'https://i.pravatar.cc/150?u=ben-park',
    question: 'Did my Apr 17 timesheet correction go through?',
    answerExcerpt: 'Yes — the correction was approved by Daniel Chen on Apr 22 and is reflected in this period\'s pay. The 0.5 hour adjustment shows on line 4 of your statement.',
    citations: ['Timesheet edit log', 'Pay statement (preview)'],
    ts: '3 hours ago',
  },
  {
    id: 'pa3',
    outcome: 'resolved',
    employeeFirstName: 'Jordan',
    employeeLastName: 'Bell',
    employeePhotoUrl: 'https://i.pravatar.cc/150?u=jordan-bell',
    question: 'When does the garnishment stop?',
    answerExcerpt: 'Your wage garnishment is scheduled to end after the May 30, 2026 paycheck. That gives you 3 more deductions, including this period.',
    citations: ['Garnishment order #G-2024-0117', 'Deduction schedule'],
    ts: '5 hours ago',
  },
  {
    id: 'pa4',
    outcome: 'resolved',
    employeeFirstName: 'Theo',
    employeeLastName: 'Marsh',
    employeePhotoUrl: 'https://i.pravatar.cc/150?u=theo-marsh',
    question: 'Is my Q2 bonus in this run?',
    answerExcerpt: 'No — Q2 commissions and bonuses run on May 15 as an off-cycle. You\'ll see two separate deposits next month: regular pay May 1, bonuses May 15.',
    citations: ['Sales comp plan FY26', 'Off-cycle payroll calendar'],
    ts: '6 hours ago',
  },
  {
    id: 'pa5',
    outcome: 'resolved',
    employeeFirstName: 'Lila',
    employeeLastName: 'Nakamura',
    employeePhotoUrl: 'https://i.pravatar.cc/150?u=lila-nakamura',
    question: 'When is my next paycheck?',
    answerExcerpt: 'Friday May 1, 2026. Pay period covered Apr 14 – Apr 25. You can preview your pay statement now from the Pay tab.',
    citations: ['Payroll calendar 2026'],
    ts: '8 hours ago',
  },
  {
    id: 'pa6',
    outcome: 'routed-to-maya',
    employeeFirstName: 'Imani',
    employeeLastName: 'Bryant',
    employeePhotoUrl: 'https://i.pravatar.cc/150?u=imani-bryant',
    question: 'I think my last paycheck was off by ~$450',
    answerExcerpt: 'I pulled the math: gross is correct, federal withholding looks correct, but state tax went up by $452 vs. last period. Imani\'s W-4 hasn\'t changed and her gross was the same. This looks like a withholding configuration issue, not a payment issue.',
    citations: ['Pay statement Apr 17, 2026', 'Pay statement Apr 3, 2026', 'W-4 on file', 'State tax tables'],
    routedReason: 'Withholding setup needs your check before I respond.',
    ts: 'Yesterday',
  },
  {
    id: 'pa7',
    outcome: 'routed-to-maya',
    employeeFirstName: 'Hana',
    employeeLastName: 'Iwasaki',
    employeePhotoUrl: 'https://i.pravatar.cc/150?u=hana-iwasaki',
    question: 'Can I get a $1,500 pay advance before next payday?',
    answerExcerpt: 'Hana is asking for a $1,500 advance. She has 2.4 years of tenure, never requested an advance before, and her next paycheck (May 1) net would cover the advance. Company policy allows up to $2,000 with HR approval.',
    citations: ['Pay advance policy', 'Hana\'s tenure record', 'Net pay forecast'],
    routedReason: 'Pay advances always need your approval.',
    ts: 'Yesterday',
  },
];

export const cleanApprovalSummary = {
  count: 229,
  totalHours: 9_452,
  byDepartment: [
    { department: 'Engineering', count: 78, totalHours: 3_120 },
    { department: 'Sales', count: 42, totalHours: 1_680 },
    { department: 'Customer Success', count: 38, totalHours: 1_520 },
    { department: 'Product', count: 22, totalHours: 880 },
    { department: 'Design', count: 18, totalHours: 720 },
    { department: 'Marketing', count: 16, totalHours: 640 },
    { department: 'People Ops', count: 9, totalHours: 360 },
    { department: 'Other', count: 6, totalHours: 532 },
  ],
};

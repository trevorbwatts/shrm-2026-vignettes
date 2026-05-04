/**
 * Automations data.
 *
 * Every employee reference is an `employeeId` that resolves through
 * `homeCast.ts`. No inline names or avatars — keep the cast canonical
 * so the same Priya Shah / Marcus Thompson / etc. shows up everywhere.
 */

export interface AutomationLastRun {
  contacted: number;
  resolved: number;
  inProgress: number;
  needsHelp: number;
  summary: string;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  icon: string;
  schedule: string;
  isActive: boolean;
  lastRunAt?: string;
  lastRun?: AutomationLastRun;
}

export interface ExceptionTimelineEntry {
  date: string;
  action: string;
  status: string;
}

export interface AutomationException {
  id: string;
  automationId: string;
  employeeId: string;
  issue: string;
  issueDescription: string;
  daysOverdue: number;
  aiInsight: string;
  timeline: ExceptionTimelineEntry[];
}

/**
 * Audit-log style log entry for the Automations feed.
 *
 * `parts` is a sentence broken into segments. Highlighted segments render
 * green (the changed entity, the affected employee). Plain segments render
 * neutral.
 */
export interface AutomationLogPart {
  text: string;
  highlight?: boolean;
}

export interface AutomationLogEntry {
  id: string;
  automationId: string;
  icon: string;
  parts: AutomationLogPart[];
  category: string;
  timestamp: string;
}

export interface AutomationLogTemplate {
  automationId: string;
  icon: string;
  parts: AutomationLogPart[];
  category: string;
}

export interface OvernightSummary {
  exceptions: AutomationException[];
}

export const automations: Automation[] = [
  {
    id: 'missing-data',
    name: 'Missing Data Follow-up',
    description: 'Identifies and contacts employees with incomplete required fields',
    icon: 'clipboard-list-check-regular',
    schedule: 'Daily at 7:00 AM',
    isActive: true,
    lastRunAt: 'Today at 7:00 AM',
    lastRun: {
      contacted: 12,
      resolved: 8,
      inProgress: 3,
      needsHelp: 1,
      summary: '12 contacted, 8 resolved',
    },
  },
  {
    id: 'document-expiration',
    name: 'Document Expiration Alerts',
    description: 'Notifies employees and managers when work permits, certifications, or contracts are expiring',
    icon: 'file-circle-exclamation-regular',
    schedule: 'Weekly on Mondays',
    isActive: true,
    lastRunAt: 'Monday at 9:00 AM',
    lastRun: {
      contacted: 5,
      resolved: 4,
      inProgress: 1,
      needsHelp: 0,
      summary: '5 notified, 4 acknowledged',
    },
  },
  {
    id: 'birthday-anniversary',
    name: 'Birthday & Anniversary Messages',
    description: 'Sends personalized celebration messages on employee milestones',
    icon: 'cake-candles-regular',
    schedule: 'Daily',
    isActive: true,
    lastRunAt: 'Today at 6:00 AM',
    lastRun: {
      contacted: 3,
      resolved: 3,
      inProgress: 0,
      needsHelp: 0,
      summary: '3 messages sent',
    },
  },
  {
    id: 'new-hire-checkins',
    name: 'New Hire Check-ins',
    description: 'Schedules 1-week, 30-day, and 90-day check-in nudges for new hires',
    icon: 'user-plus-regular',
    schedule: 'Triggered by start date',
    isActive: true,
    lastRunAt: 'Yesterday at 4:00 PM',
    lastRun: {
      contacted: 2,
      resolved: 2,
      inProgress: 0,
      needsHelp: 0,
      summary: '2 check-ins scheduled',
    },
  },
  {
    id: 'compliance-training',
    name: 'Compliance Training Reminders',
    description: 'Tracks training completion and follows up with non-completers',
    icon: 'shield-check-regular',
    schedule: 'Weekly on Fridays',
    isActive: false,
    lastRunAt: 'Paused on Apr 22',
  },
];

export const overnightSummary: OvernightSummary = {
  exceptions: [
    {
      id: 'marcus-thompson-dd',
      automationId: 'missing-data',
      employeeId: 'marcus-thompson',
      issue: 'Direct deposit info',
      issueDescription: 'Direct deposit information has not been submitted.',
      daysOverdue: 12,
      aiInsight:
        "Marcus has opened all three of my reminders but hasn't submitted. He may have a question or need help — this looks like a person, not a process, problem.",
      timeline: [
        { date: 'Apr 17', action: 'Sent first reminder', status: 'Opened' },
        { date: 'Apr 22', action: 'Sent follow-up', status: 'Opened' },
        { date: 'Apr 26', action: 'Sent final reminder + Slack DM', status: 'Opened twice' },
      ],
    },
  ],
};

export const weeklyTaskCount = 47;

// Helpers for building log sentences. `t` = plain segment, `h` = highlight.
const t = (text: string): AutomationLogPart => ({ text });
const h = (text: string): AutomationLogPart => ({ text, highlight: true });

export const initialAutomationLogEntries: AutomationLogEntry[] = [
  {
    id: 'log-1',
    automationId: 'missing-data',
    icon: 'address-card-regular',
    parts: [h('Emergency contact info'), t(' was added for '), h('Priya Shah')],
    category: 'Employee Records',
    timestamp: 'Yesterday · 11:42 PM',
  },
  {
    id: 'log-2',
    automationId: 'missing-data',
    icon: 'id-card-regular',
    parts: [h('I-9 Section 1'), t(' was validated for '), h('Devon Carter')],
    category: 'Employee Records',
    timestamp: 'Yesterday · 9:17 PM',
  },
  {
    id: 'log-3',
    automationId: 'missing-data',
    icon: 'file-invoice-dollar-regular',
    parts: [h('W-4 form'), t(' was filed for '), h('Hannah Reyes')],
    category: 'Payroll',
    timestamp: 'Yesterday · 8:03 PM',
  },
  {
    id: 'log-4',
    automationId: 'missing-data',
    icon: 'location-dot-regular',
    parts: [h('Mailing address'), t(' was confirmed for '), h('Theo Lambert')],
    category: 'Employee Records',
    timestamp: 'Yesterday · 7:48 PM',
  },
  {
    id: 'log-5',
    automationId: 'compliance-training',
    icon: 'shield-check-regular',
    parts: [h('2026 handbook'), t(' was acknowledged by '), h('Riley Chen')],
    category: 'Compliance',
    timestamp: 'Yesterday · 6:34 PM',
  },
  {
    id: 'log-6',
    automationId: 'birthday-anniversary',
    icon: 'cake-candles-regular',
    parts: [h('6-year anniversary message'), t(' was sent to '), h('Sarah Chen')],
    category: 'Recognition',
    timestamp: 'Today · 6:00 AM',
  },
  {
    id: 'log-7',
    automationId: 'new-hire-checkins',
    icon: 'calendar-check-regular',
    parts: [h('30-day check-in'), t(' was scheduled for '), h("Liam O'Connor")],
    category: 'New Hires',
    timestamp: 'Yesterday · 5:18 PM',
  },
  {
    id: 'log-8',
    automationId: 'new-hire-checkins',
    icon: 'calendar-check-regular',
    parts: [h('1-week check-in'), t(' was scheduled for '), h('Owen Bradley')],
    category: 'New Hires',
    timestamp: 'Yesterday · 4:00 PM',
  },
];

/**
 * Live feed pool. Each template is a stable (employee × action) pair drawn
 * from the canonical cast — never a stranger you've never seen before.
 */
export const automationLogTemplates: AutomationLogTemplate[] = [
  {
    automationId: 'missing-data',
    icon: 'address-card-regular',
    parts: [h('Emergency contact info'), t(' was updated for '), h('Riley Chen')],
    category: 'Employee Records',
  },
  {
    automationId: 'missing-data',
    icon: 'bell-slash-regular',
    parts: [h('Direct deposit reminders'), t(' were paused for '), h('Marcus Thompson')],
    category: 'Payroll',
  },
  {
    automationId: 'birthday-anniversary',
    icon: 'cake-candles-regular',
    parts: [h('Birthday message'), t(' was sent to '), h('Aisha Williams')],
    category: 'Recognition',
  },
  {
    automationId: 'missing-data',
    icon: 'file-invoice-dollar-regular',
    parts: [h('Tax form'), t(' was refiled for '), h('Diego Rodriguez')],
    category: 'Payroll',
  },
  {
    automationId: 'compliance-training',
    icon: 'shield-check-regular',
    parts: [h('Handbook'), t(' was acknowledged by '), h('James Kim')],
    category: 'Compliance',
  },
  {
    automationId: 'document-expiration',
    icon: 'file-certificate-regular',
    parts: [h('PHR certification renewal'), t(' was scheduled for '), h('Naomi Brooks')],
    category: 'Documents',
  },
  {
    automationId: 'document-expiration',
    icon: 'file-circle-exclamation-regular',
    parts: [h('Work permit renewal'), t(' was started for '), h('Tom Bennett')],
    category: 'Documents',
  },
  {
    automationId: 'new-hire-checkins',
    icon: 'calendar-check-regular',
    parts: [h('45-day pulse check'), t(' was sent to '), h("Liam O'Connor")],
    category: 'New Hires',
  },
  {
    automationId: 'birthday-anniversary',
    icon: 'cake-candles-regular',
    parts: [h('Birthday message'), t(' was sent to '), h('Hannah Nguyen')],
    category: 'Recognition',
  },
  {
    automationId: 'missing-data',
    icon: 'building-columns-regular',
    parts: [h('Direct deposit information'), t(' was updated for '), h('Raj Mehta')],
    category: 'Payroll',
  },
  {
    automationId: 'birthday-anniversary',
    icon: 'cake-candles-regular',
    parts: [h('8-year anniversary message'), t(' was drafted for '), h('Olivia Martinez')],
    category: 'Recognition',
  },
  {
    automationId: 'birthday-anniversary',
    icon: 'cake-candles-regular',
    parts: [h('Birthday message'), t(' was sent to '), h('Priya Patel')],
    category: 'Recognition',
  },
];

let _logIdCounter = 1000;

export function generateLiveLogEntry(): AutomationLogEntry {
  const template =
    automationLogTemplates[Math.floor(Math.random() * automationLogTemplates.length)];
  _logIdCounter += 1;
  return {
    id: `log-live-${_logIdCounter}`,
    automationId: template.automationId,
    icon: template.icon,
    parts: template.parts,
    category: template.category,
    timestamp: 'Just now',
  };
}

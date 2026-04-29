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
  employee: {
    name: string;
    role: string;
    department: string;
    avatar: string;
  };
  issue: string;
  issueDescription: string;
  daysOverdue: number;
  aiInsight: string;
  timeline: ExceptionTimelineEntry[];
}

export interface OvernightSummary {
  since: string;
  totalResolved: number;
  totalContacted: number;
  automationsRun: number;
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
  since: 'yesterday at 5:32 PM',
  totalResolved: 8,
  totalContacted: 12,
  automationsRun: 3,
  exceptions: [
    {
      id: 'marcus-thompson-dd',
      automationId: 'missing-data',
      employee: {
        name: 'Marcus Thompson',
        role: 'Senior Designer',
        department: 'Design',
        avatar: 'https://i.pravatar.cc/120?u=marcus-thompson',
      },
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

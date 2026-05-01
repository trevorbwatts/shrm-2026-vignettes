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

export interface ResolvedTask {
  id: string;
  employeeName: string;
  employeeAvatar: string;
  detail: string;
  automationName: string;
  resolvedAt: string;
}

export type AutomationActivityStatus =
  | 'in-progress'
  | 'paused'
  | 'completed'
  | 'undone'
  | 'cancelled';

export interface AutomationActivity {
  id: string;
  status: AutomationActivityStatus;
  employeeName: string;
  employeeAvatar: string;
  detail: string;
  automationName: string;
  timestamp: string;
  steps: string[];
}

export interface ActivityTemplate {
  employeeName: string;
  employeeAvatar: string;
  detail: string;
  automationName: string;
  steps: string[];
}

export interface OvernightSummary {
  since: string;
  totalResolved: number;
  totalContacted: number;
  automationsRun: number;
  exceptions: AutomationException[];
  resolvedTasks: ResolvedTask[];
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
  resolvedTasks: [
    {
      id: 'r1',
      employeeName: 'Priya Shah',
      employeeAvatar: 'https://i.pravatar.cc/120?u=priya-shah',
      detail: 'Submitted emergency contact info',
      automationName: 'Missing Data Follow-up',
      resolvedAt: '11:42 PM',
    },
    {
      id: 'r2',
      employeeName: 'Devon Carter',
      employeeAvatar: 'https://i.pravatar.cc/120?u=devon-carter',
      detail: 'Completed I-9 Section 1',
      automationName: 'Missing Data Follow-up',
      resolvedAt: '9:17 PM',
    },
    {
      id: 'r3',
      employeeName: 'Hannah Reyes',
      employeeAvatar: 'https://i.pravatar.cc/120?u=hannah-reyes',
      detail: 'Submitted W-4',
      automationName: 'Missing Data Follow-up',
      resolvedAt: '8:03 PM',
    },
    {
      id: 'r4',
      employeeName: 'Theo Lambert',
      employeeAvatar: 'https://i.pravatar.cc/120?u=theo-lambert',
      detail: 'Confirmed mailing address',
      automationName: 'Missing Data Follow-up',
      resolvedAt: '7:48 PM',
    },
    {
      id: 'r5',
      employeeName: 'Ana Velasquez',
      employeeAvatar: 'https://i.pravatar.cc/120?u=ana-velasquez',
      detail: 'Uploaded direct deposit form',
      automationName: 'Missing Data Follow-up',
      resolvedAt: '6:12 PM',
    },
    {
      id: 'r6',
      employeeName: 'Jamal Brooks',
      employeeAvatar: 'https://i.pravatar.cc/120?u=jamal-brooks',
      detail: '5-year work anniversary message sent',
      automationName: 'Birthday & Anniversary Messages',
      resolvedAt: '6:00 AM',
    },
    {
      id: 'r7',
      employeeName: 'Sofia Pereira',
      employeeAvatar: 'https://i.pravatar.cc/120?u=sofia-pereira',
      detail: 'Birthday message sent',
      automationName: 'Birthday & Anniversary Messages',
      resolvedAt: '6:00 AM',
    },
    {
      id: 'r8',
      employeeName: 'Liam O\'Connor',
      employeeAvatar: 'https://i.pravatar.cc/120?u=liam-oconnor',
      detail: '30-day check-in scheduled with manager',
      automationName: 'New Hire Check-ins',
      resolvedAt: 'Yesterday 4:00 PM',
    },
  ],
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

export const initialAutomationActivities: AutomationActivity[] = [
  {
    id: 'act-1',
    status: 'completed',
    employeeName: 'Priya Shah',
    employeeAvatar: 'https://i.pravatar.cc/120?u=priya-shah',
    detail: 'Submitted emergency contact info',
    automationName: 'Missing Data Follow-up',
    timestamp: '11:42 PM',
    steps: [
      'Detected missing emergency contact field on Apr 28',
      'Sent reminder email at 9:30 PM',
      'Sent SMS nudge at 10:15 PM after no response',
      'Confirmed submission via mobile portal at 11:42 PM',
      'Updated HRIS record and closed the task',
    ],
  },
  {
    id: 'act-2',
    status: 'completed',
    employeeName: 'Devon Carter',
    employeeAvatar: 'https://i.pravatar.cc/120?u=devon-carter',
    detail: 'Completed I-9 Section 1',
    automationName: 'Missing Data Follow-up',
    timestamp: '9:17 PM',
    steps: [
      'Detected I-9 Section 1 incomplete on day 2',
      'Sent personalized walkthrough link at 6:00 PM',
      'Employee opened the link at 8:45 PM',
      'Section 1 submitted and validated at 9:17 PM',
    ],
  },
  {
    id: 'act-3',
    status: 'completed',
    employeeName: 'Hannah Reyes',
    employeeAvatar: 'https://i.pravatar.cc/120?u=hannah-reyes',
    detail: 'Submitted W-4',
    automationName: 'Missing Data Follow-up',
    timestamp: '8:03 PM',
    steps: [
      'Detected missing W-4 on Apr 27',
      'Sent reminder email with prefilled link',
      'Employee submitted W-4 at 8:03 PM',
      'Form filed and routed to payroll',
    ],
  },
  {
    id: 'act-4',
    status: 'completed',
    employeeName: 'Theo Lambert',
    employeeAvatar: 'https://i.pravatar.cc/120?u=theo-lambert',
    detail: 'Confirmed mailing address',
    automationName: 'Missing Data Follow-up',
    timestamp: '7:48 PM',
    steps: [
      'Flagged stale mailing address (last updated 2023)',
      'Sent confirmation request via email',
      'Employee confirmed address unchanged at 7:48 PM',
    ],
  },
  {
    id: 'act-5',
    status: 'completed',
    employeeName: 'Ana Velasquez',
    employeeAvatar: 'https://i.pravatar.cc/120?u=ana-velasquez',
    detail: 'Uploaded direct deposit form',
    automationName: 'Missing Data Follow-up',
    timestamp: '6:12 PM',
    steps: [
      'Detected missing direct deposit form',
      'Sent reminder with secure upload link',
      'Employee uploaded voided check at 6:12 PM',
      'Routed to payroll for verification',
    ],
  },
  {
    id: 'act-6',
    status: 'completed',
    employeeName: 'Jamal Brooks',
    employeeAvatar: 'https://i.pravatar.cc/120?u=jamal-brooks',
    detail: '5-year work anniversary message sent',
    automationName: 'Birthday & Anniversary Messages',
    timestamp: '6:00 AM',
    steps: [
      'Anniversary trigger fired at 6:00 AM',
      'Generated personalized message referencing role history',
      'Sent message via Slack and email',
    ],
  },
  {
    id: 'act-7',
    status: 'completed',
    employeeName: 'Sofia Pereira',
    employeeAvatar: 'https://i.pravatar.cc/120?u=sofia-pereira',
    detail: 'Birthday message sent',
    automationName: 'Birthday & Anniversary Messages',
    timestamp: '6:00 AM',
    steps: [
      'Birthday trigger fired at 6:00 AM',
      'Generated friendly message with manager cc',
      'Posted in #team-design and emailed Sofia',
    ],
  },
  {
    id: 'act-8',
    status: 'completed',
    employeeName: "Liam O'Connor",
    employeeAvatar: 'https://i.pravatar.cc/120?u=liam-oconnor',
    detail: '30-day check-in scheduled with manager',
    automationName: 'New Hire Check-ins',
    timestamp: 'Yesterday 4:00 PM',
    steps: [
      'Detected 30-day milestone for Liam',
      "Found a 30-min slot on manager's calendar",
      'Drafted check-in prompts and shared with manager',
      'Calendar invite sent and accepted',
    ],
  },
];

export const activityTemplates: ActivityTemplate[] = [
  {
    employeeName: 'Riley Chen',
    employeeAvatar: 'https://i.pravatar.cc/120?u=riley-chen',
    detail: 'Submitted emergency contact info',
    automationName: 'Missing Data Follow-up',
    steps: [
      'Detected missing emergency contact field',
      'Sent personalized email reminder',
      'Employee opened reminder on mobile',
      'Submission received and HRIS updated',
    ],
  },
  {
    employeeName: 'Marisol Vega',
    employeeAvatar: 'https://i.pravatar.cc/120?u=marisol-vega',
    detail: 'Acknowledged updated handbook',
    automationName: 'Compliance Training Reminders',
    steps: [
      'Flagged unacknowledged 2026 handbook',
      'Sent reminder with 2-min summary of changes',
      'Acknowledgement recorded with signed timestamp',
    ],
  },
  {
    employeeName: 'Nathan Park',
    employeeAvatar: 'https://i.pravatar.cc/120?u=nathan-park',
    detail: 'Work permit renewal in motion',
    automationName: 'Document Expiration Alerts',
    steps: [
      'Detected work permit expiring in 45 days',
      'Notified Nathan and his manager',
      'Started renewal task in immigration vendor portal',
    ],
  },
  {
    employeeName: 'Aisha Patel',
    employeeAvatar: 'https://i.pravatar.cc/120?u=aisha-patel',
    detail: 'Birthday message sent',
    automationName: 'Birthday & Anniversary Messages',
    steps: [
      'Birthday trigger fired',
      'Generated personalized message with team highlights',
      'Posted in #team-eng and emailed Aisha',
    ],
  },
  {
    employeeName: 'Marcus Thompson',
    employeeAvatar: 'https://i.pravatar.cc/120?u=marcus-thompson',
    detail: 'Direct deposit reminder #4 paused',
    automationName: 'Missing Data Follow-up',
    steps: [
      'Reminder #3 ignored — opened twice, no submission',
      'Paused further reminders to avoid nagging',
      'Routed exception to HR for human follow-up',
    ],
  },
  {
    employeeName: 'Eva Lindqvist',
    employeeAvatar: 'https://i.pravatar.cc/120?u=eva-lindqvist',
    detail: 'Tax form refiled after correction',
    automationName: 'Missing Data Follow-up',
    steps: [
      'Detected tax form rejected by payroll provider',
      'Sent corrected template with highlighted fields',
      'Employee resubmitted within 12 minutes',
      'Payroll provider accepted the new submission',
    ],
  },
  {
    employeeName: 'Owen Bradley',
    employeeAvatar: 'https://i.pravatar.cc/120?u=owen-bradley',
    detail: '1-week check-in scheduled',
    automationName: 'New Hire Check-ins',
    steps: [
      '7-day milestone reached for Owen',
      "Found 30-min slot on manager's calendar",
      'Drafted check-in prompts and sent invite',
    ],
  },
  {
    employeeName: 'Helena Ortiz',
    employeeAvatar: 'https://i.pravatar.cc/120?u=helena-ortiz',
    detail: '10-year anniversary message sent',
    automationName: 'Birthday & Anniversary Messages',
    steps: [
      'Anniversary trigger fired',
      'Pulled milestones and team callouts from history',
      'Posted message and notified leadership',
    ],
  },
  {
    employeeName: 'Caleb Nguyen',
    employeeAvatar: 'https://i.pravatar.cc/120?u=caleb-nguyen',
    detail: 'I-9 Section 2 reminder sent to manager',
    automationName: 'Missing Data Follow-up',
    steps: [
      'Detected Section 2 incomplete past 3-day deadline',
      "Notified Caleb's manager with completion link",
      'Tracking acknowledgement',
    ],
  },
  {
    employeeName: 'Zoe Hernandez',
    employeeAvatar: 'https://i.pravatar.cc/120?u=zoe-hernandez',
    detail: 'Certification renewal scheduled',
    automationName: 'Document Expiration Alerts',
    steps: [
      'PHR certification expires in 60 days',
      'Sent renewal options and study guide link',
      'Scheduled reminder for 30 days out',
    ],
  },
];

let _activityIdCounter = 1000;
export function generateLiveActivity(): AutomationActivity {
  const template =
    activityTemplates[Math.floor(Math.random() * activityTemplates.length)];
  _activityIdCounter += 1;
  return {
    ...template,
    id: `live-${_activityIdCounter}`,
    status: 'in-progress',
    timestamp: 'Working now…',
  };
}

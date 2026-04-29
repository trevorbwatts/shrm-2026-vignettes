// Inbox prototype data — types, sidebar hierarchy, mock requests, mock detail payloads.

export type InboxSection = 'inbox' | 'completed' | 'sent';
export type InboxAssignment = 'me' | 'company';

// ---------- Detail payloads (discriminated union per request type) ----------

export interface DiffField {
  label: string;
  value: string;
}

export interface CompensationDetail {
  kind: 'compensation';
  reason?: string;
  comments?: string;
  edited: DiffField[];
  old: DiffField[];
}

export interface InfoUpdateDetail {
  kind: 'info-update';
  hiredOn: string;
  department: string;
  location: string;
  added: DiffField[];
}

export interface AssetDetail {
  kind: 'asset';
  role: string;
  reportsTo: string;
  added: DiffField[];
  comments?: { author: string; avatar: string; date: string; body: string }[];
}

export interface EmploymentStatusDetail {
  kind: 'employment-status';
  comments?: string;
  edited: DiffField[];
  old: DiffField[];
}

export interface JobInfoDetail {
  kind: 'job-info';
  edited: DiffField[];
  old: DiffField[];
  jobInfoEdited?: DiffField[];
  jobInfoOld?: DiffField[];
}

export interface TimeOffDetail {
  kind: 'time-off';
  hours: number;
  policy: string;
  startDate: string;
  endDate: string;
  warning?: string;
  calendarNote?: string;
  monthLabel: string;
  selectedRange: { start: number; end: number };
  whoElseOut: { name: string; avatar: string; dateRange: string }[];
}

export interface OnboardingTaskDetail {
  kind: 'onboarding-task';
  taskTitle: string;
  body: string;
  assignedBy: string;
  assignedDate: string;
}

export interface OffboardingTaskDetail {
  kind: 'offboarding-task';
  taskTitle: string;
  forEmployee: string;
  date: string;
}

export interface SignatureDetail {
  kind: 'signature';
  documentName: string;
  regarding: string;
  prompt: string;
  completedDate?: string;
}

export interface FeedbackDetail {
  kind: 'feedback';
  cycle: string;
  questions: string[];
  pairs: {
    employee: { name: string; title: string; location: string; avatar: string };
    reviewers: { name: string }[];
  }[];
  completedDate: string;
}

export type RequestDetail =
  | CompensationDetail
  | InfoUpdateDetail
  | AssetDetail
  | EmploymentStatusDetail
  | JobInfoDetail
  | TimeOffDetail
  | OnboardingTaskDetail
  | OffboardingTaskDetail
  | SignatureDetail
  | FeedbackDetail;

// ---------- Inbox request ----------

export type RequestStatus = 'pending' | 'approved' | 'completed' | 'denied' | 'signed' | 'sent';

export interface InboxRequest {
  id: string;
  title: string;
  date: string;
  subtitle: string;
  iconType: 'avatar' | 'document' | 'user' | 'feedback';
  avatarUrl?: string;
  dueStatus?: 'past-due' | 'due-soon' | null;
  section: InboxSection;
  assignment: InboxAssignment;
  category: string;
  subcategory?: string;
  status: RequestStatus;
  requesterName: string;
  requesterAvatar: string;
  requestSummary: string;
  detail: RequestDetail;
  assignee?: string;
  // For Sent variants:
  sentSubcategory?: string;
}

// ---------- Sidebar hierarchy ----------

export interface SidebarItem {
  id: string;
  label: string;
  count?: number;
  icon?: string;
  path: string;
  children?: SidebarItem[];
}

export interface SidebarGroup {
  id: InboxSection;
  label: string;
  count?: number;
  icon: string;
  path: string;
  children: SidebarItem[];
}

const inboxChildren: SidebarItem[] = [
  {
    id: 'approvals',
    label: 'Approvals',
    count: 13,
    icon: 'thumbs-up-regular',
    path: '/inbox/approvals',
    children: [
      { id: 'time-off-requests', label: 'Time Off Requests', count: 4, path: '/inbox/approvals/time-off-requests' },
      { id: 'information-updates', label: 'Information Updates', count: 1, path: '/inbox/approvals/information-updates' },
      { id: 'asset-request', label: 'Asset Request', count: 3, path: '/inbox/approvals/asset-request' },
      { id: 'compensation', label: 'Compensation', count: 3, path: '/inbox/approvals/compensation' },
      { id: 'employment-status', label: 'Employment Status', count: 1, path: '/inbox/approvals/employment-status' },
      { id: 'job-information', label: 'Job Information', count: 1, path: '/inbox/approvals/job-information' },
    ],
  },
  { id: 'onboarding', label: 'Onboarding', count: 1, icon: 'id-badge-regular', path: '/inbox/onboarding' },
];

const inboxChildrenCompany: SidebarItem[] = [
  ...inboxChildren.slice(0, 1),
  { id: 'promotion', label: 'Promotion', count: 1, path: '/inbox/promotion' },
  ...inboxChildren.slice(1),
  { id: 'offboarding-inbox', label: 'Offboarding', count: 1, icon: 'door-open-regular', path: '/inbox/offboarding' },
];

const completedChildren: SidebarItem[] = [
  {
    id: 'completed-approvals',
    label: 'Approvals',
    icon: 'thumbs-up-regular',
    path: '/inbox/completed/approvals',
    children: [
      { id: 'completed-time-off', label: 'Time Off Requests', path: '/inbox/completed/approvals/time-off-requests' },
      { id: 'completed-asset', label: 'Asset Request', path: '/inbox/completed/approvals/asset-request' },
    ],
  },
  { id: 'signatures', label: 'Signatures', icon: 'signature-regular', path: '/inbox/completed/signatures' },
  { id: 'completed-onboarding', label: 'Onboarding', icon: 'id-badge-regular', path: '/inbox/completed/onboarding' },
  { id: 'feedback', label: 'Feedback', icon: 'people-group-regular', path: '/inbox/completed/feedback' },
];

const sentChildren: SidebarItem[] = [
  {
    id: 'sent-approvals',
    label: 'Approvals',
    icon: 'thumbs-up-regular',
    path: '/inbox/sent/approvals',
    children: [
      { id: 'sent-time-off', label: 'Time Off Requests', path: '/inbox/sent/approvals/time-off-requests' },
      { id: 'sent-compensation', label: 'Compensation', path: '/inbox/sent/approvals/compensation' },
    ],
  },
  { id: 'sent-signatures', label: 'Signatures', icon: 'signature-regular', path: '/inbox/sent/signatures' },
  { id: 'sent-onboarding', label: 'Onboarding', icon: 'id-badge-regular', path: '/inbox/sent/onboarding' },
  { id: 'sent-offboarding', label: 'Offboarding', icon: 'door-open-regular', path: '/inbox/sent/offboarding' },
];

export const sidebarGroups: SidebarGroup[] = [
  { id: 'inbox', label: 'Inbox', count: 14, icon: 'inbox-regular', path: '/inbox', children: inboxChildren },
  { id: 'completed', label: 'Completed', icon: 'circle-check-regular', path: '/inbox/completed', children: completedChildren },
  { id: 'sent', label: 'Sent', icon: 'paper-plane-regular', path: '/inbox/sent', children: sentChildren },
];

export const sidebarGroupsCompany: SidebarGroup[] = [
  { id: 'inbox', label: 'Inbox', count: 139, icon: 'inbox-regular', path: '/inbox', children: inboxChildrenCompany },
  { id: 'completed', label: 'Completed', icon: 'circle-check-regular', path: '/inbox/completed', children: completedChildren },
  { id: 'sent', label: 'Sent', icon: 'paper-plane-regular', path: '/inbox/sent', children: sentChildren },
];

export const inboxTotalCount = 14;

// ---------- Avatar helper ----------

const av = (n: number) => `https://i.pravatar.cc/150?img=${n}`;

// ---------- Mock requests ----------

export const mockInboxRequests: InboxRequest[] = [
  // ===== Inbox / Approvals =====

  // --- Compensation (3) ---
  {
    id: 'comp-1',
    title: 'Charlotte Abbott',
    date: 'Oct 26, 2024',
    subtitle: "I'm requesting a Compensation Change for Amy Granger.",
    iconType: 'avatar',
    avatarUrl: av(47),
    section: 'inbox',
    assignment: 'me',
    category: 'approvals',
    subcategory: 'compensation',
    status: 'pending',
    requesterName: 'Charlotte Abbott',
    requesterAvatar: av(47),
    requestSummary: 'Compensation Change',
    detail: {
      kind: 'compensation',
      reason: 'Pay increase',
      comments: "Amy has been doing an awesome job and it's time she received a raise.",
      edited: [
        { label: 'Compensation: Date', value: '10/19/2020' },
      ],
      old: [
        { label: 'Compensation: Date', value: '08/01/2024' },
      ],
    },
  },
  {
    id: 'comp-2',
    title: 'Daniel Vance',
    date: 'Sep 23, 2024',
    subtitle: "I'm requesting a Compensation Change for Karin Petty.",
    iconType: 'avatar',
    avatarUrl: av(12),
    section: 'inbox',
    assignment: 'me',
    category: 'approvals',
    subcategory: 'compensation',
    status: 'pending',
    requesterName: 'Daniel Vance',
    requesterAvatar: av(12),
    requestSummary: 'Compensation Change',
    detail: {
      kind: 'compensation',
      reason: 'Annual review',
      comments: 'Promoting Karin to a Senior level given her impact this year.',
      edited: [{ label: 'Compensation: Date', value: '09/15/2024' }],
      old: [{ label: 'Compensation: Date', value: '01/01/2023' }],
    },
  },
  {
    id: 'comp-3',
    title: 'Shawn Murdock',
    date: 'Jul 24, 2024',
    subtitle: "I'm requesting a Compensation Change for Ashley Adams.",
    iconType: 'avatar',
    avatarUrl: av(33),
    section: 'inbox',
    assignment: 'me',
    category: 'approvals',
    subcategory: 'compensation',
    status: 'pending',
    requesterName: 'Shawn Murdock',
    requesterAvatar: av(33),
    requestSummary: 'Compensation Change',
    detail: {
      kind: 'compensation',
      reason: 'Cost of living',
      edited: [{ label: 'Compensation: Date', value: '07/15/2024' }],
      old: [{ label: 'Compensation: Date', value: '01/01/2023' }],
    },
  },

  // --- Asset Request (3) ---
  {
    id: 'asset-1',
    title: 'Charlotte Abbott',
    date: 'Oct 26, 2024',
    subtitle: "I'm requesting an Asset Request Change for Charlotte Abbott.",
    iconType: 'avatar',
    avatarUrl: av(47),
    section: 'inbox',
    assignment: 'me',
    category: 'approvals',
    subcategory: 'asset-request',
    status: 'pending',
    requesterName: 'Charlotte Abbott',
    requesterAvatar: av(47),
    requestSummary: 'Asset Request Change',
    detail: {
      kind: 'asset',
      role: 'Sr. HR Administrator',
      reportsTo: 'Reports Directly to Jennifer Caldwell',
      added: [
        { label: 'Asset Category', value: 'Corporate Card' },
        { label: 'Asset Description', value: 'Corporate credit card' },
        { label: 'Serial #', value: 'NA' },
        { label: 'Date Assigned', value: '10/07/2020' },
      ],
      comments: [
        {
          author: 'Charlotte Abbott',
          avatar: av(47),
          date: '10/26/2024 10:55 AM MDT',
          body: "For all the events stuff I'm helping with and per our conversation, I'd like to request a corporate credit to charge event materials.",
        },
      ],
    },
  },
  {
    id: 'asset-2',
    title: 'Charlotte Abbott',
    date: 'Oct 25, 2024',
    subtitle: "I'm requesting an Asset Request Change for Amy Granger.",
    iconType: 'avatar',
    avatarUrl: av(47),
    section: 'inbox',
    assignment: 'me',
    category: 'approvals',
    subcategory: 'asset-request',
    status: 'pending',
    requesterName: 'Charlotte Abbott',
    requesterAvatar: av(47),
    requestSummary: 'Asset Request Change',
    detail: {
      kind: 'asset',
      role: 'Customer Retention Manager',
      reportsTo: 'Reports Directly to Charlotte Abbott',
      added: [
        { label: 'Asset Category', value: 'Laptop' },
        { label: 'Asset Description', value: 'MacBook Pro 14"' },
        { label: 'Serial #', value: 'C02ZP1234567' },
        { label: 'Date Assigned', value: '10/25/2024' },
      ],
    },
  },
  {
    id: 'asset-3',
    title: 'Daniel Vance',
    date: 'Sep 23, 2024',
    subtitle: "I'm requesting an Asset Request Change for Debra Tuescher.",
    iconType: 'avatar',
    avatarUrl: av(12),
    section: 'inbox',
    assignment: 'me',
    category: 'approvals',
    subcategory: 'asset-request',
    status: 'pending',
    requesterName: 'Daniel Vance',
    requesterAvatar: av(12),
    requestSummary: 'Asset Request Change',
    detail: {
      kind: 'asset',
      role: 'Sales Coordinator',
      reportsTo: 'Reports Directly to Daniel Vance',
      added: [
        { label: 'Asset Category', value: 'Monitor' },
        { label: 'Asset Description', value: '27" 4K external display' },
        { label: 'Serial #', value: 'NA' },
        { label: 'Date Assigned', value: '09/23/2024' },
      ],
    },
  },

  // --- Time Off Requests (4) ---
  {
    id: 'time-1',
    title: 'Charlotte Abbott',
    date: 'Jun 7, 2024',
    subtitle: "I'm requesting 16 hours of Vacation for Jun 7, 2024 - Jun 10, 2024.",
    iconType: 'avatar',
    avatarUrl: av(47),
    section: 'inbox',
    assignment: 'me',
    category: 'approvals',
    subcategory: 'time-off-requests',
    status: 'pending',
    requesterName: 'Charlotte Abbott',
    requesterAvatar: av(47),
    requestSummary: '16 hours of Vacation',
    detail: {
      kind: 'time-off',
      hours: 16,
      policy: 'Vacation',
      startDate: 'Jun 7, 2024',
      endDate: 'Jun 10, 2024',
      monthLabel: 'Jun 2024',
      selectedRange: { start: 7, end: 10 },
      whoElseOut: [
        { name: 'Cheryl Barnet', avatar: av(45), dateRange: 'Jun 5 - 9, 2024' },
        { name: 'Maja Andev', avatar: av(48), dateRange: 'Jun 6 - 7, 2024' },
      ],
    },
  },
  {
    id: 'time-2',
    title: 'Maja Andev',
    date: 'Jun 26, 2024',
    subtitle: "I'm requesting 40 hours of Vacation for Oct 5, 2024 - Oct 9, 2024.",
    iconType: 'avatar',
    avatarUrl: av(48),
    section: 'inbox',
    assignment: 'me',
    category: 'approvals',
    subcategory: 'time-off-requests',
    status: 'pending',
    requesterName: 'Maja Andev',
    requesterAvatar: av(48),
    requestSummary: '40 hours of Vacation',
    detail: {
      kind: 'time-off',
      hours: 40,
      policy: 'Vacation',
      startDate: 'Oct 5, 2024',
      endDate: 'Oct 9, 2024',
      warning: 'This request will leave Maja Andev with -22.79 hours',
      calendarNote: "Going to Iowa for my cousin's wedding",
      monthLabel: 'Oct 2024',
      selectedRange: { start: 5, end: 9 },
      whoElseOut: [
        { name: 'Cheryl Barnet', avatar: av(45), dateRange: 'Oct 5 - 9, 2024' },
        { name: 'Maja Andev', avatar: av(48), dateRange: 'Oct 5 - 9, 2024' },
        { name: 'Trent Walsh', avatar: av(52), dateRange: 'Oct 4 - 7, 2024' },
        { name: 'Jake Bryan', avatar: av(53), dateRange: 'Oct 6 - 8, 2024' },
        { name: 'Dorothy Chou', avatar: av(40), dateRange: 'Oct 5 - 6, 2024' },
      ],
    },
  },
  {
    id: 'time-3',
    title: 'Jennifer Caldwell',
    date: 'Jun 26, 2024',
    subtitle: "I'm requesting 40 hours of Vacation for Aug 17, 2024 - Aug 21, 2024.",
    iconType: 'avatar',
    avatarUrl: av(31),
    section: 'inbox',
    assignment: 'me',
    category: 'approvals',
    subcategory: 'time-off-requests',
    status: 'pending',
    requesterName: 'Jennifer Caldwell',
    requesterAvatar: av(31),
    requestSummary: '40 hours of Vacation',
    detail: {
      kind: 'time-off',
      hours: 40,
      policy: 'Vacation',
      startDate: 'Aug 17, 2024',
      endDate: 'Aug 21, 2024',
      monthLabel: 'Aug 2024',
      selectedRange: { start: 17, end: 21 },
      whoElseOut: [
        { name: 'Cheryl Barnet', avatar: av(45), dateRange: 'Aug 17 - 21, 2024' },
        { name: 'Maja Andev', avatar: av(48), dateRange: 'Aug 17 - 21, 2024' },
        { name: 'Trent Walsh', avatar: av(52), dateRange: 'Aug 19 - 21, 2024' },
      ],
    },
  },
  {
    id: 'time-4',
    title: 'Charlotte Abbott',
    date: 'Sep 5, 2024',
    subtitle: "I'm requesting 40 hours of Vacation for Sep 5, 2024 - Sep 11, 2024.",
    iconType: 'avatar',
    avatarUrl: av(47),
    section: 'inbox',
    assignment: 'me',
    category: 'approvals',
    subcategory: 'time-off-requests',
    status: 'pending',
    requesterName: 'Charlotte Abbott',
    requesterAvatar: av(47),
    requestSummary: '40 hours of Vacation',
    detail: {
      kind: 'time-off',
      hours: 40,
      policy: 'Vacation',
      startDate: 'Sep 5, 2024',
      endDate: 'Sep 11, 2024',
      monthLabel: 'Sep 2024',
      selectedRange: { start: 5, end: 11 },
      whoElseOut: [
        { name: 'Daniel Vance', avatar: av(12), dateRange: 'Sep 5 - 9, 2024' },
        { name: 'Holly Hartley', avatar: av(28), dateRange: 'Sep 9 - 11, 2024' },
      ],
    },
  },

  // --- Information Updates (1) ---
  {
    id: 'info-1',
    title: 'Javier Cruz',
    date: 'Jun 30, 2024',
    subtitle: "I'm requesting an update to my personal information.",
    iconType: 'avatar',
    avatarUrl: av(60),
    section: 'inbox',
    assignment: 'me',
    category: 'approvals',
    subcategory: 'information-updates',
    status: 'pending',
    requesterName: 'Javier Cruz',
    requesterAvatar: av(60),
    requestSummary: 'Change Information Request',
    detail: {
      kind: 'info-update',
      hiredOn: 'Hired on May 30, 2024',
      department: 'Marketing',
      location: 'Lindon, Utah',
      added: [
        { label: 'Dependent First Name', value: 'Santiago' },
        { label: 'Dependent Middle Name', value: 'Javier' },
        { label: 'Dependent Last Name', value: 'Cruz' },
        { label: 'Dependent Birth Date', value: '04/25/2017' },
        { label: 'Dependent Gender', value: 'Male' },
        { label: 'Dependent Relationship', value: 'Child' },
        { label: 'Dependent Street 1', value: '658 E 100 N' },
        { label: 'Dependent City', value: 'Lindon' },
        { label: 'Dependent State', value: 'UT' },
        { label: 'Dependent ZIP Code', value: '84042' },
        { label: 'Dependent Country', value: 'United States' },
        { label: 'Dependent US Citizen', value: 'Yes' },
      ],
    },
  },

  // --- Employment Status (1) ---
  {
    id: 'emp-1',
    title: 'Daniel Vance',
    date: 'Sep 23, 2024',
    subtitle: "I'm requesting an Employment Status Change for Karin Petty.",
    iconType: 'avatar',
    avatarUrl: av(12),
    section: 'inbox',
    assignment: 'me',
    category: 'approvals',
    subcategory: 'employment-status',
    status: 'pending',
    requesterName: 'Daniel Vance',
    requesterAvatar: av(12),
    requestSummary: 'Employment Status Change',
    detail: {
      kind: 'employment-status',
      comments: 'Karin is coming back Full time.',
      edited: [{ label: 'Employment Status: Date', value: '08/28/2020' }],
      old: [{ label: 'Employment Status: Date', value: '09/30/2023' }],
    },
  },

  // --- Job Information (1) ---
  {
    id: 'job-1',
    title: 'Daniel Vance',
    date: 'Sep 23, 2024',
    subtitle: "I'm requesting a Job Information Change for Karin Petty.",
    iconType: 'avatar',
    avatarUrl: av(12),
    section: 'inbox',
    assignment: 'me',
    category: 'approvals',
    subcategory: 'job-information',
    status: 'pending',
    requesterName: 'Daniel Vance',
    requesterAvatar: av(12),
    requestSummary: 'Job Information Change',
    detail: {
      kind: 'job-info',
      edited: [{ label: 'Job Information: Date', value: '08/28/2020' }],
      old: [{ label: 'Job Information: Date', value: '09/30/2023' }],
      jobInfoEdited: [
        { label: 'Location', value: 'Lindon, Utah' },
        { label: 'Division', value: 'North America' },
      ],
      jobInfoOld: [
        { label: 'Location', value: 'London, UK' },
        { label: 'Division', value: 'Europe' },
      ],
    },
  },

  // --- Onboarding (1) ---
  {
    id: 'onboarding-1',
    title: 'Lunch with employee',
    date: 'Oct 27, 2024',
    subtitle: 'Dorothy Chou',
    iconType: 'document',
    section: 'inbox',
    assignment: 'me',
    category: 'onboarding',
    status: 'pending',
    requesterName: 'Shawn Murdock',
    requesterAvatar: av(33),
    requestSummary: 'Onboarding Task',
    detail: {
      kind: 'onboarding-task',
      taskTitle: 'Lunch with employee',
      body: 'Please take your new hire to lunch on their first day of work. You have a $25 limit per person. Get to know the new hire and make them feel welcome in our company.',
      assignedBy: 'Shawn Murdock',
      assignedDate: 'Oct 27, 2024',
    },
  },

  // ===== Completed =====

  {
    id: 'comp-time-1',
    title: 'Ashley Adams',
    date: 'Aug 27, 2024',
    subtitle: '32 hours of Vacation for Aug 23, 2024 - Aug 27, 2024',
    iconType: 'avatar',
    avatarUrl: av(33),
    section: 'completed',
    assignment: 'me',
    category: 'completed-approvals',
    subcategory: 'time-off-requests',
    status: 'approved',
    requesterName: 'Ashley Adams',
    requesterAvatar: av(33),
    requestSummary: 'Time Off Request',
    detail: {
      kind: 'time-off',
      hours: 32,
      policy: 'Vacation',
      startDate: 'Aug 23, 2024',
      endDate: 'Aug 27, 2024',
      monthLabel: 'Aug 2024',
      selectedRange: { start: 23, end: 27 },
      whoElseOut: [
        { name: 'Charlotte Abbott', avatar: av(47), dateRange: 'Aug 25 - 27, 2024' },
        { name: 'Christina Aguinda', avatar: av(36), dateRange: 'Aug 26 - 29, 2024' },
        { name: 'Shannon Anderson', avatar: av(20), dateRange: 'Aug 26 - 29, 2024' },
      ],
    },
  },
  {
    id: 'comp-time-2',
    title: 'Christina Aguinda',
    date: 'Aug 26, 2024',
    subtitle: '32 hours of Sick for Aug 26, 2024 - Aug 29, 2024',
    iconType: 'avatar',
    avatarUrl: av(36),
    section: 'completed',
    assignment: 'me',
    category: 'completed-approvals',
    subcategory: 'time-off-requests',
    status: 'approved',
    requesterName: 'Christina Aguinda',
    requesterAvatar: av(36),
    requestSummary: 'Time Off Request',
    detail: {
      kind: 'time-off',
      hours: 32,
      policy: 'Sick',
      startDate: 'Aug 26, 2024',
      endDate: 'Aug 29, 2024',
      monthLabel: 'Aug 2024',
      selectedRange: { start: 26, end: 29 },
      whoElseOut: [
        { name: 'Charlotte Abbott', avatar: av(47), dateRange: 'Aug 25 - 27, 2024' },
        { name: 'Shannon Anderson', avatar: av(20), dateRange: 'Aug 26 - 29, 2024' },
      ],
    },
  },
  {
    id: 'comp-time-3',
    title: 'Shannon Anderson',
    date: 'Aug 19, 2024',
    subtitle: '32 hours of Vacation for Aug 26, 2024 - Aug 29, 2024',
    iconType: 'avatar',
    avatarUrl: av(20),
    section: 'completed',
    assignment: 'me',
    category: 'completed-approvals',
    subcategory: 'time-off-requests',
    status: 'approved',
    requesterName: 'Shannon Anderson',
    requesterAvatar: av(20),
    requestSummary: 'Time Off Request',
    detail: {
      kind: 'time-off',
      hours: 32,
      policy: 'Vacation',
      startDate: 'Aug 26, 2024',
      endDate: 'Aug 29, 2024',
      monthLabel: 'Aug 2024',
      selectedRange: { start: 26, end: 29 },
      whoElseOut: [
        { name: 'Christina Aguinda', avatar: av(36), dateRange: 'Aug 26 - 29, 2024' },
        { name: 'Dorothy Chou', avatar: av(40), dateRange: 'Aug 24 - 27, 2024' },
      ],
    },
  },
  {
    id: 'comp-time-4',
    title: 'Eric Astura',
    date: 'Aug 12, 2024',
    subtitle: '24 hours of Vacation for Aug 17, 2024 - Aug 19, 2024',
    iconType: 'avatar',
    avatarUrl: av(15),
    section: 'completed',
    assignment: 'me',
    category: 'completed-approvals',
    subcategory: 'time-off-requests',
    status: 'approved',
    requesterName: 'Eric Astura',
    requesterAvatar: av(15),
    requestSummary: 'Time Off Request',
    detail: {
      kind: 'time-off',
      hours: 24,
      policy: 'Vacation',
      startDate: 'Aug 17, 2024',
      endDate: 'Aug 19, 2024',
      monthLabel: 'Aug 2024',
      selectedRange: { start: 17, end: 19 },
      whoElseOut: [
        { name: 'Cheryl Barnet', avatar: av(45), dateRange: 'Aug 17 - 21, 2024' },
        { name: 'Maja Andev', avatar: av(48), dateRange: 'Aug 17 - 21, 2024' },
      ],
    },
  },
  {
    id: 'comp-time-5',
    title: 'Cheryl Barnet',
    date: 'Aug 13, 2024',
    subtitle: '40 hours of Vacation for Aug 17, 2024 - Aug 21, 2024',
    iconType: 'avatar',
    avatarUrl: av(45),
    section: 'completed',
    assignment: 'me',
    category: 'completed-approvals',
    subcategory: 'time-off-requests',
    status: 'approved',
    requesterName: 'Cheryl Barnet',
    requesterAvatar: av(45),
    requestSummary: 'Time Off Request',
    detail: {
      kind: 'time-off',
      hours: 40,
      policy: 'Vacation',
      startDate: 'Aug 17, 2024',
      endDate: 'Aug 21, 2024',
      monthLabel: 'Aug 2024',
      selectedRange: { start: 17, end: 21 },
      whoElseOut: [
        { name: 'Maja Andev', avatar: av(48), dateRange: 'Aug 17 - 21, 2024' },
        { name: 'Eric Astura', avatar: av(15), dateRange: 'Aug 17 - 19, 2024' },
        { name: 'Trent Walsh', avatar: av(52), dateRange: 'Aug 19 - 21, 2024' },
      ],
    },
  },
  {
    id: 'comp-time-6',
    title: 'Maja Andev',
    date: 'Aug 14, 2024',
    subtitle: '24 hours of Vacation for Aug 17, 2024 - Aug 21, 2024',
    iconType: 'avatar',
    avatarUrl: av(48),
    section: 'completed',
    assignment: 'me',
    category: 'completed-approvals',
    subcategory: 'time-off-requests',
    status: 'approved',
    requesterName: 'Maja Andev',
    requesterAvatar: av(48),
    requestSummary: 'Time Off Request',
    detail: {
      kind: 'time-off',
      hours: 24,
      policy: 'Vacation',
      startDate: 'Aug 17, 2024',
      endDate: 'Aug 21, 2024',
      monthLabel: 'Aug 2024',
      selectedRange: { start: 17, end: 21 },
      whoElseOut: [
        { name: 'Cheryl Barnet', avatar: av(45), dateRange: 'Aug 17 - 21, 2024' },
        { name: 'Eric Astura', avatar: av(15), dateRange: 'Aug 17 - 19, 2024' },
      ],
    },
  },
  {
    id: 'comp-time-7',
    title: 'Trent Walsh',
    date: 'Aug 12, 2024',
    subtitle: '32 hours of Vacation for Aug 19, 2024 - Aug 21, 2024',
    iconType: 'avatar',
    avatarUrl: av(52),
    section: 'completed',
    assignment: 'me',
    category: 'completed-approvals',
    subcategory: 'time-off-requests',
    status: 'approved',
    requesterName: 'Trent Walsh',
    requesterAvatar: av(52),
    requestSummary: 'Time Off Request',
    detail: {
      kind: 'time-off',
      hours: 32,
      policy: 'Vacation',
      startDate: 'Aug 19, 2024',
      endDate: 'Aug 21, 2024',
      monthLabel: 'Aug 2024',
      selectedRange: { start: 19, end: 21 },
      whoElseOut: [
        { name: 'Maja Andev', avatar: av(48), dateRange: 'Aug 17 - 21, 2024' },
        { name: 'Cheryl Barnet', avatar: av(45), dateRange: 'Aug 17 - 21, 2024' },
      ],
    },
  },
  {
    id: 'comp-time-8',
    title: 'Jake Bryan',
    date: 'Aug 12, 2024',
    subtitle: '32 hours of Vacation for Aug 22, 2024 - Aug 26, 2024',
    iconType: 'avatar',
    avatarUrl: av(53),
    section: 'completed',
    assignment: 'me',
    category: 'completed-approvals',
    subcategory: 'time-off-requests',
    status: 'approved',
    requesterName: 'Jake Bryan',
    requesterAvatar: av(53),
    requestSummary: 'Time Off Request',
    detail: {
      kind: 'time-off',
      hours: 32,
      policy: 'Vacation',
      startDate: 'Aug 22, 2024',
      endDate: 'Aug 26, 2024',
      monthLabel: 'Aug 2024',
      selectedRange: { start: 22, end: 26 },
      whoElseOut: [
        { name: 'Dorothy Chou', avatar: av(40), dateRange: 'Aug 24 - 27, 2024' },
        { name: 'Janet Cruz', avatar: av(60), dateRange: 'Aug 23 - 26, 2024' },
      ],
    },
  },
  {
    id: 'comp-time-9',
    title: 'Dorothy Chou',
    date: 'Aug 18, 2024',
    subtitle: '32 hours of Vacation for Aug 24, 2024 - Aug 27, 2024',
    iconType: 'avatar',
    avatarUrl: av(40),
    section: 'completed',
    assignment: 'me',
    category: 'completed-approvals',
    subcategory: 'time-off-requests',
    status: 'approved',
    requesterName: 'Dorothy Chou',
    requesterAvatar: av(40),
    requestSummary: 'Time Off Request',
    detail: {
      kind: 'time-off',
      hours: 32,
      policy: 'Vacation',
      startDate: 'Aug 24, 2024',
      endDate: 'Aug 27, 2024',
      monthLabel: 'Aug 2024',
      selectedRange: { start: 24, end: 27 },
      whoElseOut: [
        { name: 'Janet Cruz', avatar: av(60), dateRange: 'Aug 23 - 26, 2024' },
        { name: 'Charlotte Abbott', avatar: av(47), dateRange: 'Aug 25 - 27, 2024' },
      ],
    },
  },
  {
    id: 'comp-time-10',
    title: 'Janet Cruz',
    date: 'Aug 19, 2024',
    subtitle: '32 hours of Vacation for Aug 23, 2024 - Aug 26, 2024',
    iconType: 'avatar',
    avatarUrl: av(60),
    section: 'completed',
    assignment: 'me',
    category: 'completed-approvals',
    subcategory: 'time-off-requests',
    status: 'approved',
    requesterName: 'Janet Cruz',
    requesterAvatar: av(60),
    requestSummary: 'Time Off Request',
    detail: {
      kind: 'time-off',
      hours: 32,
      policy: 'Vacation',
      startDate: 'Aug 23, 2024',
      endDate: 'Aug 26, 2024',
      monthLabel: 'Aug 2024',
      selectedRange: { start: 23, end: 26 },
      whoElseOut: [
        { name: 'Jake Bryan', avatar: av(53), dateRange: 'Aug 22 - 26, 2024' },
        { name: 'Dorothy Chou', avatar: av(40), dateRange: 'Aug 24 - 27, 2024' },
      ],
    },
  },

  // --- Completed / Signatures ---
  {
    id: 'sig-1',
    title: 'Background_Check_Auth.pdf',
    date: 'Sep 20, 2024',
    subtitle: 'You completed this on Sep 20, 2024',
    iconType: 'document',
    section: 'completed',
    assignment: 'me',
    category: 'signatures',
    status: 'completed',
    requesterName: 'Shawn Murdock',
    requesterAvatar: av(33),
    requestSummary: 'New Signature Request',
    detail: {
      kind: 'signature',
      documentName: 'Background_Check_Auth.pdf',
      regarding: 'Regarding Shawn Murdock',
      prompt: 'Please take a moment to sign this document.',
      completedDate: 'Sep 20, 2024',
    },
  },

  // --- Completed / Feedback ---
  {
    id: 'fb-1',
    title: 'Select people to provide feedback on your team',
    date: 'Oct 31, 2024',
    subtitle: 'Completed on Oct 31, 2024',
    iconType: 'feedback',
    section: 'completed',
    assignment: 'me',
    category: 'feedback',
    status: 'completed',
    requesterName: 'Shawn Murdock',
    requesterAvatar: av(33),
    requestSummary: 'Get Feedback About Your Team',
    detail: {
      kind: 'feedback',
      cycle: 'Review Cycle',
      questions: ['What are some things [Name] does well?', 'How could [Name] improve?'],
      pairs: [
        {
          employee: { name: 'Jennifer Caldwell', title: 'VP of People', location: 'Lindon, Utah', avatar: av(31) },
          reviewers: [{ name: 'Daniel Vance' }, { name: 'Troy Pickard' }],
        },
        {
          employee: { name: 'Ryota Saito', title: 'Chief Operating Officer', location: 'Lindon, Utah', avatar: av(13) },
          reviewers: [{ name: 'Daniel Vance' }, { name: 'Troy Pickard' }],
        },
        {
          employee: { name: 'Daniel Vance', title: 'VP of Sales', location: 'Lindon, Utah', avatar: av(12) },
          reviewers: [{ name: 'Aaron Eckerly' }, { name: 'Troy Pickard' }],
        },
        {
          employee: { name: 'Eric Astura', title: 'VP of IT', location: 'Lindon, Utah', avatar: av(15) },
          reviewers: [{ name: 'Daniel Vance' }, { name: 'Troy Pickard' }],
        },
        {
          employee: { name: 'Cheryl Barnet', title: 'VP of Customer Success', location: 'Lindon, Utah', avatar: av(45) },
          reviewers: [{ name: 'Daniel Vance' }, { name: 'Troy Pickard' }],
        },
      ],
      completedDate: 'Sep 19, 2024',
    },
  },
  {
    id: 'fb-2',
    title: 'Select people to provide feedback on your team',
    date: 'Sep 19, 2024',
    subtitle: 'Completed on Sep 19, 2024',
    iconType: 'feedback',
    section: 'completed',
    assignment: 'me',
    category: 'feedback',
    status: 'completed',
    requesterName: 'Shawn Murdock',
    requesterAvatar: av(33),
    requestSummary: 'Get Feedback About Your Team',
    detail: {
      kind: 'feedback',
      cycle: 'Review Cycle',
      questions: ['What are some things [Name] does well?', 'How could [Name] improve?'],
      pairs: [
        {
          employee: { name: 'Jennifer Caldwell', title: 'VP of People', location: 'Lindon, Utah', avatar: av(31) },
          reviewers: [{ name: 'Daniel Vance' }, { name: 'Troy Pickard' }],
        },
      ],
      completedDate: 'Sep 19, 2024',
    },
  },
  {
    id: 'fb-3',
    title: 'Select people to provide feedback on your team',
    date: 'Jul 1, 2024',
    subtitle: 'Completed on Jul 01, 2024',
    iconType: 'feedback',
    section: 'completed',
    assignment: 'me',
    category: 'feedback',
    status: 'completed',
    requesterName: 'Shawn Murdock',
    requesterAvatar: av(33),
    requestSummary: 'Get Feedback About Your Team',
    detail: {
      kind: 'feedback',
      cycle: 'Review Cycle',
      questions: ['What are some things [Name] does well?', 'How could [Name] improve?'],
      pairs: [
        {
          employee: { name: 'Jennifer Caldwell', title: 'VP of People', location: 'Lindon, Utah', avatar: av(31) },
          reviewers: [{ name: 'Daniel Vance' }, { name: 'Troy Pickard' }],
        },
      ],
      completedDate: 'Jul 01, 2024',
    },
  },

  // ===== Sent =====

  // --- Sent / Onboarding (a few representative rows) ---
  {
    id: 'sent-onb-1',
    title: 'Employee Handbook Introduction',
    date: 'Oct 26, 2024',
    subtitle: 'Jim Harris — Assigned to Shannon Anderson',
    iconType: 'document',
    section: 'sent',
    assignment: 'me',
    category: 'sent-onboarding',
    status: 'sent',
    requesterName: 'Jim Harris',
    requesterAvatar: av(22),
    assignee: 'Shannon Anderson',
    requestSummary: 'Onboarding Task',
    detail: {
      kind: 'onboarding-task',
      taskTitle: 'Employee Handbook Introduction',
      body: 'Follow up with a phone call to all new employees to ensure that they have reviewed and signed the employee handbook. Answer any remaining questions employees might have.',
      assignedBy: 'Shannon Anderson',
      assignedDate: 'Oct 31, 2024',
    },
  },
  {
    id: 'sent-onb-2',
    title: 'Issue T-shirt and "Welcome Package"',
    date: 'Oct 26, 2024',
    subtitle: 'Jim Harris — Assigned to Ashley Adams',
    iconType: 'document',
    section: 'sent',
    assignment: 'me',
    category: 'sent-onboarding',
    status: 'sent',
    requesterName: 'Jim Harris',
    requesterAvatar: av(22),
    assignee: 'Ashley Adams',
    requestSummary: 'Onboarding Task',
    detail: {
      kind: 'onboarding-task',
      taskTitle: 'Issue T-shirt and "Welcome Package"',
      body: 'Provide the new hire with a company T-shirt and welcome package on their first day.',
      assignedBy: 'Ashley Adams',
      assignedDate: 'Oct 31, 2024',
    },
  },
  {
    id: 'sent-onb-3',
    title: 'Introduction to team',
    date: 'Oct 25, 2024',
    subtitle: 'Jim Harris — Assigned to Dorothy Chou',
    iconType: 'document',
    section: 'sent',
    assignment: 'me',
    category: 'sent-onboarding',
    status: 'sent',
    requesterName: 'Jim Harris',
    requesterAvatar: av(22),
    assignee: 'Dorothy Chou',
    requestSummary: 'Onboarding Task',
    detail: {
      kind: 'onboarding-task',
      taskTitle: 'Introduction to team',
      body: 'Walk the new hire around the office to introduce them to their teammates.',
      assignedBy: 'Dorothy Chou',
      assignedDate: 'Oct 31, 2024',
    },
  },
  {
    id: 'sent-onb-4',
    title: 'Introduction to team',
    date: 'Oct 25, 2024',
    subtitle: 'Holly Hartley — Assigned to Ryan',
    iconType: 'document',
    section: 'sent',
    assignment: 'me',
    category: 'sent-onboarding',
    status: 'sent',
    requesterName: 'Holly Hartley',
    requesterAvatar: av(28),
    assignee: 'Ryan',
    requestSummary: 'Onboarding Task',
    detail: {
      kind: 'onboarding-task',
      taskTitle: 'Introduction to team',
      body: 'Walk the new hire around the office to introduce them to their teammates.',
      assignedBy: 'Holly Hartley',
      assignedDate: 'Oct 28, 2024',
    },
  },
  {
    id: 'sent-onb-5',
    title: 'Lunch with employee',
    date: 'Oct 16, 2024',
    subtitle: 'Dorothy Chou — Assigned to You',
    iconType: 'document',
    section: 'sent',
    assignment: 'me',
    category: 'sent-onboarding',
    status: 'sent',
    requesterName: 'Dorothy Chou',
    requesterAvatar: av(40),
    assignee: 'You',
    requestSummary: 'Onboarding Task',
    detail: {
      kind: 'onboarding-task',
      taskTitle: 'Lunch with employee',
      body: 'Take your new hire to lunch on their first day.',
      assignedBy: 'Dorothy Chou',
      assignedDate: 'Oct 27, 2024',
    },
  },

  // --- Sent / Offboarding (representative rows) ---
  {
    id: 'sent-off-1',
    title: 'Check Vacation Payout/Accrual',
    date: 'Jul 24, 2024',
    subtitle: 'Charlotte Abbott — Assigned to Ashley Adams',
    iconType: 'document',
    section: 'sent',
    assignment: 'me',
    category: 'sent-offboarding',
    status: 'sent',
    requesterName: 'Charlotte Abbott',
    requesterAvatar: av(47),
    assignee: 'Ashley Adams',
    requestSummary: 'Offboarding Task',
    detail: { kind: 'offboarding-task', taskTitle: 'Check Vacation Payout/Accrual', forEmployee: 'Ashley Adams', date: 'Jul 24, 2024' },
  },
  {
    id: 'sent-off-2',
    title: 'Disable Access to Other Software Systems',
    date: 'Jul 24, 2024',
    subtitle: 'Charlotte Abbott — Assigned to Eric Astura',
    iconType: 'document',
    section: 'sent',
    assignment: 'me',
    category: 'sent-offboarding',
    status: 'sent',
    requesterName: 'Charlotte Abbott',
    requesterAvatar: av(47),
    assignee: 'Eric Astura',
    requestSummary: 'Offboarding Task',
    detail: { kind: 'offboarding-task', taskTitle: 'Disable Access to Other Software Systems', forEmployee: 'Eric Astura', date: 'Jul 24, 2024' },
  },
  {
    id: 'sent-off-3',
    title: 'Collect Company Assets',
    date: 'Jul 24, 2024',
    subtitle: 'Charlotte Abbott — Assigned to Jennifer Caldwell',
    iconType: 'document',
    section: 'sent',
    assignment: 'me',
    category: 'sent-offboarding',
    status: 'sent',
    requesterName: 'Charlotte Abbott',
    requesterAvatar: av(47),
    assignee: 'Jennifer Caldwell',
    requestSummary: 'Offboarding Task',
    detail: { kind: 'offboarding-task', taskTitle: 'Collect Company Assets', forEmployee: 'Jennifer Caldwell', date: 'Jul 24, 2024' },
  },
  {
    id: 'sent-off-4',
    title: 'Collect Employee ID Badge',
    date: 'Jul 24, 2024',
    subtitle: 'Charlotte Abbott — Assigned to Ashley Adams',
    iconType: 'document',
    section: 'sent',
    assignment: 'me',
    category: 'sent-offboarding',
    status: 'sent',
    requesterName: 'Charlotte Abbott',
    requesterAvatar: av(47),
    assignee: 'Ashley Adams',
    requestSummary: 'Offboarding Task',
    detail: { kind: 'offboarding-task', taskTitle: 'Collect Employee ID Badge', forEmployee: 'Ashley Adams', date: 'Jul 24, 2024' },
  },
  {
    id: 'sent-off-5',
    title: 'Disable Access to Internal System & Shared Drive',
    date: 'Jul 24, 2024',
    subtitle: 'Charlotte Abbott — Assigned to Eric Astura',
    iconType: 'document',
    section: 'sent',
    assignment: 'me',
    category: 'sent-offboarding',
    status: 'sent',
    requesterName: 'Charlotte Abbott',
    requesterAvatar: av(47),
    assignee: 'Eric Astura',
    requestSummary: 'Offboarding Task',
    detail: { kind: 'offboarding-task', taskTitle: 'Disable Access to Internal System & Shared Drive', forEmployee: 'Eric Astura', date: 'Jul 24, 2024' },
  },
  {
    id: 'sent-off-6',
    title: 'Cobra',
    date: 'Jul 24, 2024',
    subtitle: 'Charlotte Abbott — Assigned to Eric Astura',
    iconType: 'document',
    section: 'sent',
    assignment: 'me',
    category: 'sent-offboarding',
    status: 'sent',
    requesterName: 'Charlotte Abbott',
    requesterAvatar: av(47),
    assignee: 'Eric Astura',
    requestSummary: 'Offboarding Task',
    detail: { kind: 'offboarding-task', taskTitle: 'Cobra', forEmployee: 'Eric Astura', date: 'Jul 24, 2024' },
  },
];

// ---------- Helpers ----------

export const ITEMS_PER_PAGE = 10;

export const getRequestById = (id: string) =>
  mockInboxRequests.find((r) => r.id === id);

export interface ListFilter {
  section: InboxSection;
  category?: string;
  subcategory?: string;
  assignment: InboxAssignment;
}

export const getFilteredRequests = ({ section, category, subcategory, assignment }: ListFilter) => {
  return mockInboxRequests.filter((r) => {
    if (r.section !== section) return false;
    if (assignment === 'me' && r.assignment !== 'me') return false;
    if (category && r.category !== category) return false;
    if (subcategory && r.subcategory !== subcategory) return false;
    return true;
  });
};

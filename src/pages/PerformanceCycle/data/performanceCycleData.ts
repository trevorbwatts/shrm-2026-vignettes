export type ReviewRating = 'below' | 'meets' | 'exceeds';
export type CycleStage = 'setup' | 'in-progress' | 'calibration' | 'compensation' | 'dashboard';
export type CalibrationFlagType = 'distribution-outlier' | 'similar-employees' | 'recency-bias';
export type BandPosition = 'P10' | 'P25' | 'P50' | 'P75' | 'P90';

export interface RoleGroup {
  id: string;
  department: string;
  level: string;
  competencyCount: number;
  questions: { id: string; competency: string; sample: string }[];
}

export interface ManagerProgress {
  id: string;
  name: string;
  photoUrl: string;
  department: string;
  reportsCount: number;
  submittedCount: number;
}

export interface ReviewedEmployee {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  photoUrl: string;
  rating: ReviewRating;
  reviewScore: number;
  currentComp: number;
  bandPosition: BandPosition;
  marketMidpoint: number;
  recommendedComp: number;
  retentionRisk?: 'low' | 'medium' | 'high';
  tenureYears?: number;
  lastEngagementSignal?: string;
}

export interface DistributionFlag {
  managerName: string;
  ratings: { rating: ReviewRating; count: number }[];
  peerAverage: { rating: ReviewRating; pct: number }[];
}

export interface SimilarEmployeesFlag {
  a: ReviewedEmployee;
  b: ReviewedEmployee;
  differentiators: string[];
}

export interface RecencyBiasFlag {
  employeeName: string;
  events: { date: string; impact: string }[];
}

export interface CalibrationFlag {
  id: string;
  type: CalibrationFlagType;
  headline: string;
  body: string;
  distribution?: DistributionFlag;
  pair?: SimilarEmployeesFlag;
  recency?: RecencyBiasFlag;
}

export interface AssessmentContext {
  employeeId: string;
  goals: string[];
  oneOnOneNotes: { date: string; quote: string }[];
  peerFeedback: { authorName: string; authorPhotoUrl: string; quote: string }[];
  winsRecord: { date: string; entry: string }[];
  meetingHighlights: { date: string; topic: string; highlight: string }[];
}

export const roleGroups: RoleGroup[] = [
  {
    id: 'eng-senior',
    department: 'Engineering',
    level: 'Senior Software Engineer',
    competencyCount: 5,
    questions: [
      { id: 'q1', competency: 'Technical depth', sample: 'Describe a complex technical decision this employee owned and how it played out.' },
      { id: 'q2', competency: 'Collaboration', sample: 'How did this person partner across functions to ship work this cycle?' },
      { id: 'q3', competency: 'Quality', sample: 'How consistently does this engineer produce work that meets the team bar?' },
      { id: 'q4', competency: 'Mentorship', sample: 'What evidence have you seen of this engineer raising the level of others?' },
      { id: 'q5', competency: 'Ownership', sample: 'Describe how this engineer handles ambiguity and unblocks themselves.' },
    ],
  },
  {
    id: 'eng-mgr',
    department: 'Engineering',
    level: 'Engineering Manager',
    competencyCount: 5,
    questions: [
      { id: 'q1', competency: 'People leadership', sample: 'How is this manager developing their team this cycle?' },
      { id: 'q2', competency: 'Delivery', sample: 'How predictably is this manager delivering team commitments?' },
      { id: 'q3', competency: 'Cross-functional', sample: 'How effectively does this manager partner with PM and design?' },
      { id: 'q4', competency: 'Hiring', sample: 'How is this manager closing open roles and raising the bar?' },
      { id: 'q5', competency: 'Strategy', sample: 'What strategic bets has this manager owned this cycle?' },
    ],
  },
  {
    id: 'pm-senior',
    department: 'Product',
    level: 'Senior Product Manager',
    competencyCount: 4,
    questions: [
      { id: 'q1', competency: 'Customer judgment', sample: 'How well does this PM stay close to customer signal?' },
      { id: 'q2', competency: 'Strategy', sample: 'Describe a strategic call this PM owned this cycle.' },
      { id: 'q3', competency: 'Execution', sample: 'How reliably does this PM ship on commitments?' },
      { id: 'q4', competency: 'Stakeholder management', sample: 'How does this PM keep leadership and partners aligned?' },
    ],
  },
  {
    id: 'design-senior',
    department: 'Design',
    level: 'Senior Designer',
    competencyCount: 4,
    questions: [
      { id: 'q1', competency: 'Craft', sample: 'How does this designer raise the bar on craft?' },
      { id: 'q2', competency: 'Systems thinking', sample: 'How does this designer connect work to the broader system?' },
      { id: 'q3', competency: 'Collaboration', sample: 'How does this designer partner with engineering and PM?' },
      { id: 'q4', competency: 'Impact', sample: 'What customer impact has this designer driven this cycle?' },
    ],
  },
  {
    id: 'sales-ae',
    department: 'Sales',
    level: 'Account Executive',
    competencyCount: 4,
    questions: [
      { id: 'q1', competency: 'Pipeline', sample: 'How is this AE building and managing pipeline?' },
      { id: 'q2', competency: 'Closing', sample: 'How effective is this AE at moving deals to close?' },
      { id: 'q3', competency: 'Customer fit', sample: 'How well does this AE qualify and place the right customers?' },
      { id: 'q4', competency: 'Team play', sample: 'How does this AE share learning and support peers?' },
    ],
  },
  {
    id: 'cs-csm',
    department: 'Customer Success',
    level: 'Customer Success Manager',
    competencyCount: 4,
    questions: [
      { id: 'q1', competency: 'Account health', sample: 'How well does this CSM read account health signals?' },
      { id: 'q2', competency: 'Renewal motion', sample: 'How is this CSM securing renewals and expansions?' },
      { id: 'q3', competency: 'Customer trust', sample: 'How is this CSM building durable relationships?' },
      { id: 'q4', competency: 'Cross-functional', sample: 'How does this CSM bring product feedback inside?' },
    ],
  },
  {
    id: 'mk-marketer',
    department: 'Marketing',
    level: 'Marketing Manager',
    competencyCount: 4,
    questions: [
      { id: 'q1', competency: 'Campaign craft', sample: 'How is this marketer designing and shipping campaigns?' },
      { id: 'q2', competency: 'Measurement', sample: 'How well does this marketer instrument and learn?' },
      { id: 'q3', competency: 'Brand judgment', sample: 'How well does this marketer hold the brand bar?' },
      { id: 'q4', competency: 'Cross-functional', sample: 'How well does this marketer partner with sales and product?' },
    ],
  },
  {
    id: 'people-ic',
    department: 'People Ops',
    level: 'People Partner',
    competencyCount: 4,
    questions: [
      { id: 'q1', competency: 'Coaching', sample: 'How does this partner coach managers through hard moments?' },
      { id: 'q2', competency: 'Program design', sample: 'How does this partner design programs that scale?' },
      { id: 'q3', competency: 'Employee trust', sample: 'How does this partner build durable trust across the org?' },
      { id: 'q4', competency: 'Compliance', sample: 'How does this partner keep us safe and consistent?' },
    ],
  },
];

export const managerProgress: ManagerProgress[] = [
  { id: 'm1', name: 'Sarah Okafor', photoUrl: 'https://i.pravatar.cc/150?u=sarah-okafor', department: 'Engineering', reportsCount: 7, submittedCount: 5 },
  { id: 'm2', name: 'Daniel Chen', photoUrl: 'https://i.pravatar.cc/150?u=daniel-chen', department: 'Engineering', reportsCount: 6, submittedCount: 6 },
  { id: 'm3', name: 'Priya Raman', photoUrl: 'https://i.pravatar.cc/150?u=priya-raman', department: 'Product', reportsCount: 5, submittedCount: 2 },
  { id: 'm4', name: 'Marcus Webb', photoUrl: 'https://i.pravatar.cc/150?u=marcus-webb', department: 'Sales', reportsCount: 8, submittedCount: 7 },
  { id: 'm5', name: 'Jenna Liu', photoUrl: 'https://i.pravatar.cc/150?u=jenna-liu', department: 'Design', reportsCount: 4, submittedCount: 0 },
  { id: 'm6', name: 'Ethan Brooks', photoUrl: 'https://i.pravatar.cc/150?u=ethan-brooks', department: 'Customer Success', reportsCount: 6, submittedCount: 6 },
];

export const reviewedEmployees: ReviewedEmployee[] = [
  { id: 'e1', firstName: 'Alex', lastName: 'Chen', jobTitle: 'Senior Software Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/150?u=alex-chen', rating: 'meets', reviewScore: 78, currentComp: 168000, bandPosition: 'P50', marketMidpoint: 184000, recommendedComp: 178000, retentionRisk: 'medium', tenureYears: 4.2, lastEngagementSignal: 'Engagement -8 pts QoQ' },
  { id: 'e2', firstName: 'Maya', lastName: 'Rodriguez', jobTitle: 'Senior Software Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/150?u=maya-rodriguez', rating: 'exceeds', reviewScore: 92, currentComp: 175000, bandPosition: 'P50', marketMidpoint: 184000, recommendedComp: 196000, tenureYears: 3.0 },
  { id: 'e3', firstName: 'Ben', lastName: 'Park', jobTitle: 'Software Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/150?u=ben-park', rating: 'meets', reviewScore: 74, currentComp: 142000, bandPosition: 'P25', marketMidpoint: 156000, recommendedComp: 152000, tenureYears: 1.8 },
  { id: 'e4', firstName: 'Zara', lastName: 'Ibrahim', jobTitle: 'Senior Product Manager', department: 'Product', photoUrl: 'https://i.pravatar.cc/150?u=zara-ibrahim', rating: 'exceeds', reviewScore: 95, currentComp: 162000, bandPosition: 'P25', marketMidpoint: 178000, recommendedComp: 185000, retentionRisk: 'high', tenureYears: 2.6, lastEngagementSignal: 'Below market by 9%' },
  { id: 'e5', firstName: 'Lila', lastName: 'Nakamura', jobTitle: 'Senior Designer', department: 'Design', photoUrl: 'https://i.pravatar.cc/150?u=lila-nakamura', rating: 'meets', reviewScore: 80, currentComp: 138000, bandPosition: 'P50', marketMidpoint: 145000, recommendedComp: 144000, tenureYears: 5.1 },
  { id: 'e6', firstName: 'Theo', lastName: 'Marsh', jobTitle: 'Account Executive', department: 'Sales', photoUrl: 'https://i.pravatar.cc/150?u=theo-marsh', rating: 'exceeds', reviewScore: 88, currentComp: 124000, bandPosition: 'P50', marketMidpoint: 132000, recommendedComp: 138000, tenureYears: 2.2 },
  { id: 'e7', firstName: 'Riya', lastName: 'Khanna', jobTitle: 'Customer Success Manager', department: 'Customer Success', photoUrl: 'https://i.pravatar.cc/150?u=riya-khanna', rating: 'exceeds', reviewScore: 90, currentComp: 118000, bandPosition: 'P25', marketMidpoint: 132000, recommendedComp: 136000, retentionRisk: 'high', tenureYears: 1.5, lastEngagementSignal: '2 outside recruiter contacts logged' },
  { id: 'e8', firstName: 'Jordan', lastName: 'Bell', jobTitle: 'Software Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/150?u=jordan-bell', rating: 'below', reviewScore: 58, currentComp: 138000, bandPosition: 'P25', marketMidpoint: 156000, recommendedComp: 138000, retentionRisk: 'medium', tenureYears: 3.4 },
  { id: 'e9', firstName: 'Nia', lastName: 'Adeyemi', jobTitle: 'Marketing Manager', department: 'Marketing', photoUrl: 'https://i.pravatar.cc/150?u=nia-adeyemi', rating: 'meets', reviewScore: 76, currentComp: 132000, bandPosition: 'P50', marketMidpoint: 138000, recommendedComp: 138000, tenureYears: 2.9 },
  { id: 'e10', firstName: 'Owen', lastName: 'Reyes', jobTitle: 'Senior Product Manager', department: 'Product', photoUrl: 'https://i.pravatar.cc/150?u=owen-reyes', rating: 'meets', reviewScore: 82, currentComp: 172000, bandPosition: 'P75', marketMidpoint: 178000, recommendedComp: 178000, tenureYears: 4.7 },
  { id: 'e11', firstName: 'Sage', lastName: 'Olsen', jobTitle: 'Designer', department: 'Design', photoUrl: 'https://i.pravatar.cc/150?u=sage-olsen', rating: 'meets', reviewScore: 75, currentComp: 118000, bandPosition: 'P50', marketMidpoint: 122000, recommendedComp: 122000, tenureYears: 1.2 },
  { id: 'e12', firstName: 'Dev', lastName: 'Patel', jobTitle: 'Engineering Manager', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/150?u=dev-patel', rating: 'exceeds', reviewScore: 91, currentComp: 215000, bandPosition: 'P75', marketMidpoint: 224000, recommendedComp: 232000, tenureYears: 6.4 },
];

export const calibrationFlags: CalibrationFlag[] = [
  {
    id: 'f1',
    type: 'distribution-outlier',
    headline: 'Sarah Okafor rates 71% of reports as Exceeds Expectations',
    body: 'Engineering peer managers average 28% Exceeds. This pattern has held across the last two cycles.',
    distribution: {
      managerName: 'Sarah Okafor',
      ratings: [
        { rating: 'exceeds', count: 5 },
        { rating: 'meets', count: 2 },
        { rating: 'below', count: 0 },
      ],
      peerAverage: [
        { rating: 'exceeds', pct: 28 },
        { rating: 'meets', pct: 64 },
        { rating: 'below', pct: 8 },
      ],
    },
  },
  {
    id: 'f2',
    type: 'distribution-outlier',
    headline: 'Marcus Webb has not rated anyone Below Expectations in 3 cycles',
    body: 'Sales peer managers average 11% Below. Worth checking whether feedback is being delivered to the lowest 1–2 performers on the team.',
    distribution: {
      managerName: 'Marcus Webb',
      ratings: [
        { rating: 'exceeds', count: 3 },
        { rating: 'meets', count: 5 },
        { rating: 'below', count: 0 },
      ],
      peerAverage: [
        { rating: 'exceeds', pct: 26 },
        { rating: 'meets', pct: 63 },
        { rating: 'below', pct: 11 },
      ],
    },
  },
  {
    id: 'f3',
    type: 'similar-employees',
    headline: 'Two senior engineers, similar trajectories, different ratings',
    body: 'Alex Chen and Maya Rodriguez have nearly identical impact records this cycle but received different ratings.',
    pair: {
      a: reviewedEmployees[0],
      b: reviewedEmployees[1],
      differentiators: [
        'Both shipped equivalent feature scope (Maya: 4 features, Alex: 4 features)',
        'Both led one cross-functional initiative this cycle',
        'Peer feedback scores within 2 points',
        'Manager differs (Sarah Okafor vs. Daniel Chen)',
      ],
    },
  },
  {
    id: 'f4',
    type: 'similar-employees',
    headline: 'Two PMs with similar wins, different ratings',
    body: 'Zara Ibrahim and Owen Reyes both led major launches but received different ratings. Tenure may be biasing the call.',
    pair: {
      a: reviewedEmployees[3],
      b: reviewedEmployees[9],
      differentiators: [
        'Zara launched the new analytics workspace; Owen launched billing v2',
        'Customer impact metrics within 4%',
        'Peer feedback comparable',
        'Owen has 4.7 yrs tenure vs. Zara 2.6 yrs',
      ],
    },
  },
  {
    id: 'f5',
    type: 'similar-employees',
    headline: 'Two designers, comparable cycles, different ratings',
    body: 'Lila Nakamura and Sage Olsen had comparable impact this cycle but received different ratings.',
    pair: {
      a: reviewedEmployees[4],
      b: reviewedEmployees[10],
      differentiators: [
        'Both shipped 3 major flows',
        'Lila has stronger systems contributions',
        'Sage has stronger craft scores from peer feedback',
        'Same manager (Jenna Liu)',
      ],
    },
  },
  {
    id: 'f6',
    type: 'similar-employees',
    headline: 'Two CSMs with similar account books, different ratings',
    body: 'Riya Khanna and a peer CSM have comparable renewal performance but received different ratings.',
    pair: {
      a: reviewedEmployees[6],
      b: { ...reviewedEmployees[5], firstName: 'Tomás', lastName: 'Vega', jobTitle: 'Customer Success Manager', department: 'Customer Success', photoUrl: 'https://i.pravatar.cc/150?u=tomas-vega', rating: 'meets', reviewScore: 79 },
      differentiators: [
        'Net retention within 2 points',
        'Both expanded 3 strategic accounts',
        'Riya has stronger NPS feedback',
        'Different managers',
      ],
    },
  },
  {
    id: 'f7',
    type: 'recency-bias',
    headline: 'Theo Marsh\'s rating tracks tightly with one Q-end deal',
    body: 'Performance scoring spikes around recent wins and dips after a missed deal in March. Earlier strong quarters appear underweighted.',
    recency: {
      employeeName: 'Theo Marsh',
      events: [
        { date: 'Jan 12', impact: 'Closed largest deal of FY26 ($1.4M)' },
        { date: 'Feb 28', impact: 'Lost competitive bake-off ($600K)' },
        { date: 'Mar 18', impact: 'Customer complaint escalated to leadership' },
        { date: 'Apr 22', impact: 'Recovered account, expanded contract' },
      ],
    },
  },
];

export const assessmentContexts: Record<string, AssessmentContext> = {
  e1: {
    employeeId: 'e1',
    goals: [
      'Lead the cross-functional onboarding revamp with Product and Design',
      'Mentor two junior engineers through their first quarter',
      'Reduce p95 dashboard latency by 30%',
    ],
    oneOnOneNotes: [
      { date: 'Apr 12', quote: 'Alex stepped up to coordinate the cross-functional onboarding initiative when the original lead went on leave. Stayed on top of all three teams.' },
      { date: 'Mar 28', quote: 'Walked through how she\'s been pairing with Ben to unblock him on the data layer rewrite. Quietly raised the bar.' },
      { date: 'Mar 14', quote: 'Onboarding revamp shipping ahead of schedule. Alex pulled in Design and PM weeks earlier than I would have.' },
    ],
    peerFeedback: [
      { authorName: 'Maya Rodriguez', authorPhotoUrl: 'https://i.pravatar.cc/150?u=maya-rodriguez', quote: 'Alex was the only person in our standups who consistently surfaced what was blocking other teams, not just hers.' },
      { authorName: 'Owen Reyes', authorPhotoUrl: 'https://i.pravatar.cc/150?u=owen-reyes', quote: 'Working with Alex on onboarding made the launch possible. She translated PM intent into engineering plans cleanly.' },
    ],
    winsRecord: [
      { date: 'Apr 18', entry: 'Onboarding revamp shipped on time, +14% activation in first week.' },
      { date: 'Mar 22', entry: 'Cut p95 dashboard latency from 2.1s to 1.3s.' },
      { date: 'Feb 09', entry: 'Mentored Ben Park through first solo on-call rotation.' },
    ],
    meetingHighlights: [
      { date: 'Apr 15', topic: 'Onboarding launch review', highlight: 'Alex led the post-launch review and named three risks before they hit prod.' },
      { date: 'Mar 30', topic: 'Cross-team sync', highlight: 'Alex\'s recap was the artifact PM and Design referenced for the next two weeks.' },
    ],
  },
  e2: {
    employeeId: 'e2',
    goals: [
      'Lead the analytics workspace foundation rewrite',
      'Land the new query engine with sub-second p95',
      'Hire and ramp one senior backend engineer',
    ],
    oneOnOneNotes: [
      { date: 'Apr 14', quote: 'Maya pushed the query engine to GA two weeks ahead of plan. Customer escalations on dashboard load times disappeared the week we shipped.' },
      { date: 'Mar 26', quote: 'She owned the Eng/Product alignment for the analytics rewrite end-to-end. Daniel Chen flagged it as the cleanest cross-team kickoff he\'s seen.' },
      { date: 'Mar 11', quote: 'Maya is starting to mentor the new senior hire. Already saving me cycles I used to spend onboarding.' },
    ],
    peerFeedback: [
      { authorName: 'Alex Chen', authorPhotoUrl: 'https://i.pravatar.cc/150?u=alex-chen', quote: 'Maya is the engineer I trust to give me an honest read on a tricky design tradeoff. She raises the bar across the team.' },
      { authorName: 'Zara Ibrahim', authorPhotoUrl: 'https://i.pravatar.cc/150?u=zara-ibrahim', quote: 'Maya\'s Eng/Product ritual on the analytics rewrite is the only reason we stayed on plan. Worth replicating.' },
    ],
    winsRecord: [
      { date: 'Apr 22', entry: 'Query engine GA shipped two weeks early; p95 dashboard load 1.1s (target 1.5s).' },
      { date: 'Mar 18', entry: 'Closed senior backend hire that the team had been searching for since January.' },
      { date: 'Feb 24', entry: 'Led the Eng/Product alignment that unblocked the analytics workspace.' },
    ],
    meetingHighlights: [
      { date: 'Apr 17', topic: 'Query engine GA review', highlight: 'Maya walked execs through the rollout and the customer impact data. Confidence high after.' },
      { date: 'Mar 06', topic: 'Analytics rewrite kickoff', highlight: 'Maya\'s scoping doc was the artifact three teams referenced for the rest of the cycle.' },
    ],
  },
  e6: {
    employeeId: 'e6',
    goals: [
      'Hit Q2 quota of $4.2M in pipeline closed',
      'Expand 3 strategic accounts within existing book',
      'Mentor the new AE through ramp',
    ],
    oneOnOneNotes: [
      { date: 'Apr 24', quote: 'Theo recovered the Sentry account after the March escalation and expanded the contract by $180K. Quietly impressive.' },
      { date: 'Mar 20', quote: 'Talked through the lost competitive bake-off. Theo took the loss seriously and brought back three tactical changes for the next deal.' },
      { date: 'Feb 10', quote: 'Closed the largest deal of FY26 ($1.4M). Walked through the multi-thread strategy he ran for the last six weeks of the deal.' },
    ],
    peerFeedback: [
      { authorName: 'Marcus Webb', authorPhotoUrl: 'https://i.pravatar.cc/150?u=marcus-webb', quote: 'Theo is the AE I send into deals where the customer is on the fence. He runs the cleanest discovery on the team.' },
      { authorName: 'Riya Khanna', authorPhotoUrl: 'https://i.pravatar.cc/150?u=riya-khanna', quote: 'Theo handed me the cleanest CSM handoff packet I\'ve gotten this year on the Sentry expansion.' },
    ],
    winsRecord: [
      { date: 'Apr 22', entry: 'Sentry account recovered + expanded contract by $180K.' },
      { date: 'Feb 28', entry: 'Lost competitive bake-off ($600K) — brought back tactical learnings.' },
      { date: 'Jan 12', entry: 'Closed largest deal of FY26 ($1.4M).' },
    ],
    meetingHighlights: [
      { date: 'Apr 24', topic: 'Sentry expansion review', highlight: 'Theo presented the recovery playbook he ran. Marcus asked him to run a brown-bag for the team.' },
      { date: 'Jan 14', topic: 'Q1 win review', highlight: 'Theo walked the team through the FY26 deal multi-thread strategy.' },
    ],
  },
};

export interface SarahReviewSummary {
  employeeId: string;
  employeeName: string;
  jobTitle: string;
  photoUrl: string;
  rating: ReviewRating;
  reviewScore: number;
  summaryExcerpt: string;
}

export const sarahOkaforReviews: SarahReviewSummary[] = [
  { employeeId: 'e1', employeeName: 'Alex Chen', jobTitle: 'Senior Software Engineer', photoUrl: 'https://i.pravatar.cc/150?u=alex-chen', rating: 'exceeds', reviewScore: 88, summaryExcerpt: 'Alex consistently exceeded the team bar this cycle, leading the onboarding revamp end-to-end and mentoring Ben through ramp.' },
  { employeeId: 'sk1', employeeName: 'Ben Park', jobTitle: 'Software Engineer', photoUrl: 'https://i.pravatar.cc/150?u=ben-park', rating: 'exceeds', reviewScore: 84, summaryExcerpt: 'Ben grew significantly this cycle. Took on the data layer rewrite and shipped without major issues.' },
  { employeeId: 'sk2', employeeName: 'Priya Sharma', jobTitle: 'Senior Software Engineer', photoUrl: 'https://i.pravatar.cc/150?u=priya-sharma', rating: 'exceeds', reviewScore: 90, summaryExcerpt: 'Priya owned the API redesign and shipped on time. Strong technical work and partnered well with PM.' },
  { employeeId: 'sk3', employeeName: 'Marcus Diaz', jobTitle: 'Software Engineer', photoUrl: 'https://i.pravatar.cc/150?u=marcus-diaz', rating: 'exceeds', reviewScore: 86, summaryExcerpt: 'Marcus made strong contributions to the platform team and has been a great culture add.' },
  { employeeId: 'sk4', employeeName: 'Helena Vu', jobTitle: 'Senior Software Engineer', photoUrl: 'https://i.pravatar.cc/150?u=helena-vu', rating: 'exceeds', reviewScore: 87, summaryExcerpt: 'Helena delivered a clean cycle. Owned the auth migration and unblocked teammates regularly.' },
  { employeeId: 'sk5', employeeName: 'Roman Velazquez', jobTitle: 'Software Engineer', photoUrl: 'https://i.pravatar.cc/150?u=roman-velazquez', rating: 'meets', reviewScore: 76, summaryExcerpt: 'Roman delivered on commitments and continues to grow. On track for the next level.' },
  { employeeId: 'sk6', employeeName: 'Imani Bryant', jobTitle: 'Senior Software Engineer', photoUrl: 'https://i.pravatar.cc/150?u=imani-bryant', rating: 'meets', reviewScore: 79, summaryExcerpt: 'Imani is a steady contributor. Solid quarter, no major flags.' },
];

export const sarahHeadsUpDraft = `Hi Sarah,

Quick one before calibration this Thursday — when I looked across this cycle's review distribution, your team came in noticeably higher than peer engineering managers (5 of 7 Exceeds, vs. ~28% across peers). I'm not flagging this as a problem; the team is clearly doing strong work. But I wanted to give you a heads-up that calibration may surface this and ask whether you'd like to walk through your reasoning before the session — happy to make time tomorrow if helpful.

— Maya`;

export interface RecencyTimelinePoint {
  date: string;
  event: string;
  impact: 'positive' | 'negative';
  inferredRatingShift: number;
}

export const theoMarshTimeline: RecencyTimelinePoint[] = [
  { date: 'Jan 12', event: 'Closed largest deal of FY26 ($1.4M)', impact: 'positive', inferredRatingShift: +6 },
  { date: 'Feb 28', event: 'Lost competitive bake-off ($600K)', impact: 'negative', inferredRatingShift: -4 },
  { date: 'Mar 18', event: 'Customer complaint escalated to leadership', impact: 'negative', inferredRatingShift: -5 },
  { date: 'Apr 22', event: 'Recovered account, expanded contract by $180K', impact: 'positive', inferredRatingShift: +3 },
];

export const stageStats = {
  setup: { questionsGenerated: 47, roleGroups: 12, employeesCovered: 47 },
  inProgress: { assigned: 47, submitted: 32, inReview: 8, notStarted: 7 },
  calibration: { flagsTotal: 7, distributionOutliers: 2, similarPairs: 4, recencyBias: 1, estMinutes: 40 },
  compensation: { totalEmployees: 47, recommendedAdjustments: 23, totalInvestment: 412000 },
  dashboard: { avgRating: 78, compInvestment: 412000, retentionRisk: 4, belowMarketHighPerformers: 3 },
};

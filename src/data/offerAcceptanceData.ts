export type OfferLevel = 'Junior' | 'Mid' | 'Senior' | 'Staff' | 'Principal';
export type OfferStatus = 'accepted' | 'declined' | 'pending';
export type DeclineReason = 'compensation' | 'culture' | 'role-fit' | 'location' | 'other';

export interface OfferRecord {
  id: string;
  candidateName: string;
  role: string;
  level: OfferLevel;
  department: 'Engineering' | 'Product' | 'Design';
  date: string;
  quarter: string;
  offerAmount: number;
  marketMidpoint: number;
  status: OfferStatus;
  declineReason?: DeclineReason;
}

const offers: OfferRecord[] = [
  // Engineering — 6 months ago, mostly accepted
  { id: 'o1', candidateName: 'Daniel Park', role: 'Senior Software Engineer', level: 'Senior', department: 'Engineering', date: '2025-10-14', quarter: 'Q4 2025', offerAmount: 178000, marketMidpoint: 182000, status: 'accepted' },
  { id: 'o2', candidateName: 'Megan Foster', role: 'Staff Engineer', level: 'Staff', department: 'Engineering', date: '2025-10-22', quarter: 'Q4 2025', offerAmount: 215000, marketMidpoint: 218000, status: 'accepted' },
  { id: 'o3', candidateName: 'Hiro Tanaka', role: 'Software Engineer', level: 'Mid', department: 'Engineering', date: '2025-11-05', quarter: 'Q4 2025', offerAmount: 142000, marketMidpoint: 138000, status: 'accepted' },
  { id: 'o4', candidateName: 'Lena Costa', role: 'Senior Software Engineer', level: 'Senior', department: 'Engineering', date: '2025-11-18', quarter: 'Q4 2025', offerAmount: 175000, marketMidpoint: 182000, status: 'accepted' },
  { id: 'o5', candidateName: 'Aaron Bell', role: 'Senior Software Engineer', level: 'Senior', department: 'Engineering', date: '2025-12-02', quarter: 'Q4 2025', offerAmount: 168000, marketMidpoint: 182000, status: 'declined', declineReason: 'role-fit' },

  // Q1 2026 — drop begins
  { id: 'o6', candidateName: 'Priya Singh', role: 'Staff Engineer', level: 'Staff', department: 'Engineering', date: '2026-01-08', quarter: 'Q1 2026', offerAmount: 195000, marketMidpoint: 218000, status: 'declined', declineReason: 'compensation' },
  { id: 'o7', candidateName: 'Marcus Webb', role: 'Senior Software Engineer', level: 'Senior', department: 'Engineering', date: '2026-01-15', quarter: 'Q1 2026', offerAmount: 162000, marketMidpoint: 182000, status: 'declined', declineReason: 'compensation' },
  { id: 'o8', candidateName: 'Sofia Reyes', role: 'Senior Software Engineer', level: 'Senior', department: 'Engineering', date: '2026-01-29', quarter: 'Q1 2026', offerAmount: 165000, marketMidpoint: 182000, status: 'accepted' },
  { id: 'o9', candidateName: 'Theo Wallace', role: 'Staff Engineer', level: 'Staff', department: 'Engineering', date: '2026-02-04', quarter: 'Q1 2026', offerAmount: 198000, marketMidpoint: 218000, status: 'declined', declineReason: 'compensation' },
  { id: 'o10', candidateName: 'Eun-ji Choi', role: 'Software Engineer', level: 'Mid', department: 'Engineering', date: '2026-02-18', quarter: 'Q1 2026', offerAmount: 138000, marketMidpoint: 138000, status: 'accepted' },
  { id: 'o11', candidateName: 'Jamal Stevens', role: 'Senior Software Engineer', level: 'Senior', department: 'Engineering', date: '2026-03-03', quarter: 'Q1 2026', offerAmount: 160000, marketMidpoint: 182000, status: 'declined', declineReason: 'compensation' },
  { id: 'o12', candidateName: 'Nadia Khan', role: 'Staff Engineer', level: 'Staff', department: 'Engineering', date: '2026-03-22', quarter: 'Q1 2026', offerAmount: 200000, marketMidpoint: 218000, status: 'accepted' },

  // Q2 2026 — declines continue
  { id: 'o13', candidateName: 'Luca Romano', role: 'Senior Software Engineer', level: 'Senior', department: 'Engineering', date: '2026-04-05', quarter: 'Q2 2026', offerAmount: 161000, marketMidpoint: 182000, status: 'declined', declineReason: 'compensation' },
  { id: 'o14', candidateName: 'Ines Moreau', role: 'Staff Engineer', level: 'Staff', department: 'Engineering', date: '2026-04-11', quarter: 'Q2 2026', offerAmount: 195000, marketMidpoint: 218000, status: 'declined', declineReason: 'compensation' },
  { id: 'o15', candidateName: 'Beth Larsen', role: 'Senior Software Engineer', level: 'Senior', department: 'Engineering', date: '2026-04-18', quarter: 'Q2 2026', offerAmount: 167000, marketMidpoint: 182000, status: 'declined', declineReason: 'compensation' },
  { id: 'o16', candidateName: 'Dev Patel', role: 'Software Engineer', level: 'Mid', department: 'Engineering', date: '2026-04-22', quarter: 'Q2 2026', offerAmount: 140000, marketMidpoint: 138000, status: 'accepted' },

  // Product offers (within 5% of market, mostly accepted) — for the comparison
  { id: 'op1', candidateName: 'Anna Reilly', role: 'Senior PM', level: 'Senior', department: 'Product', date: '2026-02-10', quarter: 'Q1 2026', offerAmount: 168000, marketMidpoint: 172000, status: 'accepted' },
  { id: 'op2', candidateName: 'Owen Chambers', role: 'Senior PM', level: 'Senior', department: 'Product', date: '2026-03-15', quarter: 'Q1 2026', offerAmount: 170000, marketMidpoint: 172000, status: 'accepted' },
  { id: 'op3', candidateName: 'Mei Lin', role: 'Group PM', level: 'Staff', department: 'Product', date: '2026-04-02', quarter: 'Q2 2026', offerAmount: 198000, marketMidpoint: 200000, status: 'accepted' },

  // Design offers — also healthy
  { id: 'od1', candidateName: 'Jasper Nolan', role: 'Senior Designer', level: 'Senior', department: 'Design', date: '2026-02-22', quarter: 'Q1 2026', offerAmount: 152000, marketMidpoint: 156000, status: 'accepted' },
  { id: 'od2', candidateName: 'Riya Bhatt', role: 'Staff Designer', level: 'Staff', department: 'Design', date: '2026-03-30', quarter: 'Q1 2026', offerAmount: 178000, marketMidpoint: 182000, status: 'accepted' },
];

export const offerAcceptanceData = offers;

// Aggregates for the AI synthesis answer
export const offerAcceptanceSynthesis = {
  engineeringSixMonths: {
    previous: 82,
    current: 60,
    delta: -22,
  },
  seniorStaffMarketGap: {
    percentBelow: 11,
  },
  recentDeclines: 3,
  recentDeclinesAllCitedComp: true,
  productAndDesign: {
    percentFromMarket: 5,
    declining: false,
  },
};

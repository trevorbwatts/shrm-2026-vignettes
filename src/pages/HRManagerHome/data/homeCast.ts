/**
 * Canonical cast for the HR Manager Home prototype.
 *
 * This is the single source of truth for every named employee surfaced on
 * the home page — Automations feed, exception review, recognition queue,
 * and AI insight widgets. Each surface references employees by `id`, never
 * by inline name/avatar, so the same person stays the same everywhere.
 *
 * IDs double as avatar seeds — drop a photo at `/public/avatars/<id>.jpg`
 * and register it in `src/data/avatars.ts`.
 */

import { avatarFor } from '../../../data/avatars';

export type Department =
  | 'Customer Success'
  | 'Design'
  | 'Engineering'
  | 'IT'
  | 'Marketing'
  | 'People Operations'
  | 'Product'
  | 'Sales';

export interface CastMember {
  id: string; // kebab-case, matches avatar seed
  firstName: string;
  lastName: string;
  role: string;
  department: Department;
  hireDate: string; // ISO YYYY-MM-DD
  engagementScore: number; // 0-100; lower = more at-risk
}

export const homeCast: CastMember[] = [
  // ===== Customer Success (14) — the recognition queue =====
  {
    id: 'sarah-chen',
    firstName: 'Sarah',
    lastName: 'Chen',
    role: 'Senior Customer Success Manager',
    department: 'Customer Success',
    hireDate: '2020-04-12',
    engagementScore: 88,
  },
  {
    id: 'marcus-lee',
    firstName: 'Marcus',
    lastName: 'Lee',
    role: 'Customer Success Manager',
    department: 'Customer Success',
    hireDate: '2022-08-03',
    engagementScore: 84,
  },
  {
    id: 'priya-patel',
    firstName: 'Priya',
    lastName: 'Patel',
    role: 'Solutions Architect',
    department: 'Customer Success',
    hireDate: '2021-11-08',
    engagementScore: 91,
  },
  {
    id: 'james-kim',
    firstName: 'James',
    lastName: 'Kim',
    role: 'Customer Success Manager',
    department: 'Customer Success',
    hireDate: '2020-09-21',
    engagementScore: 70,
  },
  {
    id: 'aisha-williams',
    firstName: 'Aisha',
    lastName: 'Williams',
    role: 'Renewal Specialist',
    department: 'Customer Success',
    hireDate: '2023-01-30',
    engagementScore: 82,
  },
  {
    id: 'diego-rodriguez',
    firstName: 'Diego',
    lastName: 'Rodriguez',
    role: 'Customer Onboarding Specialist',
    department: 'Customer Success',
    hireDate: '2022-03-14',
    engagementScore: 86,
  },
  {
    id: 'hannah-nguyen',
    firstName: 'Hannah',
    lastName: 'Nguyen',
    role: 'Customer Success Manager',
    department: 'Customer Success',
    hireDate: '2021-06-07',
    engagementScore: 81,
  },
  {
    id: 'tom-bennett',
    firstName: 'Tom',
    lastName: 'Bennett',
    role: 'Account Manager',
    department: 'Customer Success',
    hireDate: '2019-11-04',
    engagementScore: 62,
  },
  {
    id: 'olivia-martinez',
    firstName: 'Olivia',
    lastName: 'Martinez',
    role: 'CS Operations Lead',
    department: 'Customer Success',
    hireDate: '2018-05-22',
    engagementScore: 90,
  },
  {
    id: 'raj-mehta',
    firstName: 'Raj',
    lastName: 'Mehta',
    role: 'Solutions Engineer',
    department: 'Customer Success',
    hireDate: '2022-02-14',
    engagementScore: 85,
  },
  {
    id: 'zara-ahmed',
    firstName: 'Zara',
    lastName: 'Ahmed',
    role: 'Customer Success Manager',
    department: 'Customer Success',
    hireDate: '2023-04-17',
    engagementScore: 87,
  },
  {
    id: 'felix-torres',
    firstName: 'Felix',
    lastName: 'Torres',
    role: 'Renewal Specialist',
    department: 'Customer Success',
    hireDate: '2022-09-26',
    engagementScore: 83,
  },
  {
    id: 'naomi-brooks',
    firstName: 'Naomi',
    lastName: 'Brooks',
    role: 'Customer Success Manager',
    department: 'Customer Success',
    hireDate: '2024-01-08',
    engagementScore: 65,
  },
  {
    id: 'wei-liu',
    firstName: 'Wei',
    lastName: 'Liu',
    role: 'Customer Success Manager',
    department: 'Customer Success',
    hireDate: '2021-10-19',
    engagementScore: 58,
  },

  // ===== Other departments (8) =====
  {
    id: 'marcus-thompson',
    firstName: 'Marcus',
    lastName: 'Thompson',
    role: 'Senior Designer',
    department: 'Design',
    hireDate: '2019-06-15',
    engagementScore: 72,
  },
  {
    id: 'priya-shah',
    firstName: 'Priya',
    lastName: 'Shah',
    role: 'Software Engineer',
    department: 'Engineering',
    hireDate: '2022-07-11',
    engagementScore: 78,
  },
  {
    id: 'devon-carter',
    firstName: 'Devon',
    lastName: 'Carter',
    role: 'IT Specialist',
    department: 'IT',
    hireDate: '2026-03-17',
    engagementScore: 89,
  },
  {
    id: 'hannah-reyes',
    firstName: 'Hannah',
    lastName: 'Reyes',
    role: 'Marketing Coordinator',
    department: 'Marketing',
    hireDate: '2023-08-22',
    engagementScore: 80,
  },
  {
    id: 'theo-lambert',
    firstName: 'Theo',
    lastName: 'Lambert',
    role: 'Senior Recruiter',
    department: 'People Operations',
    hireDate: '2020-03-09',
    engagementScore: 84,
  },
  {
    id: 'liam-oconnor',
    firstName: 'Liam',
    lastName: "O'Connor",
    role: 'Software Engineer',
    department: 'Engineering',
    hireDate: '2026-04-01',
    engagementScore: 88,
  },
  {
    id: 'owen-bradley',
    firstName: 'Owen',
    lastName: 'Bradley',
    role: 'Sales Development Rep',
    department: 'Sales',
    hireDate: '2026-04-24',
    engagementScore: 92,
  },
  {
    id: 'riley-chen',
    firstName: 'Riley',
    lastName: 'Chen',
    role: 'Product Designer',
    department: 'Product',
    hireDate: '2022-11-03',
    engagementScore: 76,
  },
];

const castById = new Map(homeCast.map((c) => [c.id, c]));

export function getCastMember(id: string): CastMember {
  const member = castById.get(id);
  if (!member) {
    throw new Error(`Unknown cast member: "${id}". Add to homeCast.ts.`);
  }
  return member;
}

export function getCastMemberOrThrow(id: string): CastMember {
  return getCastMember(id);
}

export function fullName(id: string): string {
  const m = getCastMember(id);
  return `${m.firstName} ${m.lastName}`;
}

export function castAvatar(id: string, size = 120): string {
  return avatarFor(id, size);
}

export function castByDepartment(department: Department): CastMember[] {
  return homeCast.filter((m) => m.department === department);
}

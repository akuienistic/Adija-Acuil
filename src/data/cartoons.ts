import parliamentLeave from "@/assets/cartoons/parliament-leave.jpg";
import investmentPolicies from "@/assets/cartoons/investment-policies.jpg";
import microfinanceInvestors from "@/assets/cartoons/microfinance-investors.jpg";
import newYearPeace from "@/assets/cartoons/new-year-peace.jpg";
import journeyProsperity from "@/assets/cartoons/journey-prosperity.jpg";
import warPeaceChoice from "@/assets/cartoons/war-peace-choice.jpg";
import refugeesCamp from "@/assets/cartoons/refugees-camp.jpg";
import exportsRefugees from "@/assets/cartoons/exports-refugees.jpg";
import developmentCycle from "@/assets/cartoons/development-cycle.jpg";
import chapterOneDevelopment from "@/assets/cartoons/chapter-one-development.jpg";

export interface Cartoon {
  id: string;
  title: string;
  image: string;
  theme: string;
  description?: string;
  date: string;
  likes: number;
}

export const themes = [
  "All",
  "Future",
  "Prosperity",
  "Unity",
  "Microfinance",
  "Peace",
  "Development",
] as const;

export type Theme = (typeof themes)[number];

export const initialCartoons: Cartoon[] = [
  {
    id: "1",
    title: "Parliament on Leave",
    image: parliamentLeave,
    theme: "Future",
    description: "A satirical look at government priorities while the economy struggles.",
    date: "2024-03-08",
    likes: 42,
  },
  {
    id: "2",
    title: "Investment Policies Open Doors",
    image: investmentPolicies,
    theme: "Microfinance",
    description: "Investment policies can unlock opportunities for investors and communities.",
    date: "2025-12-30",
    likes: 38,
  },
  {
    id: "3",
    title: "Microfinance Reality",
    image: microfinanceInvestors,
    theme: "Microfinance",
    description: "The disparity between microfinance promises and reality.",
    date: "2025-12-30",
    likes: 55,
  },
  {
    id: "4",
    title: "New Year, New Hope for Peace",
    image: newYearPeace,
    theme: "Unity",
    description: "A vision for 2026 - together for peace, no more armed opposition.",
    date: "2026-01-01",
    likes: 89,
  },
  {
    id: "5",
    title: "The Long Journey to Prosperity",
    image: journeyProsperity,
    theme: "Prosperity",
    description: "Our long journey towards prosperity - one step at a time.",
    date: "2026-01-02",
    likes: 67,
  },
  {
    id: "6",
    title: "War or Peace - The Choice",
    image: warPeaceChoice,
    theme: "Peace",
    description: "South Sudan caught between forces of war and peace.",
    date: "2025-02-02",
    likes: 73,
  },
  {
    id: "7",
    title: "Refugees and Closed Camps",
    image: refugeesCamp,
    theme: "Future",
    description: "The crisis of displacement and closed refugee camps.",
    date: "2026-01-03",
    likes: 45,
  },
  {
    id: "8",
    title: "South Sudan's Exports",
    image: exportsRefugees,
    theme: "Peace",
    description: "A stark commentary on what South Sudan exports to the world.",
    date: "2026-01-05",
    likes: 52,
  },
  {
    id: "9",
    title: "The Development Cycle",
    image: developmentCycle,
    theme: "Development",
    description: "Caught between peace and war - the endless cycle.",
    date: "2020-08-08",
    likes: 61,
  },
  {
    id: "10",
    title: "Chapter One: True Development",
    image: chapterOneDevelopment,
    theme: "Development",
    description: "Building development on the right foundation.",
    date: "2025-01-10",
    likes: 48,
  },
];

// Local storage keys
export const CARTOONS_STORAGE_KEY = "adija_cartoons";
export const LIKES_STORAGE_KEY = "adija_cartoon_likes";
export const ADMIN_AUTH_KEY = "adija_admin_auth";

export function getStoredCartoons(): Cartoon[] {
  const stored = localStorage.getItem(CARTOONS_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(CARTOONS_STORAGE_KEY, JSON.stringify(initialCartoons));
  return initialCartoons;
}

export function saveCartoons(cartoons: Cartoon[]): void {
  localStorage.setItem(CARTOONS_STORAGE_KEY, JSON.stringify(cartoons));
}

export function getLikedCartoons(): string[] {
  const stored = localStorage.getItem(LIKES_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveLikedCartoons(ids: string[]): void {
  localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(ids));
}

export function isAdminAuthenticated(): boolean {
  return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
}

export function setAdminAuth(authenticated: boolean): void {
  localStorage.setItem(ADMIN_AUTH_KEY, authenticated ? "true" : "false");
}

// Simple admin credentials (for demo purposes)
export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "adija2026";

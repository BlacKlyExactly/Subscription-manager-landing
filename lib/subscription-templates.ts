import type { Category, BillingCycle } from "@/lib/drizzle/schema";

export type Pack = {
  name: string;
  price: number; // in PLN
  billingCycle: BillingCycle;
};

export type ServiceTemplate = {
  name: string;
  emoji: string;
  category: Category;
  packs: Pack[];
};

export const SUBSCRIPTION_TEMPLATES: ServiceTemplate[] = [
  // Streaming
  {
    name: "Netflix",
    emoji: "🎬",
    category: "streaming",
    packs: [
      { name: "Standard z reklamami", price: 29, billingCycle: "monthly" },
      { name: "Standard", price: 43, billingCycle: "monthly" },
      { name: "Premium", price: 60, billingCycle: "monthly" },
    ],
  },
  {
    name: "Disney+",
    emoji: "🏰",
    category: "streaming",
    packs: [
      { name: "Standard", price: 28.99, billingCycle: "monthly" },
      { name: "Premium", price: 37.99, billingCycle: "monthly" },
      { name: "Standard (rocznie)", price: 289.99, billingCycle: "yearly" },
    ],
  },
  {
    name: "Max",
    emoji: "📺",
    category: "streaming",
    packs: [
      { name: "Basic z reklamami", price: 24, billingCycle: "monthly" },
      { name: "Basic", price: 34, billingCycle: "monthly" },
      { name: "Ultimate", price: 49, billingCycle: "monthly" },
    ],
  },
  {
    name: "Amazon Prime",
    emoji: "📦",
    category: "streaming",
    packs: [
      { name: "Miesięcznie", price: 10.99, billingCycle: "monthly" },
      { name: "Rocznie", price: 49, billingCycle: "yearly" },
    ],
  },
  {
    name: "Apple TV+",
    emoji: "🍎",
    category: "streaming",
    packs: [
      { name: "Miesięcznie", price: 37.99, billingCycle: "monthly" },
      { name: "Rocznie", price: 379, billingCycle: "yearly" },
    ],
  },
  {
    name: "YouTube Premium",
    emoji: "▶️",
    category: "streaming",
    packs: [
      { name: "Indywidualny", price: 23.99, billingCycle: "monthly" },
      { name: "Rodzinny", price: 35.99, billingCycle: "monthly" },
    ],
  },
  {
    name: "Paramount+",
    emoji: "⭐",
    category: "streaming",
    packs: [
      { name: "Essential", price: 19.99, billingCycle: "monthly" },
      { name: "Premium", price: 29.99, billingCycle: "monthly" },
    ],
  },
  // Music
  {
    name: "Spotify",
    emoji: "🎵",
    category: "music",
    packs: [
      { name: "Individual", price: 23.99, billingCycle: "monthly" },
      { name: "Duo", price: 31.99, billingCycle: "monthly" },
      { name: "Family", price: 35.99, billingCycle: "monthly" },
      { name: "Student", price: 11.99, billingCycle: "monthly" },
    ],
  },
  {
    name: "Apple Music",
    emoji: "🎶",
    category: "music",
    packs: [
      { name: "Indywidualny", price: 21.99, billingCycle: "monthly" },
      { name: "Rodzinny", price: 32.99, billingCycle: "monthly" },
      { name: "Student", price: 10.99, billingCycle: "monthly" },
    ],
  },
  {
    name: "Tidal",
    emoji: "🌊",
    category: "music",
    packs: [
      { name: "Individual", price: 21.99, billingCycle: "monthly" },
      { name: "Family", price: 32.99, billingCycle: "monthly" },
    ],
  },
  {
    name: "YouTube Music",
    emoji: "🎧",
    category: "music",
    packs: [
      { name: "Indywidualny", price: 23.99, billingCycle: "monthly" },
      { name: "Rodzinny", price: 35.99, billingCycle: "monthly" },
    ],
  },
  // Software
  {
    name: "Microsoft 365",
    emoji: "💼",
    category: "software",
    packs: [
      { name: "Personal (miesięcznie)", price: 37, billingCycle: "monthly" },
      { name: "Personal (rocznie)", price: 349, billingCycle: "yearly" },
      { name: "Family (rocznie)", price: 449, billingCycle: "yearly" },
    ],
  },
  {
    name: "Adobe Creative Cloud",
    emoji: "🎨",
    category: "software",
    packs: [
      { name: "Wszystkie aplikacje", price: 284, billingCycle: "monthly" },
      { name: "Photoshop", price: 119, billingCycle: "monthly" },
      { name: "Illustrator", price: 119, billingCycle: "monthly" },
    ],
  },
  {
    name: "ChatGPT",
    emoji: "🤖",
    category: "software",
    packs: [
      { name: "Plus", price: 81, billingCycle: "monthly" },
      { name: "Pro", price: 810, billingCycle: "monthly" },
    ],
  },
  {
    name: "GitHub",
    emoji: "💻",
    category: "software",
    packs: [
      { name: "Copilot Individual", price: 40, billingCycle: "monthly" },
      { name: "Copilot Business", price: 95, billingCycle: "monthly" },
    ],
  },
  {
    name: "Notion",
    emoji: "📝",
    category: "software",
    packs: [
      { name: "Plus", price: 48, billingCycle: "monthly" },
      { name: "Business", price: 96, billingCycle: "monthly" },
    ],
  },
  {
    name: "Canva",
    emoji: "🖌️",
    category: "software",
    packs: [
      { name: "Pro (miesięcznie)", price: 55, billingCycle: "monthly" },
      { name: "Pro (rocznie)", price: 540, billingCycle: "yearly" },
    ],
  },
  {
    name: "iCloud+",
    emoji: "☁️",
    category: "software",
    packs: [
      { name: "50 GB", price: 4.99, billingCycle: "monthly" },
      { name: "200 GB", price: 9.99, billingCycle: "monthly" },
      { name: "2 TB", price: 29.99, billingCycle: "monthly" },
    ],
  },
  {
    name: "Google One",
    emoji: "🌐",
    category: "software",
    packs: [
      { name: "100 GB", price: 9.99, billingCycle: "monthly" },
      { name: "200 GB", price: 14.99, billingCycle: "monthly" },
      { name: "2 TB", price: 39.99, billingCycle: "monthly" },
    ],
  },
  {
    name: "1Password",
    emoji: "🔒",
    category: "software",
    packs: [
      { name: "Individual", price: 17, billingCycle: "monthly" },
      { name: "Families", price: 26, billingCycle: "monthly" },
    ],
  },
  // Gaming
  {
    name: "PlayStation Plus",
    emoji: "🎮",
    category: "gaming",
    packs: [
      { name: "Essential", price: 38.99, billingCycle: "monthly" },
      { name: "Extra", price: 52.99, billingCycle: "monthly" },
      { name: "Premium", price: 62.99, billingCycle: "monthly" },
      { name: "Essential (rocznie)", price: 299, billingCycle: "yearly" },
    ],
  },
  {
    name: "Xbox Game Pass",
    emoji: "🟢",
    category: "gaming",
    packs: [
      { name: "PC Game Pass", price: 44.99, billingCycle: "monthly" },
      { name: "Ultimate", price: 59.99, billingCycle: "monthly" },
    ],
  },
  {
    name: "EA Play",
    emoji: "⚽",
    category: "gaming",
    packs: [
      { name: "EA Play", price: 19.99, billingCycle: "monthly" },
      { name: "EA Play Pro", price: 49.99, billingCycle: "monthly" },
    ],
  },
  {
    name: "Nintendo Switch Online",
    emoji: "🕹️",
    category: "gaming",
    packs: [
      { name: "Individual (miesięcznie)", price: 9.99, billingCycle: "monthly" },
      { name: "Individual (rocznie)", price: 79.99, billingCycle: "yearly" },
      { name: "Family (rocznie)", price: 139.99, billingCycle: "yearly" },
    ],
  },
  // News
  {
    name: "Polityka",
    emoji: "📰",
    category: "news",
    packs: [
      { name: "Cyfrowa", price: 19.9, billingCycle: "monthly" },
      { name: "Pełna", price: 39.9, billingCycle: "monthly" },
    ],
  },
  {
    name: "Gazeta Wyborcza",
    emoji: "🗞️",
    category: "news",
    packs: [
      { name: "Cyfrowa", price: 29.99, billingCycle: "monthly" },
      { name: "Premium", price: 49.99, billingCycle: "monthly" },
    ],
  },
  {
    name: "Kindle Unlimited",
    emoji: "📚",
    category: "news",
    packs: [
      { name: "Miesięcznie", price: 29.99, billingCycle: "monthly" },
    ],
  },
  // Fitness
  {
    name: "Strava",
    emoji: "🏃",
    category: "fitness",
    packs: [
      { name: "Miesięcznie", price: 34.99, billingCycle: "monthly" },
      { name: "Rocznie", price: 239.99, billingCycle: "yearly" },
    ],
  },
  {
    name: "Garmin Connect+",
    emoji: "⌚",
    category: "fitness",
    packs: [
      { name: "Miesięcznie", price: 8.99, billingCycle: "monthly" },
      { name: "Rocznie", price: 89.99, billingCycle: "yearly" },
    ],
  },
  {
    name: "Whoop",
    emoji: "💪",
    category: "fitness",
    packs: [
      { name: "Membership", price: 99, billingCycle: "monthly" },
    ],
  },
];

export const TEMPLATE_CATEGORIES = [
  { value: "all", label: "Wszystkie" },
  { value: "streaming", label: "Streaming" },
  { value: "music", label: "Muzyka" },
  { value: "software", label: "Software" },
  { value: "gaming", label: "Gry" },
  { value: "news", label: "Newsy" },
  { value: "fitness", label: "Fitness" },
] as const;

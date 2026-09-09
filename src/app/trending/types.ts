export interface TrendingTopic {
  id: string;
  title: string;
  category: string;
  status: "Hot" | "Emerging" | "Evergreen";
  description: string;
  keyPoints: string[];
  contentIdeas: string[];
  sourceUrl?: string;
}

export interface TrendingSnapshot {
  date: string; // ISO standard format YYYY-MM-DD
  title: string;
  description: string;
  topics: TrendingTopic[];
}

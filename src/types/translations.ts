export interface Challenge {
  title: string;
  problem: string;
  solution: string;
  result: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface ProjectTranslations {
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  challenges: Record<string, Challenge>;
  features: Record<string, Feature>;
  metrics: Record<string, Metric>;
}

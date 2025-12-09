export interface PersonTags {
  sleep: string[];
  activity: string[];
  food: string[];
  wellness: string[];
  lifestyle: string[];
}

export interface Person {
  name: string;
  tags: PersonTags;
}

export interface OverlapResult {
  overlapping: string[];
  percentage: number;
  user1Only: string[];
  user2Only: string[];
}

export interface Suggestion {
  icon: React.ReactNode;
  text: string;
  time: string;
}

export interface Suggestions {
  sleep: Suggestion[];
  food: Suggestion[];
  activity: Suggestion[];
  lifestyle: Suggestion[];
}

export interface Insights {
  overall: {
    high: string;
    medium: string;
    low: string;
  };
  sleep: {
    overlap: string;
    early_vs_night: string;
    different: string;
  };
  food: {
    high: string;
    medium: string;
    low: string;
  };
  activity: {
    high: string;
    medium: string;
    low: string;
  };
  wellness: {
    overlap: string;
    different: string;
  };
  lifestyle: {
    high: string;
    medium: string;
    low: string;
  };
}

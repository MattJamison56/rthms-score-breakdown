import { GoogleGenAI } from "@google/genai";
import type { Person } from "../types/compatibility";

// Read API key from environment (Vite: VITE_GEMINI_API_KEY)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

if (!API_KEY) {
  console.warn("Missing VITE_GEMINI_API_KEY; Gemini features will return fallbacks.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "" });

export const generateCompatibilitySuggestion = async (
  category: string,
  person1: Person,
  person2: Person,
  mode: 'solo' | 'dating' | 'friendship'
): Promise<string> => {
  const contextMap = {
    dating: "You are a romantic matchmaker helping two people explore dating compatibility.",
    friendship: "You are a friendship coach helping two people build a great platonic connection.",
    solo: "You are a personal growth coach analyzing someone's lifestyle preferences."
  };

  const activityMap = {
    dating: "suggest a date idea",
    friendship: "suggest a friend hangout",
    solo: "suggest a personal activity"
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
      ${contextMap[mode]}
      Analyze compatibility for category: "${category}".
      Person 1 Tags: ${JSON.stringify(person1.tags)}
      Person 2 Tags: ${JSON.stringify(person2.tags)}
      Important that you respond in under 200 characters.
      Write as if talking to Person 1, in second person.
      Explain what makes you two click in this category, note one friendly difference, and ${activityMap[mode]} you both might enjoy.
      Keep it warm, upbeat, and constructive. ${mode === 'dating' ? 'Add a hint of romance.' : mode === 'friendship' ? 'Keep it fun and supportive.' : ''}
    `,
    });

    const text = response.text || "No suggestion generated.";
    // Only hard-cap at 250 chars to match the prompt
    return text.length > 250 ? `${text.slice(0, 247)}...` : text;
  } catch (error) {
    console.error("Error generating suggestion:", error);
    return "We couldn't generate a custom suggestion right now, but based on your tags, you likely have some interesting overlaps to explore!";
  }
};

export const generateShortIdeas = async (
  category: string,
  person1: Person,
  person2: Person,
  mode: 'solo' | 'dating' | 'friendship' = 'dating'
): Promise<string[]> => {
  const contextMap = {
    dating: "Create 3 date ideas",
    friendship: "Create 3 friend hangout ideas",
    solo: "Create 3 personal activity ideas"
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
      You are a friendly ${mode === 'dating' ? 'matchmaker' : mode === 'friendship' ? 'friendship coach' : 'lifestyle advisor'} AI. ${contextMap[mode]} for category "${category}".
      Person 1 Tags: ${JSON.stringify(person1.tags)}
      Person 2 Tags: ${JSON.stringify(person2.tags)}
      Rules:
      - Return exactly 3 suggestions.
      - Each suggestion must be under 25 characters.
      - No numbering, no quotes, one per line.
      - Keep it upbeat and specific.
      ${mode === 'dating' ? '- Ideas should work as dates.' : mode === 'friendship' ? '- Ideas should be fun and casual.' : ''}
    `,
    });

    const raw = response.text || "";
    const lines = raw
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean)
      .slice(0, 3)
      .map(line => (line.length > 25 ? `${line.slice(0, 22)}...` : line));

    return lines.length === 3 ? lines : [...lines, ...Array(Math.max(0, 3 - lines.length)).fill("Idea coming soon")].slice(0, 3);
  } catch (error) {
    console.error("Error generating short ideas:", error);
    return ["Plan a quick walk", "Try a new café", "Share a playlist"];
  }
};

export interface CompatibilitySection {
  emoji: string;
  title: string;
  body: string;
}

export interface CompatibilityReport {
  headline: string;
  subheadline: string;
  sections: CompatibilitySection[];
}

export const generateCompatibilityReport = async (
  person1: Person,
  person2: Person,
  mode: 'solo' | 'dating' | 'friendship' = 'dating'
): Promise<CompatibilityReport> => {
  const sectionGuidelines = mode === 'dating'
    ? `
      1) Overall Energy (romantic chemistry)
      2) Romantic Compatibility (include a % in the title or body)
      3) Date Activity Compatibility (include a %)
      4) Communication & Connection (include a %)
      5) Lifestyle & Values Alignment (include a %)
      6) Emotional & Intimacy Compatibility (include a %)
      7) Final Dating Verdict
    `
    : mode === 'friendship'
    ? `
      1) Overall Energy (friendship vibes)
      2) Friendship Compatibility (include a % in the title or body)
      3) Shared Activities & Interests (include a %)
      4) Communication Style (include a %)
      5) Social & Lifestyle Compatibility (include a %)
      6) Trust & Support Compatibility (include a %)
      7) Final Friendship Verdict
    `
    : `
      1) Overall Wellness Energy
      2) Sleep & Recovery Patterns
      3) Activity & Fitness Level
      4) Nutrition & Food Choices
      5) Lifestyle & Social Balance
      6) Growth Opportunities
      7) Personal Path Forward
    `;
  const fallback: CompatibilityReport = {
    headline: mode === 'solo' ? 'Your Personal Wellness Report' : `${person1.name} + ${person2.name} Compatibility Reading`,
    subheadline: mode === 'solo' ? 'Insights into your unique lifestyle patterns' : "High-voltage synergy. Scroll for sections.",
    sections: [
      {
        emoji: mode === 'solo' ? "🌟" : "⚡️",
        title: mode === 'solo' ? "Your Energy" : "Overall Energy",
        body: mode === 'solo' 
          ? "You bring a unique blend of habits and preferences to your daily life. Your patterns show room for growth and celebration."
          : "Big vision meets bold execution. You both move fast and spark momentum together."
      },
      {
        emoji: mode === 'solo' ? "😴" : "❤️",
        title: mode === 'solo' ? "Sleep Patterns" : "Friendship",
        body: mode === 'solo'
          ? "Your sleep routine tells a story. Whether you're crushing it or need work, awareness is the first step."
          : "Two yes-people to the same chaos; you hype each other and keep things exciting."
      },
      {
        emoji: mode === 'solo' ? "💪" : "💼",
        title: mode === 'solo' ? "Activity Level" : "Business",
        body: mode === 'solo'
          ? "Movement is medicine. Your activity tags reveal your relationship with fitness and energy."
          : "Visionary + accelerator duo; add a detail-oriented partner to keep the train on track."
      },
      {
        emoji: mode === 'solo' ? "🥗" : "🧠",
        title: mode === 'solo' ? "Nutrition" : "Communication",
        body: mode === 'solo'
          ? "Food fuels everything. Your choices reflect your values, convenience needs, and health priorities."
          : "Fast, persuasive, shorthand lightning. Remember others may need more context."
      },
      {
        emoji: mode === 'solo' ? "🏠" : "🚀",
        title: mode === 'solo' ? "Lifestyle Balance" : "Work Style",
        body: mode === 'solo'
          ? "How you spend your time reveals what you value. Social butterfly or homebody, you do you."
          : "Hate routine, love autonomy, thrive under pressure, delegate details, move fast."
      },
      {
        emoji: mode === 'solo' ? "🎯" : "🪬",
        title: mode === 'solo' ? "Growth Areas" : "Emotional",
        body: mode === 'solo'
          ? "Every profile has potential. Focus on one category at a time and watch the compound effect."
          : "One brings grounding, the other clarity. Works if you both stay present when tense."
      },
      {
        emoji: "✨",
        title: mode === 'solo' ? "Your Path" : "Verdict",
        body: mode === 'solo'
          ? "You're on a journey of self-optimization. Small daily wins create massive long-term transformation."
          : "High-voltage synergy — friends, partners, collaborators. The universe approves."
      }
    ]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
      You are a friendly ${mode === 'dating' ? 'romantic matchmaker' : mode === 'friendship' ? 'friendship coach' : 'lifestyle advisor'} AI. Create a ${mode === 'solo' ? 'personal lifestyle report' : 'compatibility report'} for ${mode === 'solo' ? 'this person' : 'two people'}.
      Person 1: ${person1.name}, Tags: ${JSON.stringify(person1.tags)}
      ${mode !== 'solo' ? `Person 2: ${person2.name}, Tags: ${JSON.stringify(person2.tags)}` : ''}

      Return ONLY valid JSON matching this shape:
      {
        "headline": string,
        "subheadline": string,
        "sections": [
          { "emoji": string, "title": string, "body": string },
          ... up to 7 sections
        ]
      }

      Sections to include, in order (use your words, keep it concise but vivid):${sectionGuidelines}

      Tone: warm, upbeat, ${mode === 'dating' ? 'romantic' : mode === 'friendship' ? 'fun and supportive' : 'motivational'}. Keep each body under 450 characters. Use relevant emojis per section. NO markdown, NO code fences, NO extra keys. Respond with raw JSON only.
    `,
    });

    const text = response.text || "";
    try {
      const cleaned = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
      const parsed = JSON.parse(cleaned) as CompatibilityReport;
      if (!parsed.sections || !Array.isArray(parsed.sections)) {
        throw new Error("Invalid sections");
      }
      const sections = parsed.sections
        .filter(sec => sec?.body)
        .slice(0, 7)
        .map(sec => ({
          emoji: sec.emoji || "✨",
          title: sec.title || "Compatibility",
          body: sec.body || "Great match." 
        }));

      return {
        headline: parsed.headline || fallback.headline,
        subheadline: parsed.subheadline || fallback.subheadline,
        sections: sections.length ? sections : fallback.sections
      };
    } catch (err) {
      console.warn("Failed to parse compatibility report JSON, using fallback.", err);
      return fallback;
    }
  } catch (error) {
    console.error("Error generating compatibility report:", error);
    return fallback;
  }
};

// Solo mode AI functions
export const generateSoloInsights = async (
  category: string,
  person: Person
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
      You are a personal wellness coach analyzing someone's ${category} habits.
      Person Tags: ${JSON.stringify(person.tags)}
      
      Based on their ${category} tags, provide a personalized insight (under 200 characters).
      Be encouraging, specific to their tags, and offer one key observation about their ${category} patterns.
      Write in second person ("You..."). Be warm and motivational.
    `,
    });

    const text = response.text || "Your profile shows interesting patterns in this area!";
    return text.length > 200 ? `${text.slice(0, 197)}...` : text;
  } catch (error) {
    console.error("Error generating solo insight:", error);
    return `Your ${category} habits show unique patterns. Let's explore ways to optimize them!`;
  }
};

export const generateSoloActionItems = async (
  category: string,
  person: Person
): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
      You are a personal coach creating action items for someone's ${category} improvement.
      Person Tags: ${JSON.stringify(person.tags)}
      
      Create 3 specific, actionable steps they can take to improve or maintain their ${category} habits.
      Rules:
      - Each action should be under 50 characters
      - Be specific and realistic
      - Base suggestions on their actual tags
      - No numbering, no quotes, one per line
      - Make it feel personal and achievable
    `,
    });

    const raw = response.text || "";
    const lines = raw
      .split(/\r?\n/)
      .map(line => line.trim().replace(/^[-•*]\s*/, ''))
      .filter(Boolean)
      .slice(0, 3)
      .map(line => (line.length > 50 ? `${line.slice(0, 47)}...` : line));

    return lines.length === 3 
      ? lines 
      : [
          `Track your ${category} patterns daily`,
          `Set one small improvement goal`,
          `Celebrate your progress weekly`
        ];
  } catch (error) {
    console.error("Error generating solo action items:", error);
    return [
      `Track your ${category} patterns daily`,
      `Set one small improvement goal`,
      `Celebrate your progress weekly`
    ];
  }
};

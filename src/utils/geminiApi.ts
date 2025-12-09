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
  person2: Person
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
      You are a friendly matchmaker AI speaking directly to Person 1.
      Analyze compatibility for category: "${category}".
      Person 1 Tags: ${JSON.stringify(person1.tags)}
      Person 2 Tags: ${JSON.stringify(person2.tags)}
      Respond in under 250 characters.
      Write as if talking to Person 1, in second person.
      Explain what makes you two click in this category, note one friendly difference, and suggest a specific activity you both might enjoy.
      Keep it warm, upbeat, and constructive.
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
  person2: Person
): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
      You are a friendly matchmaker AI. Create 3 ultra-short ideas for two people in category "${category}".
      Person 1 Tags: ${JSON.stringify(person1.tags)}
      Person 2 Tags: ${JSON.stringify(person2.tags)}
      Rules:
      - Return exactly 3 suggestions.
      - Each suggestion must be under 25 characters.
      - No numbering, no quotes, one per line.
      - Keep it upbeat and specific.
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
  person2: Person
): Promise<CompatibilityReport> => {
  const fallback: CompatibilityReport = {
    headline: `${person1.name} + ${person2.name} Compatibility Reading`,
    subheadline: "High-voltage synergy. Scroll for sections.",
    sections: [
      {
        emoji: "⚡️",
        title: "Overall Energy",
        body: "Big vision meets bold execution. You both move fast and spark momentum together."
      },
      {
        emoji: "❤️",
        title: "Friendship",
        body: "Two yes-people to the same chaos; you hype each other and keep things exciting."
      },
      {
        emoji: "💼",
        title: "Business",
        body: "Visionary + accelerator duo; add a detail-oriented partner to keep the train on track."
      },
      {
        emoji: "🧠",
        title: "Communication",
        body: "Fast, persuasive, shorthand lightning. Remember others may need more context."
      },
      {
        emoji: "🚀",
        title: "Work Style",
        body: "Hate routine, love autonomy, thrive under pressure, delegate details, move fast."
      },
      {
        emoji: "🪬",
        title: "Emotional",
        body: "One brings grounding, the other clarity. Works if you both stay present when tense."
      },
      {
        emoji: "✨",
        title: "Verdict",
        body: "High-voltage synergy — friends, partners, collaborators. The universe approves."
      }
    ]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
      You are a friendly matchmaker AI. Create a compatibility report for two people.
      Person 1: ${person1.name}, Tags: ${JSON.stringify(person1.tags)}
      Person 2: ${person2.name}, Tags: ${JSON.stringify(person2.tags)}

      Return ONLY valid JSON matching this shape:
      {
        "headline": string,
        "subheadline": string,
        "sections": [
          { "emoji": string, "title": string, "body": string },
          ... up to 7 sections
        ]
      }

      Sections to include, in order (use your words, keep it concise but vivid):
      1) Overall Energy
      2) Friendship Compatibility (include a % in the title or body)
      3) Business Partnership Compatibility (include a %)
      4) Communication Compatibility (include a %)
      5) Work Style Compatibility (include a %)
      6) Emotional Compatibility (include a %)
      7) Final Compatibility Verdict

      Tone: warm, upbeat, encouraging. Keep each body under 450 characters. Use emojis provided per section. NO markdown, NO code fences, NO extra keys. Respond with raw JSON only.
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

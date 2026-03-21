import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ProfileAnalysis {
  profile_analysis: string;
  strengths: string[];
  weaknesses: string[];
  bio_improvements: string[];
  content_strategy: string[];
  visual_improvements: string[];
  conversion_optimization: string[];
  action_plan: string[];
  thirty_day_strategy: {
    overview: string;
    weekly_themes: {
      week: number;
      theme: string;
      content_pillars: string[];
      posting_schedule: string[];
      expected_results: string[];
    }[];
  };
  content_calendar: {
    day: number;
    format: string;
    objective: string;
    title_or_hook: string;
    content_outline: string[];
    cta: string;
  }[];
}

export async function analyzeInstagramProfile(handle: string, url: string, bioLink: string, niche: string): Promise<ProfileAnalysis> {
  const prompt = `
    Analyze the following Instagram profile information and provide a deep strategic improvement plan in Brazilian Portuguese.
    Handle: ${handle}
    URL: ${url}
    Bio Link: ${bioLink}
    Niche/Description: ${niche}

    Follow these instructions:
    1. Evaluate bio, profile picture, highlights, feed, and content consistency.
    2. Identify positioning, value proposition, and communication clarity.
    3. Analyze the bio link coherence and conversion funnel (is it clear what the user should do next?).
    4. Identify weaknesses hindering conversion and growth (e.g., lack of social proof, confusing CTA).
    5. Suggest practical improvements for bio (using the "Who, What, How" framework), content, aesthetics, and strategy.
    6. Suggest content ideas with engagement and growth potential, focusing on building authority.
    7. Point out adjustments to increase authority, followers, and conversions.
    8. Create a 30-day strategy with weekly themes, content pillars, and expected results.
    9. Create a 30-day content calendar with 30 strategic posts (Reels, Carousels, Static, Stories).
    
    For the content calendar, ensure:
    - Mix of Awareness (TOFU), Consideration (MOFU), and Conversion (BOFU) content.
    - Hooks are catchy and relevant to the niche.
    - Outlines are actionable.
    - CTAs are specific and varied.

    IMPORTANT: All text in the JSON response MUST be in Brazilian Portuguese.
    Return the response in JSON format matching the provided schema.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          profile_analysis: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          bio_improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
          content_strategy: { type: Type.ARRAY, items: { type: Type.STRING } },
          visual_improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
          conversion_optimization: { type: Type.ARRAY, items: { type: Type.STRING } },
          action_plan: { type: Type.ARRAY, items: { type: Type.STRING } },
          thirty_day_strategy: {
            type: Type.OBJECT,
            properties: {
              overview: { type: Type.STRING },
              weekly_themes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    week: { type: Type.NUMBER },
                    theme: { type: Type.STRING },
                    content_pillars: { type: Type.ARRAY, items: { type: Type.STRING } },
                    posting_schedule: { type: Type.ARRAY, items: { type: Type.STRING } },
                    expected_results: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ["week", "theme", "content_pillars", "posting_schedule", "expected_results"],
                },
              },
            },
            required: ["overview", "weekly_themes"],
          },
          content_calendar: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.NUMBER },
                format: { type: Type.STRING },
                objective: { type: Type.STRING },
                title_or_hook: { type: Type.STRING },
                content_outline: { type: Type.ARRAY, items: { type: Type.STRING } },
                cta: { type: Type.STRING },
              },
              required: ["day", "format", "objective", "title_or_hook", "content_outline", "cta"],
            },
          },
        },
        required: [
          "profile_analysis", "strengths", "weaknesses", "bio_improvements", 
          "content_strategy", "visual_improvements", "conversion_optimization", 
          "action_plan", "thirty_day_strategy", "content_calendar"
        ],
      },
    },
  });

  return JSON.parse(response.text);
}

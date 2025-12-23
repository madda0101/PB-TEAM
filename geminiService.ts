
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBookSummary = async (title: string, author: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a short, intriguing summary for the book "${title}" by ${author}. Focus on why a reader would find it interesting. Also provide 3 key learning points or themes. Return in a clean format.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Summary unavailable at the moment. Please try again later.";
  }
};

export const getPersonalizedRecommendations = async (purchasedTitles: string[]) => {
  try {
    const prompt = purchasedTitles.length > 0 
      ? `Based on these books: ${purchasedTitles.join(", ")}, recommend 3 similar topics or genres that a reader in Sri Lanka might enjoy.`
      : "Recommend 3 trending book genres for a new reader in Sri Lanka interested in local culture, finance, and history.";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

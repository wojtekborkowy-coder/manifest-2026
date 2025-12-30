
import { GoogleGenAI } from "@google/genai";

export async function generatePersonalizedPoem(): Promise<string> {
  try {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.warn("API_KEY is missing from process.env");
      return getFallbackMessage();
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Napisz krótkie (4-6 wersów), profesjonalne i szczerze ciepłe życzenia noworoczne 2026 od wychowawcy Wojciecha Borkowego dla klasy 4 Technikum Ochrony Środowiska (Tychy ZS1). Skup się na konkretach: zdrowie, rodzina, wiara, energia do działania. Styl nowoczesny, bez rymów. Zacznij od: 'Na kolejny rok życzę Wam aby...'. Nie dodawaj gwiazdek ani podpisu.",
    });
    
    // Zgodnie z wytycznymi: używamy właściwości .text (nie metody)
    return response.text || getFallbackMessage();
  } catch (error) {
    console.error("Gemini Error:", error);
    return getFallbackMessage();
  }
}

function getFallbackMessage(): string {
  return "Na kolejny rok życzę Wam aby,\nwasza wiedza i kompetencje stały się napędem,\nktóry pozwoli Wam realizować każdy ambitny plan.\nNiech zdrowie i wsparcie najbliższych będą stabilnym fundamentem,\na rok 2026 przyniesie sukcesy, z których będziecie dumni.";
}

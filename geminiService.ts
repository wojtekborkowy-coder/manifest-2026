
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generatePersonalizedPoem() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Napisz krótkie (4-6 wersów), profesjonalne i szczerze ciepłe życzenia noworoczne 2026 od wychowawcy Wojciecha Borkowego dla klasy 4 Technikum Ochrony Środowiska (Tychy ZS1).\n\n" +
                "WYTYCZNE DOTYCZĄCE TREŚCI:\n" +
                "1. UNIKAJ patosu typu 'ratowanie planety', 'dobro świata', 'wielka misja'. To brzmi nienaturalnie.\n" +
                "2. SKUP SIĘ NA: konkretnym fachu technika, rzetelnej wiedzy, stabilizacji życiowej i energii do działania.\n" +
                "3. Zacznij od: 'Na kolejny rok życzę Wam aby...'.\n" +
                "4. STYL: Nowoczesny, konkretny, męski, bez rymów częstochowskich. Dopuszczalny wiersz biały lub bardzo oszczędna forma.\n" +
                "5. METAFORA: Moc turbin wiatrowych jako czysta, techniczna siła do realizacji własnych planów, nie jako symbol ekologii, a jako symbol sprawności.\n" +
                "6. WARTOŚCI: Zdrowie, rodzina, miłość, nadzieja, wiara - podane w sposób nienachalny.\n" +
                "7. ZERO gwiazdek (*), zero markdownu, zero podpisów na końcu.",
      config: {
        temperature: 0.6,
      }
    });
    
    return response.text
      .replace(/\*/g, '')
      .replace(/Z poważaniem.*/is, '')
      .replace(/Wojciech Borkowy.*/is, '')
      .replace(/Wychowawca.*/is, '')
      .replace(/Twój wychowawca.*/is, '')
      .trim();
  } catch (error) {
    return "Na kolejny rok życzę Wam aby,\nwasza wiedza i kompetencje stały się napędem,\nktóry jak sprawna turbina, pozwoli Wam realizować każdy ambitny plan.\nNiech zdrowie i wsparcie najbliższych będą stabilnym fundamentem,\na rok 2026 przyniesie konkretne sukcesy, z których będziecie dumni.";
  }
}


import { GoogleGenAI, Type } from "@google/genai";
import { BloodInventory, BloodRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getInventoryInsights = async (inventory: BloodInventory[], requests: BloodRequest[]) => {
  const prompt = `
    As a medical AI specialized in logistics, analyze this blood bank data:
    Inventory: ${JSON.stringify(inventory)}
    Active Requests: ${JSON.stringify(requests)}
    
    Identify:
    1. Critical shortages.
    2. Trends in demand.
    3. Actionable recommendations for blood drive targeting.
    Return a professional summary in markdown format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI insights. Please check inventory levels manually.";
  }
};

export const validateDonorEligibility = async (age: number, weight: number, lastDonation: string, healthConditions: string) => {
  const prompt = `
    Donor details: Age ${age}, Weight ${weight}kg, Last Donation: ${lastDonation}, Health: ${healthConditions}.
    Evaluate eligibility for whole blood donation based on standard WHO guidelines. 
    Return JSON with fields: 'eligible' (boolean), 'reason' (string), 'nextAvailableDate' (string).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            eligible: { type: Type.BOOLEAN },
            reason: { type: Type.STRING },
            nextAvailableDate: { type: Type.STRING },
          },
          required: ["eligible", "reason"]
        }
      },
    });
    return JSON.parse(response.text);
  } catch (error) {
    return { eligible: false, reason: "Manual review required" };
  }
};

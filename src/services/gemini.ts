import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const generateGemini = async (prompt: string) => {
    const result = await model.generateContent(prompt);
    return result.response.text();
};
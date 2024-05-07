import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const generateGemini = async (title: string, description: string) => {
    const prompt = `
    ${title}
    ${description}
    
    Here's the output schema:
    {
        "client": {
          "name": "",
          "industry": "",
          "location": {
            "city": "",
            "country": ""
          }
        },
        "duration": "",
        "budget": "",
        "requirements": {
          "technologies": [],
          "requiredExperience": []
        },
        "developer": {
          "skills": []
        } 
      }
    `;

    const result = await model.generateContent(prompt);
    console.log(result.response.text())
    const response = JSON.parse(result.response.text());
    return response;
};
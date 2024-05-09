import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(`${process.env.VITE_API_KEY}`);
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
      
      Do not respond with your own suggestions or recommendations or feedback.
      Your response should strictly be a JSON object with the above schema.
      
      `;

    const result = await model.generateContent(prompt);
    const response = JSON.parse(result.response.text());
    console.log(response);
    return response;
};
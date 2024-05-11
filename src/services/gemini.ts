import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(`${process.env.VITE_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function eliminarBackticksJSON(texto: string): string {
  // Expresión regular para encontrar ```json seguido por cualquier carácter hasta encontrar ``` o el final del texto
  const regex = /```[Jj][Ss][Oo][Nn]([\s\S]*?)```|\s*```/g;
  // Reemplazar todas las ocurrencias de ```json seguido opcionalmente por comillas al final con una cadena vacía
  return texto.replace(regex, '');
}
const generateProfiles = async (title: string, description: string) => {
    const profilesPrompt = `
    ${title}
    ${description}
    
    Here's the output schema:
    [{
      "profileTitle": "", // e.g. "Desarrollador Frontend"
      "skills": [] // e.g. ["HTML", "CSS", "JavaScript"]
    },
    {
      "profileTitle": "", // e.g. "Diseñador UX/UI"
      "skills": [] // e.g. ["Figma", "Adobe XD", "Sketch"]
    },
    {
      "profileTitle": "", // e.g. "Project Manager"
      "skills": [] // e.g. ["Scrum", "Kanban", "Jira"]
    },
    {
      "profileTitle": "", // e.g. "QA Tester"
      "skills": [] // e.g. ["Selenium", "Cypress", "Jest"]
    },
    {
      "profileTitle": "", // e.g. "DevOps"
      "skills": [] // e.g. ["Docker", "Kubernetes", "Jenkins"]
    }]
    IMPORTANT: ANSWER VARIOUS PROFILES ACCORDING TO THE DESCRIPTION OF THE PROJECT, ITS SCOPE, DURATION Y BUDGET, la idea es armar un equipo completo!

    Do not respond with your own suggestions or recommendations or feedback.
    Your response should strictly be a JSON object with the above schema.    
    `;

    const profiles = await model.generateContent(profilesPrompt);
    const eliminarBackticks = eliminarBackticksJSON(profiles.response.text());
    const profilesResponse = JSON.parse(eliminarBackticks);
    return profilesResponse;
};

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
      "duration": "", // e.g. "2", "4", "6", "8", "12"
      "budget": "", // e.g. "1000.00", "2000.00", "5000.00", "10000.00", "20000.00"
      "scope": [], // e.g. "WEB", "APP", "E-COMMERCE", "LANDING PAGE", "MOBILE", "ANDROID", "IOS"
      "requiredProfiles": []
    }
      
      Do not respond with your own suggestions or recommendations or feedback.
      Your response should strictly be a JSON object with the above schema.
      
      `;

    const result = await model.generateContent(prompt);
    const profiles = await generateProfiles(title, description);
    const eliminarBackticks = eliminarBackticksJSON(result.response.text());
    const response = JSON.parse(eliminarBackticks);
    response.requiredProfiles = profiles;

    return response;
};
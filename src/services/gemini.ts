import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(`${process.env.VITE_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function eliminarBackticksJSON(str: string): string {
  // Eliminar ``` al inicio del string junto con la palabra "markdown" (si existe)
  str = str.replace(/^```(?:json)?/, "");

  // Eliminar ``` al final del string
  str = str.replace(/```$/, "");
  str = str.replace(/```/g, "");

  return str;
}
const generateProfiles = async (title: string, description: string) => {
    const profilesPrompt = `
    titulo:${title}
    descripcion: ${description}

    Con el titulo y descripciones anteriores como referencia, ejecuta lo siguiente:
    Contruye un JSON con la siguiente estructura de perfiles de equipo de trabajo:
    
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
    Responde estríctamente con un objeto JSON con la estructura anterior. Sin comentarios ni sugerencias adicionales. Nada fuera de la estructura solicitada.
    IMPORTANTE: ANSWER VARIOUS PROFILES ACCORDING TO THE DESCRIPTION OF THE PROJECT, ITS SCOPE, DURATION Y BUDGET, la idea es armar un equipo completo!
    `;

    const profiles = await model.generateContent(profilesPrompt);
    const eliminarBackticks = eliminarBackticksJSON(profiles.response.text());
    const profilesResponse = JSON.parse(eliminarBackticks);
    return profilesResponse;
};

export const generateGemini = async (title: string, description: string) => {
    const prompt = `
    titulo: ${title}
    descripcion: ${description}

    Con el titulo y descripciones anteriores, ejecuta lo siguiente:
    Contruye un JSON con la siguiente estructura:
    
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
    Responde estríctamente con un objeto JSON con la estructura anterior. Sin comentarios ni sugerencias adicionales. Nada fuera de la estructura solicitada.  
      `;

    const result = await model.generateContent(prompt);
    const profiles = await generateProfiles(title, description);
    console.log("profiles", profiles);
    const eliminarBackticks = eliminarBackticksJSON(result.response.text());
    const response = JSON.parse(eliminarBackticks);

    response.requiredProfiles = profiles;

    return response;
};
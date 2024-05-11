import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(`${process.env.VITE_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function eliminarBackticksJSON(texto: string): string {
  
}
const generateProfiles = async (title: string, description: string) => {
    const profilesPrompt = `
    titulo:${title}
    descripcion: ${description}

    Con el titulo y descripciones anteriores, ejecuta lo siguiente:
    Contruye un JSON con la siguiente estructura:
    
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
    console.log(profiles.response.text());
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

    //const result = await model.generateContent(prompt);
    //console.log(result.response.text());
    //const profiles = await generateProfiles(title, description);
    //const eliminarBackticks = eliminarBackticksJSON(result.response.text());
    //const response = JSON.parse(eliminarBackticks);

    //response.requiredProfiles = profiles;

    const objeto = {
      "client": {
          "name": null,
          "industry": "Logística",
          "location": {
              "city": "Ciudad de México",
              "country": "México"
          }
      },
      "duration": "6",
      "budget": "200000.00",
      "scope": [
          "WEB",
          "APP",
          "MOBILE"
      ],
      "requiredProfiles": [
          {
              "profileTitle": "Desarrollador Full-Stack",
              "skills": [
                  "Desarrollo web",
                  "Desarrollo móvil",
                  "Algoritmos de optimización",
                  "Sistemas de seguimiento GPS",
                  "Logística"
              ]
          },
          {
              "profileTitle": "Experto en Logística",
              "skills": [
                  "Optimización de rutas",
                  "Sistemas de seguimiento vehicular",
                  "Planificación de entregas"
              ]
          },
          {
              "profileTitle": "Project Manager",
              "skills": [
                  "Gestión de proyectos",
                  "Metodologías ágiles",
                  "Herramientas de gestión de proyectos"
              ]
          },
          {
              "profileTitle": "Diseñador UX/UI",
              "skills": [
                  "Diseño de interfaz de usuario",
                  "Diseño centrado en el usuario",
                  "Experiencia de usuario"
              ]
          },
          {
              "profileTitle": "QA Tester",
              "skills": [
                  "Pruebas de software",
                  "Pruebas de rendimiento",
                  "Automatización de pruebas"
              ]
          }
      ]
  }
    return objeto;
};
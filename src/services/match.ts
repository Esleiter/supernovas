import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(`${process.env.VITE_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

import { useGetData } from "./useSaveData";

export const useGenerateMatch = (project: any) => {
  const { data } = useGetData("consultant");
  const consultansResume = data.map((consultant: any) => ({
    id: consultant.id,
    resume: consultant.resume,
  }));

  const matchPrompt = `
    proyecto: ${JSON.stringify(project)}
    consultores: ${JSON.stringify(consultansResume)}

    Con el proyecto y consultores anteriores como referencia, ejecuta lo siguiente:
    Contruye un ARRAY con la siguiente estructura segun el proyecto y consultores:

    Here's the output schema:
    [{
      "consultantId": "", e.g. "3eEJj7zrlIOz4SPznuDP", "QtCRkytJ35anzr6kX9HE", "SgutFheiJIsN6BbiiXjW", "TlpVOqZNOHNclXOGJMEB", "WZd1C8UEGK4DaQy7PSEZ", "XhY3TbN5BfAkdEoKQvQ0", "fN7qzGDub4Wrf1K7uiyr", "oFmOxmd2SzysByXluDpY", "qyU2X2Ukey9Ryt0iP0yj", "wGmBRmjGrBIcQJyukwqY" // solo las opciones anteriores son validas!

      "score": "0%", // porcentaje del match
      "justifyResume": "" // justifica este consultor con el proyecto
    },
    {
      "consultantId": "", 
      "score": "0%", // porcentage del match
      "justifyResume": ""
    },
    {
      "consultantId": "",
      "score": "0%",
      "justifyResume": ""
    }]

    Responde estríctamente con un objeto JSON con la estructura anterior. Sin comentarios ni sugerencias adicionales. Nada fuera de la estructura solicitada.
    IMPORTANTE: ANSWER VARIOUS CONSULTANTS ACCORDING TO THE PROJECT, ITS SCOPE, DURATION Y BUDGET, la idea es armar un equipo completo!

    `;
  const match = async () => await model.generateContent(matchPrompt);

  // const eliminarBackticks = eliminarBackticksJSON(match.response.text());
  // const response = JSON.parse(eliminarBackticks);

  return { match };
};

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(`${process.env.VITE_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

import { useGetData } from "./useSaveData";
import eliminarBackticksJSON from "./eliminateJson";

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
      "consultantId": "", e.g. "3eEJj7zrlIOz4SPznuDP", // id del consultor debe ser exactamente el mismo
      "score": "0%", // porcentage del match
      "justifyResume": "" // justifica este consultor con el proyecto
    },
    {
      "consultantId": "", e.g. "3eEJj7zrlIOz4SPznuDP", // id del consultor debe ser exactamente el mismo
      "score": "0%", // porcentage del match
      "justifyResume": "" // justifica este consultor con el proyecto
    },
    {
      "consultantId": "", e.g. "3eEJj7zrlIOz4SPznuDP", // id del consultor debe ser exactamente el mismo
      "score": "0%", // porcentage del match
      "justifyResume": "" // justifica este consultor con el proyecto
    }]

    Responde estríctamente con un objeto JSON con la estructura anterior. Sin comentarios ni sugerencias adicionales. Nada fuera de la estructura solicitada.
    IMPORTANTE: ANSWER VARIOUS CONSULTANTS ACCORDING TO THE PROJECT, ITS SCOPE, DURATION Y BUDGET, la idea es armar un equipo completo!

    `;
  const match = async () => await model.generateContent(matchPrompt);

  // const eliminarBackticks = eliminarBackticksJSON(match.response.text());
  // const response = JSON.parse(eliminarBackticks);

  return { match };
};

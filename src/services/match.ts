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
    consultans: ${JSON.stringify(consultansResume)}
    `;
  console.log(matchPrompt);
  const match = async () => await model.generateContent(matchPrompt);

  return { match };
};

function eliminarBackticksJSON(str: string): string {
  // Eliminar ``` al inicio del string junto con la palabra "markdown" (si existe)
  str = str.replace(/^```(?:json)?/, "");

  // Eliminar ``` al final del string
  str = str.replace(/```$/, "");
  str = str.replace(/```/g, "");

  return str;
}

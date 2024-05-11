import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(`${process.env.VITE_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

import { useGetData } from "./useSaveData";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

export const getData = async (name: string) => {
  const myCollection = collection(db, name);
  const data = [];

  try {
    const querySnapshot = await getDocs(myCollection);
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

export const useGenerateMatch = () => {
    const {data}  = useGetData("consultant");
    const consultansResume = data.map((consultant) => ({
        id: consultant.id,
        resume: consultant.resume,
    }));
    
    //const matchPrompt = `
    //proyecto: ${JSON.stringify(project)}
    //consultans: ${JSON.stringify(consultansResume)}
    //`;
    //console.log(matchPrompt);

    return {data}
};

function eliminarBackticksJSON(str: string): string {
    // Eliminar ``` al inicio del string junto con la palabra "markdown" (si existe)
    str = str.replace(/^```(?:json)?/, "");
  
    // Eliminar ``` al final del string
    str = str.replace(/```$/, "");
    str = str.replace(/```/g, "");
  
    return str;
}
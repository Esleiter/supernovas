import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

export const useSaveData = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const save = async (name: string, data: any) => {
    const myCollection = collection(db, name);
    setIsLoading(true);
    await addDoc(myCollection, data);
    setIsLoading(false);
  };

  return {
    save,
    isLoading
  };
};

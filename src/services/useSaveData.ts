import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

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
    isLoading,
  };
};

export const useGetData = (name: string) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const q = query(collection(db, name));
    const unsubscribe = onSnapshot(q, (qs) => {
      let docus = [];
      qs.forEach((doc) => docus.push({ ...doc.data() }));
      setData(docus);
    });

    return () => {
      unsubscribe();
    };
  }, [name]);

  return { data };
};

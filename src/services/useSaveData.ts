import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

export const useSaveData = () => {
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line
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

export const useGetData = <T>(name: string) => {
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    const q = query(collection(db, name));
    const unsubscribe = onSnapshot(q, (qs) => {
      const docus: T[] = [];
      qs.forEach((doc) => docus.push({ ...doc.data() as T }));
      setData(docus);
    });

    return () => {
      unsubscribe();
    };
  }, [name]);

  return { data };
};

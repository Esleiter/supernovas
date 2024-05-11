import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

export const useSaveData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();

  // eslint-disable-next-line
  const save = async (name: string, data: any) => {
    const myCollection = collection(db, name);
    setIsLoading(true);
    const resp: any = await addDoc(myCollection, data);
    setResponse(resp);
    console.log(resp);

    setIsLoading(false);
  };
  return {
    save,
    isLoading,
    response,
  };
};

export const useGetData = <T>(name: string) => {
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    const q = query(collection(db, name));
    const unsubscribe = onSnapshot(q, (qs) => {
      const docus: T[] = [];
      
      qs.forEach((doc) => {
        const added = { id: doc.id , ...doc.data() } as T;
        docus.push(added);
      });
      setData(docus);
    });

    return () => {
      unsubscribe();
    };
  }, [name]);

  return { data };
};

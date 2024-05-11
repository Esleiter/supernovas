import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

export const useSaveData = () => {
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line
  const save = async (name: string, data: any) => {
    const myCollection = collection(db, name);
    setIsLoading(true);
    const resp: any = await addDoc(myCollection, data);
    setIsLoading(false);
    return resp
  };
  return {
    save,
    isLoading
  };
};

export const useGetData = <T>(name: string) => {
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    const q = query(collection(db, name));
    const unsubscribe = onSnapshot(q, (qs) => {
      const docus: T[] = [];
      
      qs.forEach((doc) => {
        const added = {...doc.data(), id: doc.id } as T;
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


export const useGetById = <T extends { id: string }>(name: string, id?: string) => {
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {

    const q = query(collection(db, name));
    const unsubscribe = onSnapshot(q, (qs) => {
      const docus: T[] = [];
      
      qs.forEach((doc) => {
        const added = { id: doc.id , ...doc.data() } as T;
        console.log(added)
        docus.push(added);
      });
      setData(docus);
    });

    return () => {
      unsubscribe();
    };
  }, [name]);

  return { data: data.filter((item) => item?.id === id) };
};

export const useGetByIdConsultant = (name: string) => {
  const refs = async () => await getDocs(collection(db, name))

  return { refs };
};

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

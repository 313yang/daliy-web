import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, documentId, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "./fbase";

export const getUser = async (userId: string) => {
  const q = query(collection(db, "users"), where(documentId(), "in", [userId]));
  let res;
  const result = await getDocs(q);
  result.forEach(async (doc) => {
    res = doc.data().diary;
    // console.log(`${} => ${doc.data()}`);
  });

  return res;
};
export const saveDiary = async (data, userId) => {
  const q = query(collection(db, "users"));
  let arr = [];
  const result = await getDocs(q);
  result.forEach(async (doc) => {
    arr = doc.data().diary;
  });
  console.log(arr);
  const userRef = doc(db, "users", userId);
  const res = setDoc(userRef, { diary: [...arr, data] }, { merge: false });
  // const res = await addDoc(doc(db, "users", userId), data);
  return true;
};

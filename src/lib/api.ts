import { collection, doc, documentId, getDocs, query, setDoc, where } from "firebase/firestore";
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
  const q = query(collection(db, "users"), where(documentId(), "in", [userId]));
  let arr = [];
  const result = await getDocs(q);
  result.forEach(async (doc) => {
    arr = doc.data().diary;
  });
  console.log(arr);
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, { diary: [...arr, data] }, { merge: false });
  // const res = await addDoc(doc(db, "users", userId), data);
  return true;
};
export const updateDiary = async (data, userId) => {
  const q = query(collection(db, "users"), where(documentId(), "in", [userId]));
  let arr = [];

  const result = await getDocs(q);
  result.forEach(async (doc) => {
    arr = doc.data().diary;
  });
  const filterArr = arr.map((li) =>
    li.date === data.date ? { ...li, face: data.face, text: data.text } : li
  );

  const userRef = doc(db, "users", userId);
  await setDoc(userRef, { diary: [...filterArr] }, { merge: false });
  return true;
};

export const deleteDiary = async (date, userId) => {
  console.log(date);
  const q = query(collection(db, "users"), where(documentId(), "in", [userId]));
  let arr = [];

  const result = await getDocs(q);
  result.forEach(async (doc) => {
    arr = doc.data().diary;
  });
  const filterArr = arr.filter((li) => li.date !== date);
  console.log(date, filterArr);
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, { diary: [...filterArr] }, { merge: false });
  return true;
};

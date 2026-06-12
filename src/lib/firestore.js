import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export const listenTickets = (userId, cb) => {
  return onSnapshot(
    query(
      collection(db, "tickets"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    ),
    cb
  );
};

export const createTicket = (data) => {
  return addDoc(collection(db, "tickets"), {
    ...data,
    createdAt: serverTimestamp(),
  });
};
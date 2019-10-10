import firestore from "./Initialize";

export default async function getEvents() {
  return firestore
    .collection("schedule")
    .get();
}
import firestore from "./Initialize";

export default async function getWorkshops() {
  return firestore
    .collection("workshops")
    .orderBy("slot")
    .get();
}

export async function getSlotTimes() {
  return firestore
    .collection("workshopSlots")
    .get()
}
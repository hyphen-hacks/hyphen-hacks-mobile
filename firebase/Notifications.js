import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import firestore from "./Initialize";

export async function registerForPushNotifications() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );

  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    // Stop here if the user did not grant permissions
    if (status !== "granted") {
      return;
    }
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  let querySnapshot = await firestore.collection("tokens").get();
  if (!querySnapshot) return;

  for (let doc of querySnapshot.docs) {
    if (doc.data().token === token) {
      return;
    }
  }

  // store the token in firebase from where it can be retrieved to send push notifications.
  firestore.collection("tokens").add({ token });
}

export async function getPreviousNotifications() {
  return firestore
    .collection("notifications")
    .orderBy("timeStamp", "desc")
    .limit(15)
    .get()
}
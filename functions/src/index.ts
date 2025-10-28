import { defineString } from "firebase-functions/params";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";

const SUBSCRIBER_COLLECTION = defineString("SUBSCRIBER_COLLECTION", { default: "users" }).value();

export const syncSubscriber = onDocumentUpdated(
  {
    document: `${SUBSCRIBER_COLLECTION}/{subscriberId}`,
  },
  async (event) => {
    const subscriberId = event.params.subscriberId;
    try {
      return { success: true, result: { subscriberId } };
    } catch (error) {
      console.error(`Error syncing subscriber ${subscriberId} to Pushfire:`, error);
      throw error;
    }
  }
);

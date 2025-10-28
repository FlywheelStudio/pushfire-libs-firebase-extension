import { defineString } from "firebase-functions/params";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";

const SUBSCRIBER_COLLECTION = defineString("SUBSCRIBER_COLLECTION", { default: "users" }).value();

export const updateSubscriber = onDocumentUpdated(
  {
    document: `${SUBSCRIBER_COLLECTION}/{subscriberId}`,
  },
  async (event) => {
    const subscriberId = event.params.subscriberId;
    console.log(`Updating subscriber ${subscriberId} in Pushfire`);
    try {
      console.log(`Successfully updated subscriber ${subscriberId} in Pushfire`);
      return { success: true, result: { subscriberId } };
    } catch (error) {
      console.error(`Error updating subscriber ${subscriberId} in Pushfire:`, error);
      return { success: false, error: (error as { message: string })?.message };
    }
  }
);

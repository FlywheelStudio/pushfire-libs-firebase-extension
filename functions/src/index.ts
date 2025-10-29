import { onDocumentUpdated } from "firebase-functions/v2/firestore";

export const updateSubscriber = onDocumentUpdated(
  {
    document: `${process.env.MATCHING_COLLECTION_FOR_SUBSCRIBER}/{subscriberId}`,
  },
  async (event) => {
    const subscriberId = event.params.subscriberId;
    try {
      console.log("================================================");
      console.log(JSON.stringify(event, null, 2));
      console.log("================================================");
      console.log(
        `Successfully updated subscriber ${subscriberId} in Pushfire`
      );
      return { success: true, result: { subscriberId } };
    } catch (error) {
      console.error(
        `Error updating subscriber ${subscriberId} in Pushfire:`,
        error
      );
      return { success: false, error: (error as { message: string })?.message };
    }
  }
);

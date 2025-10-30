/**
 * Firebase Extension for Pushfire Subscriber Synchronization
 *
 * This extension listens to Firestore document updates and synchronizes
 * subscriber data with Pushfire using configurable field mapping.
 */

import { onDocumentUpdated } from "firebase-functions/v2/firestore";
import {
  mapSubscriberData,
  parseMappingConfiguration,
} from "./services/firestore/mapping";
import {
  isRawFirestoreEvent,
  parseFirestoreDocument,
} from "./services/firestore/parser";
import { Pushfire, PushfireError } from "./services/pushfire/client";
import { FirestoreDocumentData } from "./types/mapping.types";

/**
 * Response structure for the Cloud Function
 */
interface FunctionResponse {
  success: boolean;
  result?: {
    message?: string;
  };
  error?: string;
}

/**
 * Firebase Cloud Function that triggers on subscriber document updates
 *
 * Environment Variables Required:
 * - MATCHING_COLLECTION_FOR_SUBSCRIBER: Firestore collection path for subscribers
 * - PUSHFIRE_MATCHING_TOKEN_JSON_SCHEMA_CONFIGURATION: JSON configuration for field mapping
 */
export const updateSubscriber = onDocumentUpdated(
  {
    document: `${process.env.MATCHING_COLLECTION_FOR_SUBSCRIBER}/{documentId}`,
  },
  async (event: any): Promise<FunctionResponse> => {
    console.log("Processing subscriber update...");

    try {
      // Validate required environment variables
      if (!process.env.PUSHFIRE_MATCHING_TOKEN_JSON_SCHEMA_CONFIGURATION) {
        throw new Error(
          "Missing required environment variable: PUSHFIRE_MATCHING_TOKEN_JSON_SCHEMA_CONFIGURATION"
        );
      }

      console.log("Raw event:", JSON.stringify(event, null, 2));

      // Check if event is in raw Firestore format (Firebase Extensions)
      let documentData: FirestoreDocumentData;

      if (isRawFirestoreEvent(event)) {
        // Handle raw Firestore format from Firebase Extensions
        if (!event.value) {
          console.error("No value found in event");
          return {
            success: false,
            error: "No document data in event",
          };
        }

        documentData = parseFirestoreDocument(event.value);
        console.log(
          "Parsed document data:",
          JSON.stringify(documentData, null, 2)
        );
      } else if (event.data) {
        // Handle processed format from standard Functions
        if (!event.data.after.exists) {
          console.log("Document was deleted, skipping update");
          return {
            success: true,
            result: { message: "Document deleted, no action needed" },
          };
        }

        documentData = event.data.after.data() as FirestoreDocumentData;
        console.log(
          "Document data extracted:",
          JSON.stringify(documentData, null, 2)
        );
      } else {
        throw new Error("Invalid event format: missing data");
      }

      if (!documentData || Object.keys(documentData).length === 0) {
        throw new Error("Failed to parse or extract document data");
      }

      // Parse mapping configuration
      const mappingConfiguration = parseMappingConfiguration(
        process.env.PUSHFIRE_MATCHING_TOKEN_JSON_SCHEMA_CONFIGURATION
      );

      // Map document data to Pushfire format
      const mappedData = mapSubscriberData(documentData, mappingConfiguration);
      console.log(
        "Document data mapped successfully",
        JSON.stringify(mappedData, null, 2)
      );

      // Send mapped data to Pushfire API
      const pushfire = new Pushfire();
      const response = await pushfire.updateSubscriber(mappedData);

      console.log("Subscriber updated successfully in Pushfire");
      return {
        success: true,
        result: { message: response.message },
      };
    } catch (error) {
      // Handle specific error types
      if (error instanceof PushfireError) {
        console.error("Pushfire API error updating subscriber:", {
          message: error.message,
          statusCode: error.statusCode,
          details: error.details,
        });
        return {
          success: false,
          error: `Pushfire API error: ${error.message}`,
        };
      }

      // Handle generic errors
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error updating subscriber in Pushfire:", error);

      return {
        success: false,
        error: errorMessage,
      };
    }
  }
);

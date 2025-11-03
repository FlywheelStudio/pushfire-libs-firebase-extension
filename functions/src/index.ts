/**
 * Firebase Extension for Pushfire Subscriber Synchronization
 *
 * This extension listens to Firestore document updates and synchronizes
 * subscriber data with Pushfire using configurable field mapping.
 */

import { FirestoreMapper } from "@/services/firestore/mapping";
import { FirestoreParser } from "@/services/firestore/parser";
import { PushfireClient, PushfireError } from "@/services/pushfire/client";
import { FirestoreDocumentData } from "@/types/firestore.types";
import { logger } from "@/utils/log/logger";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";

/**
 * Response structure returned by the Cloud Function.
 */
interface FunctionResponse {
  /** Indicates whether the operation succeeded */
  success: boolean;
  /** Result data when operation succeeds */
  result?: {
    message?: string;
  };
  /** Error message when operation fails */
  error?: string;
}

/**
 * Firebase Cloud Function that triggers on Firestore subscriber document updates.
 *
 * Synchronizes subscriber data with Pushfire API using configurable field mapping.
 *
 * **Required Environment Variables:**
 * - `MATCHING_COLLECTION_FOR_SUBSCRIBER`: Firestore collection path for subscribers
 * - `PUSHFIRE_MATCHING_TOKEN_JSON_SCHEMA_CONFIGURATION`: JSON field mapping configuration
 *
 * @returns Promise resolving to function response with success status
 */
export const updateSubscriber = onDocumentUpdated(
  {
    document: `${process.env.MATCHING_COLLECTION_FOR_SUBSCRIBER}/{documentId}`,
  },
  async (event: any): Promise<FunctionResponse> => {
    logger.info("Processing subscriber update");

    const parser = new FirestoreParser();
    const mapper = new FirestoreMapper();
    const pushfireClient = new PushfireClient();

    try {
      if (!process.env.PUSHFIRE_MATCHING_TOKEN_JSON_SCHEMA_CONFIGURATION) {
        throw new Error(
          "Missing required environment variable: PUSHFIRE_MATCHING_TOKEN_JSON_SCHEMA_CONFIGURATION"
        );
      }

      logger.info("Raw event", JSON.stringify(event, null, 2));

      let documentData: FirestoreDocumentData;

      if (parser.isRawEvent(event)) {
        if (!event.value) {
          logger.error("No value found in event");
          return {
            success: false,
            error: "No document data in event",
          };
        }

        documentData = parser.parseDocument(event.value);
        logger.info(
          "Parsed document data",
          JSON.stringify(documentData, null, 2)
        );
      } else if (event.data) {
        if (!event.data.after.exists) {
          logger.info("Document was deleted, skipping update");
          return {
            success: true,
            result: { message: "Document deleted, no action needed" },
          };
        }

        documentData = event.data.after.data() as FirestoreDocumentData;
        logger.info(
          "Document data extracted",
          JSON.stringify(documentData, null, 2)
        );
      } else {
        throw new Error("Invalid event format: missing data");
      }

      if (!documentData || Object.keys(documentData).length === 0) {
        throw new Error("Failed to parse or extract document data");
      }

      const mappingConfiguration = mapper.parseConfiguration(
        process.env.PUSHFIRE_MATCHING_TOKEN_JSON_SCHEMA_CONFIGURATION
      );

      const mappedData = mapper.mapSubscriberData(
        documentData,
        mappingConfiguration
      );
      logger.success(
        "Document data mapped successfully",
        JSON.stringify(mappedData, null, 2)
      );

      const response = await pushfireClient.updateSubscriber({
        data: mappedData,
      });

      logger.success("Subscriber updated successfully in Pushfire");
      return {
        success: true,
        result: { message: response.message },
      };
    } catch (error) {
      if (error instanceof PushfireError) {
        logger.error("Pushfire API error updating subscriber", {
          message: error.message,
          statusCode: error.statusCode,
        });

        // For 400 Bad Request, include more context in the response
        const errorMessage =
          error.statusCode === 400
            ? `Pushfire API validation error (400): ${error.message}`
            : `Pushfire API error (${error.statusCode}): ${error.message}`;

        return {
          success: false,
          error: errorMessage,
        };
      }

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      logger.error("Error updating subscriber in Pushfire", error);

      return {
        success: false,
        error: errorMessage,
      };
    }
  }
);

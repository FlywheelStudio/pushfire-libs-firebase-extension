/**
 * Pushfire API service for communicating with Pushfire Edge Functions
 */

import { MappedSubscriberData } from "../../types/mapping.types";
import {
  PushfireClientConfiguration,
  PushfireErrorResponse,
  PushfireSuccessResponse,
  SubscriberUpdateRequest,
} from "../../types/pushfire.types";

/**
 * Custom error class for Pushfire operations
 */
export class PushfireError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly details?: string
  ) {
    super(message);
    this.name = "PushfireError";
  }
}

/**
 * Pushfire service for Edge Functions communication
 */
export class Pushfire {
  private readonly config: Required<PushfireClientConfiguration>;

  /**
   * Create Pushfire instance from environment variables
   * @throws {PushfireError} When required environment variables are missing
   */
  constructor(config?: PushfireClientConfiguration) {
    // Use provided config or load from environment
    const baseUrl = config?.baseUrl || "https://api.pushfire.app/functions/v1";
    const apiKey = config?.apiKey || process.env.PUSHFIRE_PROJECT_TOKEN;

    if (!apiKey) {
      throw new PushfireError(
        "Missing required environment variable: PUSHFIRE_PROJECT_TOKEN"
      );
    }

    // Ensure base URL doesn't end with slash
    const normalizedBaseUrl = baseUrl.replace(/\/$/, "");

    this.config = {
      baseUrl: normalizedBaseUrl,
      apiKey,
      timeout: config?.timeout ?? 10000, // Default 10 seconds
    };
  }

  /**
   * Build subscriber update payload
   * @param subscriberId - The subscriber ID from Firestore
   * @param mappedData - Mapped subscriber data
   * @returns Request payload
   */
  private buildUpdatePayload(
    mappedData: MappedSubscriberData
  ): SubscriberUpdateRequest {
    return {
      data: {
        externalId: mappedData.externalId,
        name: mappedData.name,
        email: mappedData.email,
        phone: mappedData.phone,
        metadata: mappedData.metadata,
      },
    };
  }

  /**
   * Update subscriber via Pushfire API
   * @param subscriberId - The subscriber ID from Firestore
   * @param mappedData - Mapped subscriber data
   * @returns Pushfire API success response
   * @throws {PushfireError} When request fails
   */
  async updateSubscriber(
    mappedData: MappedSubscriberData
  ): Promise<PushfireSuccessResponse> {
    const payload = this.buildUpdatePayload(mappedData);
    const endpoint = `${this.config.baseUrl}/api/v1/subscribers/update-subscriber`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        this.config.timeout
      );

      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = (await response.json()) as PushfireErrorResponse;
        throw new PushfireError(
          errorData.error || "Failed to update subscriber",
          response.status,
          errorData.details
        );
      }

      const data = (await response.json()) as PushfireSuccessResponse;
      return data;
    } catch (error) {
      if (error instanceof PushfireError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new PushfireError(
            `Request timeout after ${this.config.timeout}ms`,
            408
          );
        }
        throw new PushfireError(
          `Network error: ${error.message}`,
          undefined,
          error.message
        );
      }

      throw new PushfireError(
        "Unknown error occurred during Pushfire API request"
      );
    }
  }
}

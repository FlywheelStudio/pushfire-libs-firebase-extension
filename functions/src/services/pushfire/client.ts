/**
 * Pushfire API service for communicating with Pushfire Edge Functions
 */

import {
  PushfireClientConfiguration,
  PushfireErrorResponse,
  PushfireSuccessResponse,
  SubscriberUpdateRequest,
} from "@/types/pushfire.types";

/**
 * Custom error class for Pushfire API operations.
 *
 * Extends the standard Error class with an optional HTTP status code
 * for better error handling and logging.
 */
export class PushfireError extends Error {
  /**
   * Creates a new PushfireError instance.
   *
   * @param message - Human-readable error message
   * @param statusCode - Optional HTTP status code from the API response
   */
  constructor(message: string, public readonly statusCode?: number) {
    super(message);
    this.name = "PushfireError";
  }
}

/**
 * Pushfire client for communicating with Pushfire Edge Functions API.
 *
 * Handles subscriber synchronization, authentication, and error management.
 */
export class PushfireClient {
  private readonly config: Required<PushfireClientConfiguration>;

  /**
   * Creates a new Pushfire client instance.
   *
   * Configuration can be provided explicitly or will be loaded from
   * environment variables (PUSHFIRE_PROJECT_TOKEN).
   *
   * @param config - Optional client configuration
   * @throws {PushfireError} When required configuration is missing
   */
  constructor(config?: PushfireClientConfiguration) {
    const baseUrl = config?.baseUrl || "https://api.pushfire.app/functions/v1";
    const apiKey = config?.apiKey || process.env.PUSHFIRE_PROJECT_TOKEN;

    if (!apiKey) {
      throw new PushfireError(
        "Missing required environment variable: PUSHFIRE_PROJECT_TOKEN"
      );
    }

    const normalizedBaseUrl = baseUrl.replace(/\/$/, "");

    this.config = {
      baseUrl: normalizedBaseUrl,
      apiKey,
      timeout: config?.timeout ?? 10000,
    };
  }

  /**
   * Updates a subscriber in the Pushfire system via the API.
   *
   * Sends a PATCH request to the Pushfire API with the mapped subscriber data.
   * Handles timeouts, network errors, and API errors gracefully.
   *
   * @param payload - Subscriber data wrapped in request format
   * @returns API success response with confirmation message
   * @throws {PushfireError} When the request fails (network, timeout, or API error)
   */
  async updateSubscriber(
    payload: SubscriberUpdateRequest
  ): Promise<PushfireSuccessResponse> {
    const endpoint = `${this.config.baseUrl}/subscribers/update-subscriber`;

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
        const errorMessage = errorData.details
          ? `${errorData.error}: ${errorData.details}`
          : errorData.error || "Failed to update subscriber";
        throw new PushfireError(errorMessage, response.status);
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
        throw new PushfireError(`Network error: ${error.message}`);
      }

      throw new PushfireError(
        "Unknown error occurred during Pushfire API request"
      );
    }
  }
}

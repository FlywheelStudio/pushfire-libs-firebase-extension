/**
 * Pushfire API request and response type definitions.
 */

/**
 * Request structure for updating a subscriber via Pushfire API.
 */
export interface SubscriberUpdateRequest {
  data: {
    /** Unique identifier for the subscriber in external system */
    externalId: string;
    /** Subscriber's full name */
    name: string;
    /** Subscriber's email address */
    email: string;
    /** Subscriber's phone number */
    phone: string;
    /** Additional custom metadata */
    metadata: Record<string, unknown>;
  };
}

/**
 * Successful response from Pushfire API.
 */
export interface PushfireSuccessResponse {
  /** Success message from the API */
  message: string;
}

/**
 * Error response from Pushfire API.
 */
export interface PushfireErrorResponse {
  /** Error message describing what went wrong */
  error: string;
  /** Optional additional error details */
  details?: string;
}

/**
 * Configuration for the Pushfire API client.
 */
export interface PushfireClientConfiguration {
  /** Base URL for the Pushfire API */
  baseUrl: string;
  /** API key for authentication */
  apiKey: string;
  /** Request timeout in milliseconds (default: 10000) */
  timeout?: number;
}

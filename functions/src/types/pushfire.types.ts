/**
 * Pushfire API request and response type definitions
 */

/**
 * Subscriber data structure for Pushfire API requests
 */
export interface SubscriberUpdateRequest {
  data: {
    externalId: string;
    name: string;
    email: string;
    phone: string;
    metadata: Record<string, unknown>;
  };
}

/**
 * Successful Pushfire API response structure
 */
export interface PushfireSuccessResponse {
  message: string;
}

/**
 * Error Pushfire API response structure
 */
export interface PushfireErrorResponse {
  error: string;
  details?: string;
}

/**
 * Pushfire API client configuration
 */
export interface PushfireClientConfiguration {
  baseUrl: string;
  apiKey: string;
  timeout?: number;
}

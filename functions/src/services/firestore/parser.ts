/**
 * Firestore raw document parser for Firebase Extension events
 *
 * Firebase Extensions receive events in raw Firestore format with field types
 * like stringValue, integerValue, etc. This parser converts them to JavaScript objects.
 */

import {
  FirestoreDocumentData,
  RawFirestoreDocument,
  RawFirestoreEvent,
  RawFirestoreFieldValue,
} from "@/types/firestore.types";

/**
 * Service for parsing raw Firestore documents to JavaScript objects.
 *
 * Converts Firebase Extension event format (with field types like stringValue,
 * integerValue, etc.) to standard JavaScript objects.
 */
export class FirestoreParser {
  /**
   * Parses an individual Firestore field value to its native JavaScript type.
   *
   * Supports: string, integer, double, boolean, timestamp, null, arrays, and maps.
   *
   * @param value - The raw Firestore field value
   * @returns The converted JavaScript value
   */
  private parseValue(value: RawFirestoreFieldValue): unknown {
    if (value.stringValue !== undefined) {
      return value.stringValue;
    }

    if (value.integerValue !== undefined) {
      return parseInt(value.integerValue, 10);
    }

    if (value.doubleValue !== undefined) {
      return parseFloat(value.doubleValue);
    }

    if (value.booleanValue !== undefined) {
      return value.booleanValue;
    }

    if (value.timestampValue !== undefined) {
      return new Date(value.timestampValue);
    }

    if (value.nullValue !== undefined) {
      return null;
    }

    if (value.arrayValue !== undefined) {
      return value.arrayValue.values?.map((v) => this.parseValue(v)) || [];
    }

    if (value.mapValue !== undefined && value.mapValue.fields) {
      const nested: Record<string, unknown> = {};
      for (const [nestedKey, nestedValue] of Object.entries(
        value.mapValue.fields
      )) {
        nested[nestedKey] = this.parseValue(nestedValue);
      }
      return nested;
    }

    return null;
  }

  /**
   * Converts a raw Firestore document to a JavaScript object.
   *
   * @param rawDoc - The raw Firestore document with typed field values
   * @returns Parsed JavaScript object with native types
   * @example
   * ```typescript
   * const raw = { fields: { name: { stringValue: "John" } } };
   * const parsed = parser.parseDocument(raw); // { name: "John" }
   * ```
   */
  parseDocument(rawDoc: RawFirestoreDocument): FirestoreDocumentData {
    if (!rawDoc || !rawDoc.fields) {
      return {};
    }

    const parsed: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(rawDoc.fields)) {
      parsed[key] = this.parseValue(value);
    }

    return parsed;
  }

  /**
   * Checks if an event is in raw Firestore format (Firebase Extensions).
   *
   * @param event - The event to check
   * @returns True if the event contains raw Firestore document format
   */
  isRawEvent(event: unknown): event is RawFirestoreEvent {
    return (typeof event === "object" &&
      event !== null &&
      "value" in event &&
      event.value &&
      typeof event.value === "object" &&
      "fields" in event.value) as boolean;
  }
}

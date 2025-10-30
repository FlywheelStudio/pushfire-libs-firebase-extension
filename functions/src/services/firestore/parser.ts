/**
 * Firestore raw document parser for Firebase Extension events
 *
 * Firebase Extensions receive events in raw Firestore format with field types
 * like stringValue, integerValue, etc. This parser converts them to JavaScript objects.
 */

import { FirestoreDocumentData } from "../../types/mapping.types";

/**
 * Interface for raw Firestore field value
 */
interface RawFirestoreFieldValue {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: string;
  booleanValue?: boolean;
  timestampValue?: string;
  nullValue?: null;
  arrayValue?: { values?: RawFirestoreFieldValue[] };
  mapValue?: { fields?: Record<string, RawFirestoreFieldValue> };
}

/**
 * Interface for raw Firestore document
 */
interface RawFirestoreDocument {
  name?: string;
  fields?: Record<string, RawFirestoreFieldValue>;
  createTime?: string;
  updateTime?: string;
}

/**
 * Convert raw Firestore document to JavaScript object
 */
export function parseFirestoreDocument(
  rawDoc: RawFirestoreDocument
): FirestoreDocumentData {
  if (!rawDoc || !rawDoc.fields) {
    return {};
  }

  const parsed: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(rawDoc.fields)) {
    parsed[key] = parseFirestoreValue(value);
  }

  return parsed;
}

/**
 * Parse individual Firestore field value
 */
function parseFirestoreValue(value: RawFirestoreFieldValue): unknown {
  // String value
  if (value.stringValue !== undefined) {
    return value.stringValue;
  }

  // Integer value
  if (value.integerValue !== undefined) {
    return parseInt(value.integerValue, 10);
  }

  // Double value
  if (value.doubleValue !== undefined) {
    return parseFloat(value.doubleValue);
  }

  // Boolean value
  if (value.booleanValue !== undefined) {
    return value.booleanValue;
  }

  // Timestamp value
  if (value.timestampValue !== undefined) {
    return new Date(value.timestampValue);
  }

  // Null value
  if (value.nullValue !== undefined) {
    return null;
  }

  // Array value
  if (value.arrayValue !== undefined) {
    return value.arrayValue.values?.map((v) => parseFirestoreValue(v)) || [];
  }

  // Map value (nested object)
  if (value.mapValue !== undefined && value.mapValue.fields) {
    const nested: Record<string, unknown> = {};
    for (const [nestedKey, nestedValue] of Object.entries(
      value.mapValue.fields
    )) {
      nested[nestedKey] = parseFirestoreValue(nestedValue);
    }
    return nested;
  }

  // Unknown type
  return null;
}

/**
 * Check if event is in raw Firestore format
 */
export function isRawFirestoreEvent(event: unknown): event is {
  value?: RawFirestoreDocument;
  oldValue?: RawFirestoreDocument;
  updateMask?: unknown;
  params?: unknown;
} {
  return (typeof event === "object" &&
    event !== null &&
    "value" in event &&
    event.value &&
    typeof event.value === "object" &&
    "fields" in event.value) as boolean;
}

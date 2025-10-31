/**
 * Field mapping type definitions for Firebase to Pushfire synchronization.
 */

/**
 * Base configuration shared across all field mapping types.
 */
interface BaseFieldMapping {
  /** Source field name in Firestore (supports dot notation for nested fields) */
  sourceName: string;
  /** Target field name in Pushfire API */
  targetName: string;
}

/**
 * Configuration for mapping text/string fields.
 */
export interface TextFieldMapping extends BaseFieldMapping {
  type: "text";
  /** Optional fallback value when source field is missing */
  fallbackValue?: string;
}

/**
 * Configuration for mapping numeric fields.
 */
export interface NumberFieldMapping extends BaseFieldMapping {
  type: "number";
  /** Optional fallback value when source field is missing */
  fallbackValue?: number;
}

/**
 * Configuration for mapping boolean fields.
 */
export interface BooleanFieldMapping extends BaseFieldMapping {
  type: "boolean";
  /** Optional fallback value when source field is missing */
  fallbackValue?: boolean;
}

/**
 * Configuration for mapping complex nested objects (JSONB fields).
 *
 * Supports recursive field mapping for deeply nested structures.
 */
export interface JsonbFieldMapping {
  /** Optional source field name (if omitted, used for top-level metadata) */
  sourceName?: string;
  /** Target field name in Pushfire API */
  targetName: string;
  type: "jsonb";
  /** Nested field mappings for the object structure */
  fields: FieldMapping[];
}

/**
 * Union type representing all supported field mapping configurations.
 */
export type FieldMapping =
  | TextFieldMapping
  | NumberFieldMapping
  | BooleanFieldMapping
  | JsonbFieldMapping;

/**
 * Complete subscriber mapping configuration schema.
 *
 * Defines how to map Firestore document fields to Pushfire subscriber format.
 */
export interface SubscriberMappingConfiguration {
  externalId: TextFieldMapping;
  name: TextFieldMapping;
  email: TextFieldMapping;
  phone: TextFieldMapping;
  metadata: JsonbFieldMapping;
}

/**
 * Generic Firestore document data structure.
 *
 * Represents parsed Firestore documents as JavaScript objects.
 */
export type FirestoreDocumentData = Record<string, unknown>;

/**
 * Raw Firestore field value representation from Firebase Extensions.
 *
 * Firebase Extensions use typed field values (e.g., stringValue, integerValue)
 * instead of native JavaScript types.
 */
export interface RawFirestoreFieldValue {
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
 * Raw Firestore document representation from Firebase Extensions.
 */
export interface RawFirestoreDocument {
  /** Document path in Firestore */
  name?: string;
  /** Document fields with typed values */
  fields?: Record<string, RawFirestoreFieldValue>;
  /** Creation timestamp */
  createTime?: string;
  /** Last update timestamp */
  updateTime?: string;
}

/**
 * Raw Firestore event structure from Firebase Extensions.
 *
 * Used by Firebase Extensions to trigger Cloud Functions.
 */
export interface RawFirestoreEvent {
  /** Current document state */
  value?: RawFirestoreDocument;
  /** Previous document state */
  oldValue?: RawFirestoreDocument;
  /** Fields that were updated */
  updateMask?: unknown;
  /** Function invocation parameters */
  params?: unknown;
}

/**
 * Field mapping type definitions for Firebase to Pushfire synchronization
 */

/**
 * Base field mapping configuration
 */
interface BaseFieldMapping {
  sourceName: string;
  targetName: string;
}

/**
 * Text field mapping configuration
 */
export interface TextFieldMapping extends BaseFieldMapping {
  type: "text";
  fallbackValue?: string;
}

/**
 * Number field mapping configuration
 */
export interface NumberFieldMapping extends BaseFieldMapping {
  type: "number";
  fallbackValue?: number;
}

/**
 * Boolean field mapping configuration
 */
export interface BooleanFieldMapping extends BaseFieldMapping {
  type: "boolean";
  fallbackValue?: boolean;
}

/**
 * JSONB field mapping configuration (recursive)
 */
export interface JsonbFieldMapping {
  sourceName?: string;
  targetName: string;
  type: "jsonb";
  fields: FieldMapping[];
}

/**
 * Union type for all field mapping configurations
 */
export type FieldMapping =
  | TextFieldMapping
  | NumberFieldMapping
  | BooleanFieldMapping
  | JsonbFieldMapping;

/**
 * Complete subscriber mapping configuration schema
 */
export interface SubscriberMappingConfiguration {
  externalId: TextFieldMapping;
  name: TextFieldMapping;
  email: TextFieldMapping;
  phone: TextFieldMapping;
  metadata: JsonbFieldMapping;
}

/**
 * Firestore document data structure (generic)
 */
export type FirestoreDocumentData = Record<string, unknown>;

/**
 * Mapped subscriber data ready for API submission
 */
export interface MappedSubscriberData {
  externalId: string;
  name: string;
  email: string;
  phone: string;
  metadata: Record<string, unknown>;
}


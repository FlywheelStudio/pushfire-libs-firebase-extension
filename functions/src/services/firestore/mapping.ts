/**
 * Field mapping service for transforming Firestore documents to Pushfire format
 */

import {
  FieldMapping,
  FirestoreDocumentData,
  JsonbFieldMapping,
  MappedSubscriberData,
  SubscriberMappingConfiguration,
} from "../../types/mapping.types";

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: FirestoreDocumentData, path: string): unknown {
  if (!path) return null;

  return path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object") {
      const currentObj = current as Record<string, unknown>;
      return key in currentObj ? currentObj[key] : null;
    }
    return null;
  }, obj);
}

/**
 * Map a single field based on its configuration
 */
function mapField(
  source: FirestoreDocumentData,
  mapping: FieldMapping
): unknown {
  // Handle JSONB type separately
  if (mapping.type === "jsonb") {
    return mapJsonbField(source, mapping as JsonbFieldMapping);
  }

  const value = getNestedValue(source, mapping.sourceName || "");

  // Apply fallback value if needed
  if (value === null || value === undefined) {
    return "fallbackValue" in mapping ? mapping.fallbackValue : null;
  }

  return value;
}

/**
 * Map JSONB field with nested field configurations
 */
function mapJsonbField(
  source: FirestoreDocumentData,
  mapping: JsonbFieldMapping
): Record<string, unknown> {
  const metadata: Record<string, unknown> = {};
  for (const field of mapping.fields) {
    metadata[field.targetName] = mapField(source, field);
  }
  return metadata;
}

/**
 * Map complete subscriber document to Pushfire format
 */
export function mapSubscriberData(
  documentData: FirestoreDocumentData,
  configuration: SubscriberMappingConfiguration
): MappedSubscriberData {
  return {
    externalId: mapField(documentData, configuration.externalId) as string,
    name: mapField(documentData, configuration.name) as string,
    email: mapField(documentData, configuration.email) as string,
    phone: mapField(documentData, configuration.phone) as string,
    metadata: mapField(documentData, configuration.metadata) as Record<
      string,
      unknown
    >,
  };
}

/**
 * Parse and validate JSON configuration from environment variable
 */
export function parseMappingConfiguration(
  jsonString: string
): SubscriberMappingConfiguration {
  try {
    console.log("Parsing mapping configuration...");
    const parsed = JSON.parse(jsonString) as SubscriberMappingConfiguration;

    // Validate required fields
    if (
      !parsed.externalId ||
      !parsed.name ||
      !parsed.email ||
      !parsed.phone ||
      !parsed.metadata
    ) {
      throw new Error(
        "Invalid configuration: missing required fields (externalId, name, email, phone, metadata)"
      );
    }

    console.log("Mapping configuration parsed successfully");
    return parsed;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON configuration: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Field mapping service for transforming Firestore documents to Pushfire format
 */

import {
  FieldMapping,
  FirestoreDocumentData,
  JsonbFieldMapping,
  SubscriberMappingConfiguration,
} from "@/types/firestore.types";
import { SubscriberUpdateRequest } from "@/types/pushfire.types";
import { logger } from "@/utils/log/logger";

/**
 * Service for mapping Firestore document data to Pushfire API format.
 *
 * Transforms Firestore documents using configurable field mappings to match
 * the required structure for Pushfire API requests.
 */
export class FirestoreMapper {
  /**
   * Gets a nested value from an object using dot notation.
   *
   * @param obj - The source object
   * @param path - Dot-separated path to the nested value (e.g., "user.profile.name")
   * @returns The nested value or null if not found
   */
  private getNestedValue(obj: FirestoreDocumentData, path: string): unknown {
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
   * Maps a JSONB field with nested field configurations.
   *
   * Recursively processes nested field mappings for complex objects.
   *
   * @param source - The source document data
   * @param mapping - JSONB field mapping with nested fields
   * @returns Mapped JSONB object
   */
  private mapJsonbField(
    source: FirestoreDocumentData,
    mapping: JsonbFieldMapping
  ): Record<string, unknown> {
    const metadata: Record<string, unknown> = {};
    for (const field of mapping.fields) {
      metadata[field.targetName] = this.mapField(source, field);
    }
    return metadata;
  }

  /**
   * Maps a single field based on its configuration.
   *
   * Handles different field types (text, number, boolean, jsonb) and applies
   * fallback values when the source field is missing.
   *
   * @param source - The source document data
   * @param mapping - Field mapping configuration
   * @returns Mapped field value
   */
  private mapField(
    source: FirestoreDocumentData,
    mapping: FieldMapping
  ): unknown {
    if (mapping.type === "jsonb") {
      return this.mapJsonbField(source, mapping as JsonbFieldMapping);
    }

    const value = this.getNestedValue(source, mapping.sourceName || "");

    if (value === null || value === undefined) {
      return "fallbackValue" in mapping ? mapping.fallbackValue : null;
    }

    return value;
  }

  /**
   * Maps a complete subscriber document to Pushfire API format.
   *
   * @param documentData - The source Firestore document data
   * @param configuration - Mapping configuration for field transformations
   * @returns Mapped data ready for Pushfire API submission
   * @throws {Error} If required fields are missing in the mapping configuration
   */
  mapSubscriberData(
    documentData: FirestoreDocumentData,
    configuration: SubscriberMappingConfiguration
  ): SubscriberUpdateRequest["data"] {
    return {
      externalId: this.mapField(
        documentData,
        configuration.externalId
      ) as string,
      name: this.mapField(documentData, configuration.name) as string,
      email: this.mapField(documentData, configuration.email) as string,
      phone: this.mapField(documentData, configuration.phone) as string,
      metadata: this.mapField(documentData, configuration.metadata) as Record<
        string,
        unknown
      >,
    };
  }

  /**
   * Parses and validates JSON configuration for field mapping.
   *
   * @param jsonString - The JSON configuration string
   * @returns Validated mapping configuration object
   * @throws {Error} If JSON is invalid or required fields are missing
   */
  parseConfiguration(jsonString: string): SubscriberMappingConfiguration {
    try {
      logger.info("Parsing mapping configuration");
      const parsed = JSON.parse(jsonString) as SubscriberMappingConfiguration;

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

      logger.success("Mapping configuration parsed successfully");
      return parsed;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON configuration: ${error.message}`);
      }
      throw error;
    }
  }
}

#!/usr/bin/env node

/**
 * Script to update version in extension.yaml
 * This script reads the version from package.json and updates extension.yaml
 */

const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const packageJsonPath = path.join(rootDir, "package.json");
const extensionYamlPath = path.join(rootDir, "extension.yaml");

// Read version from package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const version = packageJson.version;

// Read extension.yaml
let extensionYaml = fs.readFileSync(extensionYamlPath, "utf8");

// Update version in extension.yaml (line 2: version: X.Y.Z)
extensionYaml = extensionYaml.replace(
  /^version:\s*[\d.]+/m,
  `version: ${version}`
);

// Write back to extension.yaml
fs.writeFileSync(extensionYamlPath, extensionYaml, "utf8");

console.log(`✓ Updated extension.yaml version to ${version}`);


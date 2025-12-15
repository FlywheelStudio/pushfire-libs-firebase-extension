# Changelog



## Version 0.1.1

fix - update external services in extension.yaml by replacing Firestore role with new Update Subscriber service configuration.

## Version 0.1.0

 - .

chore - Add .gitignore for integration tests and remove firebase-debug.log file.

chore - Add .gitignore to exclude node_modules directory.

chore - Add icon.png to the project.

chore - Add LOCATION parameter to pushfire-subscribers-sync environment configuration for deployment settings..

chore - add Pushfire API configuration and update Firestore role in extension.yaml for enhanced functionality.

chore - add release-it and commitlint configurations for automated versioning and commit message validation.

chore - add TypeScript and related dependencies to package.json and package-lock.json for improved development support.

chore - change parameter type for PUSHFIRE_PROJECT_TOKEN from string to secret in extension.yaml for enhanced security.

chore - Clean up integration test file by removing unnecessary whitespace.

chore - enhance build process and add tsc-alias for improved TypeScript path resolution; update Firestore service imports for consistency.

chore - enhance release-it configuration for improved changelog generation and include extension.yaml in version bump.

chore - Refine extension.yaml descriptions and update Firestore matching configuration in integration test environment for improved clarity and functionality..

chore - remove CHANGELOG.md as it is no longer needed for documenting extension updates.

chore - Remove package-lock.json file from functions directory.

chore - Remove POSTINSTALL.md and PREINSTALL.md files to streamline documentation and eliminate outdated content..

chore - Rename and update "greet-the-world" extension to "pushfire-subscribers-sync" with new functionality to sync subscribers to Firestore, including updated configuration, function implementation, and integration tests..

chore - Rename syncSubscriber to updateSubscriber and enhance logging for subscriber updates in Pushfire.

chore - replace pnpm-lock.yaml with package-lock.json for dependency management in PushFire project and update environment variables for subscriber sync configuration.

chore - Update author information in extension.yaml to include Flywheel Studio and add contributor details for Ender Puentes.

chore - Update extension.yaml and integration test environment file to enhance Firestore matching configuration and adjust parameter naming conventions..

chore - Update extension.yaml to change license to ISC, rename syncSubscriber to updateSubscriber, and add location parameter for Cloud Functions deployment options..

chore - Update firebase.json to include function configuration, predeploy scripts, and ignore patterns for integration tests.

chore - Update firebase.json to modify function source path and remove unnecessary configuration options.

chore - update Firestore role to datastore.user in extension.yaml for improved document access and tracking.

chore - update icon.png to improve visual assets for PushFire project.

chore - update Node.js engine version from 22 to 18 in package-lock.json files for consistency across functions.

chore - update Node.js engine version from 22 to 18 in package.json files for compatibility across the project.

chore - update Node.js runtime version from 22 to 18 in extension.yaml for consistency across functions.

chore - update package.json and functions/package.json to enhance metadata, including description, keywords, and author details, while adjusting Node.js engine version for compatibility.

chore - Update package.json files for main and functions directories with author information, versioning, and engine specifications; add pnpm-lock.yaml for dependency management..

chore - update Pushfire API configuration in extension.yaml to streamline external services definition.

chore - Update Pushfire Subscribers Sync extension with new Firestore event trigger, revised API token parameter, and integration test configurations..

chore - update TypeScript paths in Firestore services and configuration for improved module resolution.

docs - remove EXAMPLES.md and streamline POSTINSTALL.md, PREINSTALL.md, and README.md for improved clarity and user guidance on PushFire Subscribers Sync installation and configuration.

docs - update README to clarify PushFire project settings and improve field mapping documentation for better user understanding.

docs - update SECURITY.md to replace Twitter contact with email for announcements and updates.

feat - "greet-the-world" Firebase extension, including configuration files, function implementation, and documentation for installation and usage..

feat - add comprehensive documentation and examples for PushFire Subscribers Sync extension, including changelog, contributing guidelines, and quick start guide for improved user onboarding and support..

feat - add Pushfire synchronization logic by introducing mapping and parsing services, updating Firestore document handling, and enhancing error management for improved reliability and maintainability..

feat - enhance Firestore integration by updating TypeScript configuration, refining subscriber mapping and parsing services, and implementing structured logging for improved error handling and maintainability..

feat - enhance Firestore mapping and parsing services with type conversion logic and improved error handling for subscriber updates.

feat - improve error handling in Pushfire client and update subscriber response messages for better clarity and debugging.

fix - Correct icon path in extension.yaml to ensure proper asset loading.

fix - rename Pushfire API to Pushfire Pricing in extension.yaml for clarity in external services.

fix - update API endpoint in README and client service for PushFire subscriber updates to reflect new URL structure.

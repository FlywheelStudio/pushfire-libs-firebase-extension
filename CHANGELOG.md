# Changelog

All notable changes to the PushFire Subscribers Sync extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2025-01-15

### Added
- Initial release of PushFire Subscribers Sync extension
- Automatic synchronization of Firestore documents to PushFire subscribers
- Support for flexible field mapping via JSON configuration
- Schema Builder tool integration for easy configuration generation
- Support for nested field access using dot notation
- Comprehensive error handling and logging
- Support for text, number, boolean, and JSONB field types
- Fallback values for optional fields
- Real-time synchronization on Firestore document updates
- Complete documentation (README, PREINSTALL, POSTINSTALL)
- Integration with PushFire API v1
- Node.js 22 runtime support

### Features
- **Real-time Sync**: Automatic updates when Firestore documents change
- **Flexible Mapping**: Configure any Firestore structure to PushFire format
- **Nested Data Support**: Access nested objects with dot notation
- **Custom Metadata**: Map unlimited custom fields to subscriber metadata
- **Fallback Values**: Graceful handling of missing fields
- **Type Safety**: Support for text, number, boolean, and complex types
- **Error Handling**: Comprehensive error messages and logging
- **Security**: Secure token storage and API authentication

### Technical Details
- Firebase Functions v2 (Node.js 22)
- TypeScript implementation
- Firestore document update trigger
- REST API integration with PushFire
- Environment-based configuration
- Configurable timeout handling (10s default)

### Documentation
- Complete README with installation and usage instructions
- PREINSTALL guide with prerequisites and preparation steps
- POSTINSTALL guide with verification and troubleshooting
- Schema Builder integration for configuration generation
- API reference and examples
- Best practices and security guidelines

### Security
- Secure API token storage in Firebase configuration
- HTTPS-only communication with PushFire API
- Minimal required permissions (Firestore read-only)
- No data storage outside Firebase and PushFire

[0.0.1]: https://github.com/FlywheelStudio/pushfire-libs-firebase-extension/releases/tag/v0.0.1

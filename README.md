# PushFire Subscribers Sync - Firebase Extension

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Version](https://img.shields.io/badge/version-0.0.1-green.svg)](https://github.com/FlywheelStudio/pushfire-libs-firebase-extension)

Automatically synchronize your Firebase users with PushFire to enable powerful push notification workflows, audience segmentation, and personalized messaging.

## Overview

The **PushFire Subscribers Sync** extension monitors your Firestore collection for document updates and automatically synchronizes subscriber data with [PushFire](https://pushfire.app).

### Features

- 🔄 **Real-time synchronization**: Automatically sync user data when Firestore documents are updated
- 🎯 **Flexible field mapping**: Map any Firestore field structure to PushFire's subscriber format
- 🔧 **Easy configuration**: Use the visual Schema Builder to generate field mapping configurations
- 📊 **Support for complex data**: Handle nested objects, arrays, and custom metadata
- 🚀 **Zero maintenance**: Runs automatically in the background

## Prerequisites

- **Firebase Project** with Firestore enabled
- **Firebase Blaze plan** (pay-as-you-go billing)
- **PushFire Account** ([Sign up here](https://www.pushfire.app/sign-in))
- **PushFire Project** created in your dashboard

## Installation

### Via Firebase Console

1. Navigate to **Extensions** in your [Firebase Console](https://console.firebase.google.com/)
2. Search for "PushFire Subscribers Sync"
3. Click **Install** and follow the configuration prompts

### Via Firebase CLI

```bash
firebase ext:install FlywheelStudio/pushfire-subscribers-sync --project=YOUR_PROJECT_ID
```

## Configuration

During installation, you'll need to provide:

1. **PushFire Project ID**: Available in your [PushFire Dashboard](https://pushfire.app/dashboard) under Project Overview
2. **PushFire Project Token**: Generate in your [PushFire Dashboard](https://pushfire.app/dashboard) under API Settings
3. **Firestore Collection Name**: The name of your Firestore collection (e.g., `users`, `subscribers`)
4. **Field Mapping Configuration**: JSON configuration mapping Firestore fields to PushFire format

## Field Mapping

Use the [Schema Builder](https://pushfire.app/extensions/firebase/schema-builder) to generate your field mapping configuration.

The Schema Builder helps you map:

- **External ID**: Unique identifier field
- **Name**: Display name field
- **Email**: Email address field
- **Phone**: Phone number field
- **Metadata**: Custom fields using nested paths with dot notation (e.g., `profile.country`)

### Example

For a Firestore document:

```json
{
  "uid": "user123",
  "displayName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "+1234567890",
  "profile": {
    "country": "USA"
  }
}
```

Use the Schema Builder to generate the mapping configuration automatically.

## Usage

Once installed, the extension works automatically:

1. Update a document in your configured Firestore collection
2. The extension automatically syncs the data to PushFire

**Important**: The extension only triggers on document **updates**, not creates. For new users, create the document first, then update it.

### Viewing Logs

```bash
firebase functions:log --only ext-pushfire-subscribers-sync-updateSubscriber
```

Or view logs in the [Firebase Console](https://console.firebase.google.com/) under **Functions** > **Logs**.

## Troubleshooting

### Extension Not Triggering

- Verify the collection name matches exactly
- Ensure you're updating documents (not just creating)
- Check Firebase Functions logs for errors

### Authentication Errors

- Verify your Project Token is correct
- Ensure the Project ID matches your PushFire project
- Regenerate the token if needed

### Field Mapping Errors

- Validate your JSON configuration syntax
- Check field names match your Firestore structure
- Use the [Schema Builder](https://pushfire.app/extensions/firebase/schema-builder) to regenerate configuration

## Support

- 📚 [Documentation](https://www.pushfire.app/docs)
- 🛠️ [Schema Builder](https://pushfire.app/extensions/firebase/schema-builder)
- 💬 [Contact Support](mailto:hello@pushfire.app)
- 🐛 [GitHub Issues](https://github.com/FlywheelStudio/pushfire-libs-firebase-extension/issues)

## License

Apache License 2.0 - See [LICENSE](LICENSE) file for details.

## Author

**PushFire** - A product of Flywheel Studio

- Website: [pushfire.app](https://pushfire.app)
- GitHub: [@FlywheelStudio](https://github.com/FlywheelStudio)

**Maintainer**: Ender Puentes ([@enderpuentes](https://github.com/enderpuentes))

---

**Ready to get started?** Install the extension and visit the [Schema Builder](https://pushfire.app/extensions/firebase/schema-builder) to configure your field mappings! 🚀

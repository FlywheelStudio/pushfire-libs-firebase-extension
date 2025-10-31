# PushFire Subscribers Sync - Firebase Extension

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Version](https://img.shields.io/badge/version-0.0.1-green.svg)](https://github.com/FlywheelStudio/pushfire-libs-firebase-extension)

Automatically synchronize your Firebase users with PushFire to enable powerful push notification workflows, audience segmentation, and personalized messaging.

## Overview

The **PushFire Subscribers Sync** extension monitors your Firestore collection for document updates and automatically synchronizes subscriber data with [PushFire](https://pushfire.app), enabling you to:

- 🔄 **Real-time synchronization**: Automatically sync user data when Firestore documents are updated
- 🎯 **Flexible field mapping**: Map any Firestore field structure to PushFire's subscriber format
- 🔧 **Easy configuration**: Use the visual Schema Builder to generate field mapping configurations
- 📊 **Support for complex data**: Handle nested objects, arrays, and custom metadata
- 🚀 **Zero maintenance**: Runs automatically in the background with no code required

## How It Works

1. **Install**: Add the extension to your Firebase project
2. **Configure**: Set up field mappings using the [Schema Builder](https://pushfire.app/extensions/firebase/schema-builder)
3. **Sync**: The extension automatically updates PushFire when your Firestore documents change

```
Firestore Document Update → Extension Triggered → Data Mapped → PushFire Updated
```

## Prerequisites

Before installing this extension, you need:

- **Firebase Project**: An active Firebase project with Firestore enabled
- **PushFire Account**: A PushFire account with an active project ([Sign up here](https://www.pushfire.app/sign-in))
- **Firestore Collection**: A Firestore collection containing your subscriber/user data
- **Firebase Billing**: This extension requires the Blaze (pay-as-you-go) plan

## Installation

### Via Firebase Console

1. Navigate to the **Extensions** page in your [Firebase Console](https://console.firebase.google.com/)
2. Search for "PushFire Subscribers Sync"
3. Click **Install** and follow the configuration prompts

### Via Firebase CLI

```bash
firebase ext:install FlywheelStudio/pushfire-subscribers-sync --project=YOUR_PROJECT_ID
```

## Configuration

During installation, you'll need to provide the following parameters:

### Required Parameters

#### 1. PushFire Project ID
- **Parameter**: `PUSHFIRE_PROJECT_ID`
- **Description**: Your PushFire project identifier
- **Where to find**: Available in your [PushFire Dashboard](https://pushfire.app/dashboard) under Project Settings

#### 2. PushFire Project Token
- **Parameter**: `PUSHFIRE_PROJECT_TOKEN`
- **Description**: API token for authenticating with PushFire
- **Where to find**: Generate in your [PushFire Dashboard](https://pushfire.app/dashboard) under API Settings
- **Security**: This token is stored securely and never exposed in logs

#### 3. Firestore Collection Name
- **Parameter**: `PUSHFIRE_MATCHING_COLLECTION`
- **Description**: The name of your Firestore collection containing subscriber documents
- **Example**: `users`, `subscribers`, `customers`

#### 4. Field Mapping Configuration
- **Parameter**: `PUSHFIRE_MATCHING_TOKEN_JSON_SCHEMA_CONFIGURATION`
- **Description**: JSON configuration that maps your Firestore fields to PushFire fields
- **Important**: Use the [Schema Builder](https://pushfire.app/extensions/firebase/schema-builder) to generate this configuration

## Field Mapping with Schema Builder

The extension requires a JSON configuration that maps your Firestore document structure to PushFire's subscriber format. Creating this manually can be error-prone, so we've built a visual tool to help.

### Using the Schema Builder

1. Visit the [PushFire Schema Builder](https://pushfire.app/extensions/firebase/schema-builder)
2. Define your field mappings for:
   - **External ID**: Unique identifier for the subscriber
   - **Name**: Subscriber's full name
   - **Email**: Subscriber's email address
   - **Phone**: Subscriber's phone number
   - **Metadata**: Custom fields (key-value pairs)
3. Configure fallback values for optional fields
4. Click **Generate Schema Configuration**
5. Copy the generated JSON
6. Paste it into the `PUSHFIRE_MATCHING_TOKEN_JSON_SCHEMA_CONFIGURATION` field during installation

### Field Mapping Structure

The mapping configuration supports:

#### Basic Fields
- **Text fields**: String values with optional fallbacks
- **Number fields**: Numeric values with optional fallbacks
- **Boolean fields**: True/false values with optional fallbacks

#### Advanced Fields
- **Nested fields**: Access nested objects using dot notation (e.g., `profile.name`)
- **Metadata fields**: Map multiple custom fields to PushFire metadata
- **Arrays**: Support for array values in metadata

### Example Configuration

For a Firestore document structure like:

```json
{
  "uid": "user123",
  "displayName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "+1234567890",
  "profile": {
    "age": 25,
    "country": "USA"
  }
}
```

Your mapping configuration would be:

```json
{
  "externalId": {
    "sourceName": "uid",
    "targetName": "external_id",
    "type": "text"
  },
  "name": {
    "sourceName": "displayName",
    "targetName": "name",
    "type": "text",
    "fallbackValue": "Anonymous"
  },
  "email": {
    "sourceName": "email",
    "targetName": "email",
    "type": "text",
    "fallbackValue": "N/A"
  },
  "phone": {
    "sourceName": "phoneNumber",
    "targetName": "phone",
    "type": "text",
    "fallbackValue": "N/A"
  },
  "metadata": {
    "targetName": "metadata",
    "type": "jsonb",
    "fields": [
      {
        "sourceName": "profile.age",
        "targetName": "age",
        "type": "number"
      },
      {
        "sourceName": "profile.country",
        "targetName": "country",
        "type": "text"
      }
    ]
  }
}
```

## Usage

Once installed and configured, the extension works automatically:

1. **Update a Firestore document** in your configured collection
2. **Extension triggers** on the document update event
3. **Data is mapped** according to your field configuration
4. **PushFire is updated** with the subscriber information
5. **Success** - You can now use PushFire workflows with this subscriber

### Viewing Logs

Monitor the extension's activity in your Firebase Console:

```bash
firebase functions:log --only updateSubscriber
```

Or view logs in the [Firebase Console](https://console.firebase.google.com/) under **Functions** > **Logs**.

## Supported Field Types

### Source Fields (Firestore)

The extension can read and convert:
- **Strings**: Text values
- **Numbers**: Integers and decimals
- **Booleans**: True/false values
- **Timestamps**: Date and time values
- **Arrays**: Lists of values
- **Maps**: Nested objects
- **Null values**: Handled gracefully with fallbacks

### Target Fields (PushFire)

Subscriber data is mapped to PushFire's format:
- `external_id` (required): Unique identifier
- `name` (required): Display name
- `email` (required): Email address
- `phone` (required): Phone number
- `metadata` (required): Object containing custom fields

## Troubleshooting

### Extension Not Triggering

**Problem**: Firestore updates don't trigger the extension

**Solutions**:
- Verify the collection name matches your configuration exactly
- Check that you're updating documents (not creating or deleting)
- Review Firebase Functions logs for errors

### Field Mapping Errors

**Problem**: Data not mapping correctly

**Solutions**:
- Verify your JSON configuration is valid
- Check field names match your Firestore structure
- Use the Schema Builder to regenerate the configuration
- Test with nested field paths using dot notation

### Authentication Errors

**Problem**: "Pushfire API error: Unauthorized"

**Solutions**:
- Verify your Project Token is correct
- Check that the token hasn't expired
- Ensure the Project ID matches your PushFire project

### Timeout Errors

**Problem**: "Request timeout after 10000ms"

**Solutions**:
- Check your network connectivity
- Verify PushFire API is accessible from Firebase
- Contact PushFire support if issues persist

## API Reference

### Pushfire API Endpoint

The extension communicates with:
```
POST https://api.pushfire.app/functions/v1/subscribers/update-subscriber
```

### Authentication

Requests include:
```
Authorization: Bearer YOUR_PROJECT_TOKEN
```

## Best Practices

### Security
- ✅ Never commit your Project Token to version control
- ✅ Use Firebase Secret Manager for sensitive data
- ✅ Limit Firestore access rules appropriately
- ✅ Regularly rotate your API tokens

### Performance
- ✅ Use indexed fields for Firestore queries
- ✅ Batch Firestore updates when possible
- ✅ Monitor function execution times
- ✅ Set appropriate retry policies

### Data Mapping
- ✅ Use fallback values for optional fields
- ✅ Validate data before Firestore updates
- ✅ Keep metadata fields organized
- ✅ Document your field mapping strategy

## Monitoring

### Key Metrics to Monitor

- **Function Invocations**: Number of times the extension runs
- **Success Rate**: Percentage of successful updates
- **Error Rate**: Failed synchronization attempts
- **Execution Time**: Average processing duration

### Setting Up Alerts

Configure Firebase monitoring alerts for:
- High error rates
- Increased latency
- Function failures
- Quota limits

## Billing

This extension uses the following Firebase services:

- **Cloud Functions**: Charged per invocation and compute time
- **Firestore**: Charged per document read (minimal, only on updates)

Typical costs are minimal for most applications. See [Firebase Pricing](https://firebase.google.com/pricing) for details.

## Support

### Documentation
- [PushFire Documentation](https://www.pushfire.app/docs)
- [Firebase Extensions Guide](https://firebase.google.com/products/extensions)
- [Schema Builder Tool](https://pushfire.app/extensions/firebase/schema-builder)

### Get Help
- **Issues**: [GitHub Issues](https://github.com/FlywheelStudio/pushfire-libs-firebase-extension/issues)
- **Website**: [pushfire.app](https://pushfire.app)
- **Documentation**: [www.pushfire.app/docs](https://www.pushfire.app/docs)

## Legal

- [Privacy Policy](https://www.pushfire.app/legals/privacy-policy)
- [Terms of Service](https://www.pushfire.app/legals/terms-of-service)

## License

This extension is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## Author

**PushFire** - A product of Flywheel Studio

- Website: [pushfire.app](https://pushfire.app)
- GitHub: [@FlywheelStudio](https://github.com/FlywheelStudio)

**Maintainer**: Ender Puentes ([@enderpuentes](https://github.com/enderpuentes))

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

---

**Ready to get started?** Install the extension and visit the [Schema Builder](https://pushfire.app/extensions/firebase/schema-builder) to configure your field mappings! 🚀

# Before You Install: PushFire Subscribers Sync

Thank you for choosing PushFire Subscribers Sync! This extension will automatically synchronize your Firebase users with [PushFire](https://pushfire.app), enabling powerful push notification workflows and audience management.

## What This Extension Does

The **PushFire Subscribers Sync** extension:

- ✅ Monitors your specified Firestore collection for document updates
- ✅ Automatically maps and syncs subscriber data to PushFire
- ✅ Enables real-time audience synchronization
- ✅ Supports flexible field mapping for any document structure
- ✅ Handles complex nested data and custom metadata

## Prerequisites

Before installing, ensure you have:

### 1. Firebase Requirements

- **Firebase Project**: An active Firebase project
- **Firestore Database**: Cloud Firestore enabled in your project
- **Billing Enabled**: Firebase Blaze (pay-as-you-go) plan is required
- **Subscriber Collection**: A Firestore collection containing your user/subscriber documents

### 2. PushFire Requirements

- **PushFire Account**: Create a free account at [pushfire.app](https://www.pushfire.app/sign-in)
- **Active Project**: Set up a project in your PushFire dashboard
- **API Credentials**: You'll need:
  - Your **Project ID** (found in Project Settings)
  - A **Project Token** (generate in API Settings)

### 3. Technical Requirements

- **Collection Structure**: Understanding of your Firestore collection schema
- **Field Mapping**: Ability to map your fields using the Schema Builder tool

## What You'll Need During Installation

Have these ready before you begin:

| Parameter | Where to Find It | Example |
|-----------|-----------------|---------|
| **PushFire Project ID** | PushFire Dashboard → Project Settings | `proj_abc123xyz` |
| **PushFire Project Token** | PushFire Dashboard → API Settings | `pf_tok_...` |
| **Firestore Collection Name** | Your Firebase Console → Firestore | `users` |
| **Field Mapping JSON** | [Schema Builder](https://pushfire.app/extensions/firebase/schema-builder) | See below |

## Creating Your Field Mapping Configuration

The extension needs a JSON configuration to map your Firestore fields to PushFire's format.

### Option 1: Use the Schema Builder (Recommended)

1. Visit the [PushFire Schema Builder](https://pushfire.app/extensions/firebase/schema-builder)
2. Configure your field mappings:
   - **External ID**: Your unique user identifier field
   - **Name**: User's display name field
   - **Email**: User's email field
   - **Phone**: User's phone number field
   - **Metadata**: Any additional custom fields
3. Set fallback values for optional fields
4. Click **Generate Schema Configuration**
5. Copy the generated JSON for installation

### Option 2: Create Manually

If you prefer to create the configuration manually, it should follow this structure:

```json
{
  "externalId": {
    "sourceName": "your_uid_field",
    "targetName": "external_id",
    "type": "text"
  },
  "name": {
    "sourceName": "your_name_field",
    "targetName": "name",
    "type": "text",
    "fallbackValue": "Anonymous"
  },
  "email": {
    "sourceName": "your_email_field",
    "targetName": "email",
    "type": "text",
    "fallbackValue": "N/A"
  },
  "phone": {
    "sourceName": "your_phone_field",
    "targetName": "phone",
    "type": "text",
    "fallbackValue": "N/A"
  },
  "metadata": {
    "targetName": "metadata",
    "type": "jsonb",
    "fields": [
      {
        "sourceName": "custom_field_1",
        "targetName": "custom_key_1",
        "type": "text"
      }
    ]
  }
}
```

## Billing and Costs

### Firebase Costs

This extension uses:
- **Cloud Functions**: Billed per invocation and execution time
- **Firestore Reads**: Minimal reads only on document updates

**Estimated Cost**: For most applications, costs are negligible (typically less than $1/month for thousands of users).

### PushFire Costs

Check the current [PushFire Pricing](https://www.pushfire.app/#pricing) for your plan limits and costs.

## Permissions and Access

This extension will:
- ✅ Read documents from your specified Firestore collection
- ✅ Send subscriber data to PushFire API
- ✅ Create Cloud Functions in your project
- ✅ Generate logs in Firebase Console

The extension will **NOT**:
- ❌ Modify your Firestore data
- ❌ Access collections other than the one you specify
- ❌ Share your data with third parties (besides PushFire)
- ❌ Store your data outside PushFire and Firebase

## Data Privacy and Security

- **Data Processing**: PushFire acts as a data processor for subscriber data
- **Encryption**: All API communications use HTTPS
- **Token Security**: Your Project Token is stored securely in Firebase configuration
- **Compliance**: Review [PushFire Privacy Policy](https://www.pushfire.app/legals/privacy-policy)

## Testing Before Production

We recommend:

1. **Create a Test Project**: Install the extension in a test Firebase project first
2. **Test Collection**: Use a small test collection initially
3. **Verify Mappings**: Confirm data maps correctly in PushFire
4. **Monitor Logs**: Check Cloud Functions logs for any issues
5. **Production Deployment**: Once confident, deploy to production

## Support and Documentation

- 📚 [Full Documentation](https://www.pushfire.app/docs)
- 🛠️ [Schema Builder Tool](https://pushfire.app/extensions/firebase/schema-builder)
- 🐛 [Report Issues](https://github.com/FlywheelStudio/pushfire-libs-firebase-extension/issues)
- 💬 [Contact Support](mailto:hello@pushfire.app)

## Ready to Install?

Once you have:
- ✅ PushFire account and credentials
- ✅ Firestore collection ready
- ✅ Field mapping configuration generated
- ✅ Billing enabled on Firebase

Click **Install extension** to proceed with the configuration!

---

**Questions?** Visit [pushfire.app/docs](https://www.pushfire.app/docs) for support


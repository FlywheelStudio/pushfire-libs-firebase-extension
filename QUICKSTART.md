# Quick Start Guide

Get up and running with PushFire Subscribers Sync in under 10 minutes!

## Prerequisites Checklist

Before you begin, make sure you have:

- [ ] Firebase project with Firestore enabled
- [ ] Firebase Blaze (pay-as-you-go) plan activated
- [ ] PushFire account ([Sign up here](https://www.pushfire.app/sign-in))
- [ ] Active PushFire project created
- [ ] Firestore collection with user/subscriber documents

## Step 1: Get Your PushFire Credentials (2 minutes)

1. Log in to [PushFire Dashboard](https://pushfire.app/dashboard)
2. Navigate to your project
3. Go to **Settings** → **API**
4. Copy your **Project ID** (e.g., `proj_abc123xyz`)
5. Click **Generate Token** → Copy your **Project Token** (e.g., `pf_tok_...`)

**Keep these safe!** You'll need them in Step 3.

## Step 2: Create Your Field Mapping (3 minutes)

1. Visit the [Schema Builder](https://pushfire.app/extensions/firebase/schema-builder)
2. Fill in your Firestore field names:

   **Example**:
   ```
   External ID Field: uid
   Name Field: displayName
   Email Field: email
   Phone Field: phoneNumber
   ```

3. Add custom metadata fields (optional):
   ```
   Firestore Field: profile.country → PushFire Key: country
   Firestore Field: subscription.plan → PushFire Key: plan
   ```

4. Set fallback values for optional fields:
   ```
   Name: "Anonymous"
   Email: "N/A"
   Phone: "N/A"
   ```

5. Click **Generate Schema Configuration**
6. **Copy the JSON output** - you'll need it in the next step

## Step 3: Install the Extension (3 minutes)

### Option A: Using Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Extensions** in the left sidebar
4. Click **Install Extension**
5. Search for "PushFire Subscribers Sync"
6. Click **Install**
7. Fill in the configuration:
   - **Project ID**: Paste from Step 1
   - **Project Token**: Paste from Step 1
   - **Collection Name**: Your Firestore collection (e.g., `users`)
   - **Field Mapping**: Paste the JSON from Step 2
8. Click **Install Extension**

### Option B: Using Firebase CLI

```bash
# Install the extension
firebase ext:install FlywheelStudio/pushfire-subscribers-sync --project=YOUR_PROJECT_ID

# Follow the prompts and enter:
# - PushFire Project ID
# - PushFire Project Token
# - Collection Name
# - Field Mapping JSON
```

## Step 4: Test the Synchronization (2 minutes)

### Update a Test Document

**Firebase Console**:
1. Go to **Firestore Database**
2. Open your configured collection
3. Click on any document
4. Click **Edit** → Change a field value
5. Click **Save**

**Or via code**:
```javascript
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// Update a document to trigger sync
await db.collection('users').doc('testUser123').update({
  displayName: 'Test User',
  email: 'test@example.com',
  phoneNumber: '+1234567890'
});
```

### Verify in PushFire

1. Go to [PushFire Dashboard](https://pushfire.app/dashboard)
2. Navigate to **Subscribers** or **Audience**
3. Look for your test user
4. Verify the data appears correctly

### Check the Logs

```bash
firebase functions:log --only ext-pushfire-subscribers-sync-updateSubscriber
```

**Expected output**:
```
✓ Processing subscriber update
✓ Document data mapped successfully
✓ Subscriber updated successfully in Pushfire
```

## Troubleshooting

### Extension Doesn't Trigger

**Problem**: No logs appear after updating a document

**Quick Fixes**:
- ✅ Verify you're **updating** an existing document (not creating a new one)
- ✅ Check the collection name matches exactly
- ✅ Wait 30-60 seconds for logs to appear

### Authentication Error

**Problem**: "Unauthorized" or "Invalid token" in logs

**Quick Fixes**:
- ✅ Verify Project Token is correct (copy/paste it again)
- ✅ Check Project ID matches your PushFire project
- ✅ Regenerate token in PushFire if needed

### Field Mapping Error

**Problem**: Data appears incorrectly in PushFire

**Quick Fixes**:
- ✅ Verify field names match your Firestore structure exactly
- ✅ Check JSON configuration is valid (use [JSONLint](https://jsonlint.com/))
- ✅ Regenerate configuration with Schema Builder

### Data Not Appearing

**Problem**: No data shows up in PushFire

**Quick Fixes**:
- ✅ Check Firebase Functions logs for errors
- ✅ Verify document has all required fields
- ✅ Ensure fallback values are set appropriately

## Common Use Cases

### New User Registration

**Important**: The extension only triggers on document **updates**. For new users, create the document first, then update it:

```javascript
// 1. Create the user document
await db.collection('users').doc(userId).set({
  uid: userId,
  displayName: name,
  email: email,
  phoneNumber: phone,
  createdAt: admin.firestore.FieldValue.serverTimestamp()
});

// 2. Trigger the extension by updating the document
await db.collection('users').doc(userId).update({
  syncedAt: admin.firestore.FieldValue.serverTimestamp()
});
// Now it syncs to PushFire!
```

### Profile Updates

User profile changes automatically sync:

```javascript
await db.collection('users').doc(userId).update({
  displayName: 'New Name',
  'profile.country': 'USA'
});
// Automatically syncs to PushFire!
```

### Custom Metadata

Track additional user properties:

```javascript
await db.collection('users').doc(userId).update({
  'subscription.plan': 'premium',
  'preferences.notifications': true,
  'stats.loginCount': admin.firestore.FieldValue.increment(1)
});
// All custom fields sync to PushFire metadata
```

## Next Steps

Now that your extension is working:

### 1. Explore PushFire Features

- **Create Segments**: Group users by metadata
  ```
  Premium Users: metadata.plan = "premium"
  USA Users: metadata.country = "USA"
  ```

- **Build Workflows**: Set up automated push notifications
  - Welcome messages for new users
  - Re-engagement campaigns
  - Personalized notifications

- **Send Campaigns**: Create targeted push notifications
  - Segment-based campaigns
  - A/B testing
  - Scheduled sends

### 2. Monitor Performance

Set up monitoring:

```bash
# View function metrics
firebase functions:log --only ext-pushfire-subscribers-sync-updateSubscriber

# Set up alerts in Firebase Console
# Functions → Metrics → Create Alert
```

### 3. Optimize Your Setup

- Add more custom fields to metadata
- Create meaningful user segments
- Build automated workflows
- Track push notification performance

## Useful Commands

```bash
# View logs
firebase functions:log --only ext-pushfire-subscribers-sync-updateSubscriber

# Update extension configuration
firebase ext:configure pushfire-subscribers-sync

# Update to latest version
firebase ext:update pushfire-subscribers-sync

# Uninstall extension
firebase ext:uninstall pushfire-subscribers-sync
```

## Resources

- 📚 [Full Documentation](README.md)
- 🛠️ [Schema Builder](https://pushfire.app/extensions/firebase/schema-builder)
- 📖 [PushFire Docs](https://www.pushfire.app/docs)
- 🐛 [Report Issues](https://github.com/FlywheelStudio/pushfire-libs-firebase-extension/issues)
- 💬 [Get Support](mailto:hello@pushfire.app)

## Need Help?

- **Quick Questions**: Check [README.md](README.md) for detailed docs
- **Technical Support**: Contact [hello@pushfire.app](mailto:hello@pushfire.app)
- **Bug Reports**: [GitHub Issues](https://github.com/FlywheelStudio/pushfire-libs-firebase-extension/issues)

---

**Congratulations!** 🎉 Your Firebase users are now syncing with PushFire. Start building powerful push notification workflows at [pushfire.app/dashboard](https://pushfire.app/dashboard)!


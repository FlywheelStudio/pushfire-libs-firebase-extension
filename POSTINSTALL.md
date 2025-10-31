# Installation Complete! 🎉

Thank you for installing **PushFire Subscribers Sync**! Your extension is now active and ready to synchronize subscriber data from Firestore to PushFire.

## What Happens Next

The extension is now monitoring your Firestore collection for document updates. Every time a document in your configured collection is updated, the extension will:

1. ✅ Detect the change automatically
2. ✅ Map the document fields according to your configuration
3. ✅ Send the updated subscriber data to PushFire
4. ✅ Log the result for monitoring

## Verify Your Installation

### Step 1: Test the Synchronization

Update a document in your configured Firestore collection:

**Firebase Console**:
1. Go to [Firestore Database](https://console.firebase.google.com/project/_/firestore)
2. Navigate to your configured collection
3. Select a document and edit a field
4. Save the changes

**Via Code**:
```javascript
const admin = require('firebase-admin');
const db = admin.firestore();

// Update a subscriber document
await db.collection('YOUR_COLLECTION_NAME').doc('user123').update({
  displayName: 'John Doe Updated',
  email: 'john@example.com'
});
```

### Step 2: Check the Function Logs

Monitor the extension's execution:

**Firebase Console**:
1. Navigate to [Functions](https://console.firebase.google.com/project/_/functions)
2. Find the `ext-pushfire-subscribers-sync-updateSubscriber` function
3. Click **Logs** to view execution history

**Firebase CLI**:
```bash
firebase functions:log --only ext-pushfire-subscribers-sync-updateSubscriber
```

**Expected Success Log**:
```
✓ Processing subscriber update
✓ Document data mapped successfully
✓ Subscriber updated successfully in Pushfire
```

### Step 3: Verify in PushFire

1. Log in to your [PushFire Dashboard](https://pushfire.app/dashboard)
2. Navigate to **Subscribers** or **Audience**
3. Verify that the updated subscriber data appears correctly
4. Check that custom metadata fields are populated

## Configuration Reference

Your extension was configured with:

| Parameter | Description |
|-----------|-------------|
| **Project ID** | Your PushFire project identifier |
| **Project Token** | API authentication token (stored securely) |
| **Collection Name** | The Firestore collection being monitored |
| **Field Mapping** | JSON configuration for field transformations |

## Updating Configuration

Need to change your configuration?

### Updating Field Mapping

1. Visit the [Schema Builder](https://pushfire.app/extensions/firebase/schema-builder)
2. Create your new mapping configuration
3. Update the extension configuration:

**Firebase Console**:
- Go to **Extensions** → **PushFire Subscribers Sync** → **Manage** → **Reconfigure**

**Firebase CLI**:
```bash
firebase ext:configure pushfire-subscribers-sync
```

### Changing the Monitored Collection

You can reconfigure the extension to monitor a different collection using the same methods above.

## Monitoring and Analytics

### Key Metrics to Track

Monitor these metrics in your Firebase Console:

- **Invocations**: Number of times the function executes
- **Execution Time**: Average processing duration
- **Errors**: Failed synchronization attempts
- **Success Rate**: Percentage of successful updates

### Setting Up Alerts

Configure alerts for important events:

**Firebase Console**:
1. Go to **Functions** → **Metrics**
2. Click **Create Alert**
3. Set conditions (e.g., error rate > 5%)
4. Configure notification channels

## Common Use Cases

### 1. New User Registration
When a new user signs up, update their Firestore document to trigger synchronization:

```javascript
await db.collection('users').doc(userId).set({
  uid: userId,
  email: email,
  displayName: displayName,
  phoneNumber: phone,
  createdAt: admin.firestore.FieldValue.serverTimestamp()
});

// Update the document to trigger the extension
await db.collection('users').doc(userId).update({
  syncedAt: admin.firestore.FieldValue.serverTimestamp()
});
```

### 2. Profile Updates
User profile changes automatically sync:

```javascript
await db.collection('users').doc(userId).update({
  displayName: newName,
  phoneNumber: newPhone,
  'profile.country': newCountry
});
```

### 3. Custom Metadata Updates
Add custom fields that sync to PushFire metadata:

```javascript
await db.collection('users').doc(userId).update({
  'preferences.notifications': true,
  'subscription.plan': 'premium',
  'lastActivity': admin.firestore.FieldValue.serverTimestamp()
});
```

## Best Practices

### Performance
- ✅ Batch Firestore updates when possible to reduce function invocations
- ✅ Use indexed fields for better Firestore query performance
- ✅ Monitor function execution times regularly

### Security
- ✅ Keep your Project Token secure and never commit it to version control
- ✅ Use Firestore Security Rules to protect sensitive data
- ✅ Regularly rotate your API tokens
- ✅ Monitor authentication errors in logs

### Data Quality
- ✅ Validate data before writing to Firestore
- ✅ Use fallback values appropriately in your field mapping
- ✅ Keep subscriber data consistent across systems
- ✅ Document your field mapping strategy

## Troubleshooting

### Issue: Extension Not Triggering

**Symptoms**: Document updates don't sync to PushFire

**Solutions**:
1. Verify the collection name exactly matches your configuration
2. Check that you're **updating** documents (not just creating/deleting)
3. Review function logs for errors
4. Ensure the document has all required fields

### Issue: Authentication Errors

**Symptoms**: "Unauthorized" or "Invalid token" errors

**Solutions**:
1. Verify your Project Token is correct
2. Check that the token hasn't been revoked
3. Ensure the Project ID matches your PushFire project
4. Regenerate the token in PushFire if necessary

### Issue: Field Mapping Errors

**Symptoms**: Data appears incorrectly in PushFire

**Solutions**:
1. Validate your JSON configuration syntax
2. Check that field names match your Firestore structure exactly
3. Use the Schema Builder to regenerate the configuration
4. Test with a simple document first

### Issue: Timeout Errors

**Symptoms**: "Request timeout" messages in logs

**Solutions**:
1. Check PushFire API status
2. Verify network connectivity from Firebase
3. Contact PushFire support if issues persist

## Next Steps

### Leverage PushFire Features

Now that your subscribers are syncing, explore PushFire's capabilities:

1. **Create Segments**: Group subscribers based on metadata
2. **Build Workflows**: Set up automated push notification flows
3. **Personalize Messages**: Use subscriber data in notifications
4. **Track Engagement**: Monitor push notification performance

### Additional Resources

- 📚 [Complete Documentation](https://www.pushfire.app/docs)
- 🎓 [Getting Started Guide](https://www.pushfire.app/docs)
- 🛠️ [Schema Builder Tool](https://pushfire.app/extensions/firebase/schema-builder)
- 💡 [Integration Examples](https://www.pushfire.app/docs)

## Get Support

Need help? We're here for you!

- **Documentation**: [www.pushfire.app/docs](https://www.pushfire.app/docs)
- **Report Issues**: [GitHub Issues](https://github.com/FlywheelStudio/pushfire-libs-firebase-extension/issues)
- **Website**: [pushfire.app](https://pushfire.app)
- **Community**: Join our community for tips and best practices

## Feedback

We'd love to hear from you! Share your feedback:

- ⭐ Rate the extension in the Firebase Extensions marketplace
- 💬 Share your use case with us
- 🐛 Report bugs or request features on GitHub
- 📝 Contribute to the documentation

## Legal

- [Privacy Policy](https://www.pushfire.app/legals/privacy-policy)
- [Terms of Service](https://www.pushfire.app/legals/terms-of-service)

---

**Thank you for using PushFire!** 🚀

Visit [pushfire.app](https://www.pushfire.app/#features) to explore more features and start creating powerful push notification workflows.

If you have any questions or need assistance, visit our [documentation](https://www.pushfire.app/docs) or [contact support](mailto:hello@pushfire.app).


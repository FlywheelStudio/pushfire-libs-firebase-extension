# Usage Examples

This document provides practical examples for common use cases with the PushFire Subscribers Sync extension.

## Table of Contents

- [Basic Setup](#basic-setup)
- [Field Mapping Examples](#field-mapping-examples)
- [Integration Patterns](#integration-patterns)
- [Advanced Use Cases](#advanced-use-cases)
- [Error Handling](#error-handling)
- [Testing](#testing)

## Basic Setup

### Simple User Collection

**Firestore Document Structure**:
```json
{
  "uid": "user123",
  "email": "john@example.com",
  "name": "John Doe",
  "phone": "+1234567890"
}
```

**Field Mapping Configuration**:
```json
{
  "externalId": {
    "sourceName": "uid",
    "targetName": "external_id",
    "type": "text"
  },
  "name": {
    "sourceName": "name",
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
    "sourceName": "phone",
    "targetName": "phone",
    "type": "text",
    "fallbackValue": "N/A"
  },
  "metadata": {
    "targetName": "metadata",
    "type": "jsonb",
    "fields": []
  }
}
```

## Field Mapping Examples

### Example 1: Nested User Profile

**Firestore Document**:
```json
{
  "id": "user456",
  "profile": {
    "firstName": "Jane",
    "lastName": "Smith",
    "contact": {
      "email": "jane@example.com",
      "mobile": "+9876543210"
    }
  },
  "preferences": {
    "language": "en",
    "timezone": "America/New_York"
  }
}
```

**Field Mapping**:
```json
{
  "externalId": {
    "sourceName": "id",
    "targetName": "external_id",
    "type": "text"
  },
  "name": {
    "sourceName": "profile.firstName",
    "targetName": "name",
    "type": "text",
    "fallbackValue": "User"
  },
  "email": {
    "sourceName": "profile.contact.email",
    "targetName": "email",
    "type": "text",
    "fallbackValue": "no-email@example.com"
  },
  "phone": {
    "sourceName": "profile.contact.mobile",
    "targetName": "phone",
    "type": "text",
    "fallbackValue": "N/A"
  },
  "metadata": {
    "targetName": "metadata",
    "type": "jsonb",
    "fields": [
      {
        "sourceName": "profile.lastName",
        "targetName": "last_name",
        "type": "text"
      },
      {
        "sourceName": "preferences.language",
        "targetName": "language",
        "type": "text"
      },
      {
        "sourceName": "preferences.timezone",
        "targetName": "timezone",
        "type": "text"
      }
    ]
  }
}
```

### Example 2: E-commerce User with Subscription

**Firestore Document**:
```json
{
  "userId": "cust_789",
  "displayName": "Bob Johnson",
  "email": "bob@example.com",
  "phoneNumber": "+1122334455",
  "subscription": {
    "plan": "premium",
    "status": "active",
    "renewsAt": "2025-12-31"
  },
  "orders": {
    "total": 15,
    "totalSpent": 1250.50
  },
  "preferences": {
    "marketingEmails": true,
    "pushNotifications": true
  }
}
```

**Field Mapping**:
```json
{
  "externalId": {
    "sourceName": "userId",
    "targetName": "external_id",
    "type": "text"
  },
  "name": {
    "sourceName": "displayName",
    "targetName": "name",
    "type": "text",
    "fallbackValue": "Customer"
  },
  "email": {
    "sourceName": "email",
    "targetName": "email",
    "type": "text",
    "fallbackValue": "no-email@example.com"
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
        "sourceName": "subscription.plan",
        "targetName": "subscription_plan",
        "type": "text"
      },
      {
        "sourceName": "subscription.status",
        "targetName": "subscription_status",
        "type": "text"
      },
      {
        "sourceName": "orders.total",
        "targetName": "order_count",
        "type": "number"
      },
      {
        "sourceName": "orders.totalSpent",
        "targetName": "lifetime_value",
        "type": "number"
      },
      {
        "sourceName": "preferences.marketingEmails",
        "targetName": "marketing_opt_in",
        "type": "boolean"
      },
      {
        "sourceName": "preferences.pushNotifications",
        "targetName": "push_enabled",
        "type": "boolean"
      }
    ]
  }
}
```

### Example 3: FlutterFlow + Firebase Auth

**Firestore Document** (from FlutterFlow):
```json
{
  "uid": "auth_user_123",
  "display_name": "Alice Wonder",
  "email": "alice@example.com",
  "phone_number": "+5551234567",
  "created_time": "2025-01-15T10:30:00Z",
  "photo_url": "https://example.com/photo.jpg",
  "country": "Brazil",
  "age": 28,
  "is_verified": true
}
```

**Field Mapping**:
```json
{
  "externalId": {
    "sourceName": "uid",
    "targetName": "external_id",
    "type": "text"
  },
  "name": {
    "sourceName": "display_name",
    "targetName": "name",
    "type": "text",
    "fallbackValue": "User"
  },
  "email": {
    "sourceName": "email",
    "targetName": "email",
    "type": "text",
    "fallbackValue": "N/A"
  },
  "phone": {
    "sourceName": "phone_number",
    "targetName": "phone",
    "type": "text",
    "fallbackValue": "N/A"
  },
  "metadata": {
    "targetName": "metadata",
    "type": "jsonb",
    "fields": [
      {
        "sourceName": "country",
        "targetName": "country",
        "type": "text"
      },
      {
        "sourceName": "age",
        "targetName": "age",
        "type": "number"
      },
      {
        "sourceName": "is_verified",
        "targetName": "verified",
        "type": "boolean"
      },
      {
        "sourceName": "photo_url",
        "targetName": "avatar_url",
        "type": "text"
      }
    ]
  }
}
```

## Integration Patterns

### Pattern 1: Initial User Document Creation and Sync

**Note**: The extension only triggers on document **updates**, not on document creation. To sync a newly created document, you need to create it first, then update it.

```javascript
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

async function createAndSyncUser(userId, userData) {
  try {
    // Step 1: Create the Firestore document
    await db.collection('users').doc(userId).set({
      uid: userId,
      email: userData.email,
      displayName: userData.name,
      phoneNumber: userData.phone,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      profile: {
        country: userData.country || null,
        language: userData.language || 'en'
      }
    });
    
    // Step 2: Trigger the extension by updating the document
    // (Extension only triggers on updates, not on initial creation)
    await db.collection('users').doc(userId).update({
      lastSyncedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`User document synced to PushFire: ${userId}`);
    
  } catch (error) {
    console.error('Error syncing user document:', error);
    throw error;
  }
}

// Usage
await createAndSyncUser('user123', {
  email: 'newuser@example.com',
  name: 'New User',
  phone: '+1234567890',
  country: 'USA',
  language: 'en'
});
```

### Pattern 2: Profile Update

```javascript
async function updateUserProfile(userId, updates) {
  try {
    // Update Firestore document
    await db.collection('users').doc(userId).update({
      ...updates,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`User ${userId} profile updated and synced to PushFire`);
    
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

// Usage examples
await updateUserProfile('user123', {
  displayName: 'John Updated Name'
});

await updateUserProfile('user123', {
  'profile.country': 'Canada',
  'profile.language': 'fr'
});
```

### Pattern 3: Subscription Status Change

```javascript
async function updateSubscription(userId, subscriptionData) {
  try {
    await db.collection('users').doc(userId).update({
      'subscription.plan': subscriptionData.plan,
      'subscription.status': subscriptionData.status,
      'subscription.updatedAt': admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`Subscription updated for user ${userId}`);
    
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

// Usage
await updateSubscription('user123', {
  plan: 'premium',
  status: 'active'
});
```

### Pattern 4: Batch User Updates

```javascript
async function batchUpdateUsers(userUpdates) {
  const batch = db.batch();
  
  userUpdates.forEach(({ userId, data }) => {
    const userRef = db.collection('users').doc(userId);
    batch.update(userRef, {
      ...data,
      batchUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  });
  
  await batch.commit();
  console.log(`Batch updated ${userUpdates.length} users`);
}

// Usage
await batchUpdateUsers([
  { userId: 'user1', data: { 'preferences.language': 'es' } },
  { userId: 'user2', data: { 'preferences.language': 'fr' } },
  { userId: 'user3', data: { 'preferences.language': 'de' } }
]);
```

## Advanced Use Cases

### Use Case 1: Tracking User Activity

```javascript
async function trackUserActivity(userId, activityType) {
  try {
    await db.collection('users').doc(userId).update({
      lastActivity: {
        type: activityType,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      },
      activityCount: admin.firestore.FieldValue.increment(1)
    });
    
  } catch (error) {
    console.error('Error tracking activity:', error);
  }
}

// Usage
await trackUserActivity('user123', 'product_viewed');
await trackUserActivity('user123', 'cart_updated');
```

### Use Case 2: Loyalty Points System

```javascript
async function updateLoyaltyPoints(userId, points, reason) {
  try {
    await db.collection('users').doc(userId).update({
      'loyalty.points': admin.firestore.FieldValue.increment(points),
      'loyalty.lastUpdate': admin.firestore.FieldValue.serverTimestamp(),
      'loyalty.lastReason': reason
    });
    
    console.log(`Added ${points} points to user ${userId}`);
    
  } catch (error) {
    console.error('Error updating loyalty points:', error);
  }
}

// Usage
await updateLoyaltyPoints('user123', 100, 'purchase_completed');
await updateLoyaltyPoints('user123', 50, 'referral_bonus');
```

### Use Case 3: Geographic Segmentation

```javascript
async function updateUserLocation(userId, locationData) {
  try {
    await db.collection('users').doc(userId).update({
      'location.country': locationData.country,
      'location.city': locationData.city,
      'location.timezone': locationData.timezone,
      'location.lastUpdated': admin.firestore.FieldValue.serverTimestamp()
    });
    
  } catch (error) {
    console.error('Error updating location:', error);
  }
}

// Usage
await updateUserLocation('user123', {
  country: 'USA',
  city: 'New York',
  timezone: 'America/New_York'
});
```

## Error Handling

### Handling Missing Fields

```javascript
async function safeUpdateUser(userId, updates) {
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      throw new Error(`User ${userId} not found`);
    }
    
    // Validate required fields
    if (updates.email && !isValidEmail(updates.email)) {
      throw new Error('Invalid email format');
    }
    
    await db.collection('users').doc(userId).update(updates);
    
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### Retry Logic

```javascript
async function updateUserWithRetry(userId, updates, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await db.collection('users').doc(userId).update(updates);
      console.log(`User ${userId} updated successfully on attempt ${attempt}`);
      return;
      
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt} failed:`, error.message);
      
      if (attempt < maxRetries) {
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }
  
  throw new Error(`Failed after ${maxRetries} attempts: ${lastError.message}`);
}
```

## Testing

### Test Document Creation

```javascript
async function createTestUser() {
  const testUserId = `test_${Date.now()}`;
  
  await db.collection('users').doc(testUserId).set({
    uid: testUserId,
    email: `test${Date.now()}@example.com`,
    displayName: 'Test User',
    phoneNumber: '+1234567890',
    isTest: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
  
  console.log(`Created test user: ${testUserId}`);
  return testUserId;
}

// Clean up test user
async function deleteTestUser(testUserId) {
  await db.collection('users').doc(testUserId).delete();
  console.log(`Deleted test user: ${testUserId}`);
}
```

### Verify Sync

```javascript
async function verifySyncWorking() {
  const testUserId = await createTestUser();
  
  // Wait a moment for the extension to process
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Update the test user to trigger sync
  await db.collection('users').doc(testUserId).update({
    displayName: 'Test User Updated',
    lastUpdate: admin.firestore.FieldValue.serverTimestamp()
  });
  
  console.log('Sync test completed. Check Firebase logs for results.');
  
  // Clean up
  await deleteTestUser(testUserId);
}
```

## Resources

- [Full Documentation](README.md)
- [Schema Builder](https://pushfire.app/extensions/firebase/schema-builder)
- [PushFire API Documentation](https://www.pushfire.app/docs)
- [Quick Start Guide](QUICKSTART.md)

---

**Need more examples?** Visit [pushfire.app/docs](https://www.pushfire.app/docs) or check our [GitHub Issues](https://github.com/FlywheelStudio/pushfire-libs-firebase-extension/issues)


# Security Policy

## Supported Versions

We release security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.0.1   | :white_check_mark: |

## Reporting a Vulnerability

The PushFire team takes security vulnerabilities seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities through:
- **GitHub Security Advisories**: [Report a vulnerability](https://github.com/FlywheelStudio/pushfire-libs-firebase-extension/security/advisories/new)
- **Subject**: [SECURITY] PushFire Firebase Extension - [Brief Description]

### What to Include

Please include the following information in your report:

1. **Type of vulnerability** (e.g., authentication bypass, data exposure, injection)
2. **Detailed description** of the vulnerability
3. **Steps to reproduce** the issue
4. **Potential impact** of the vulnerability
5. **Suggested fix** (if you have one)
6. **Your contact information** for follow-up

### What to Expect

- **Acknowledgment**: We'll acknowledge receipt of your report within 48 hours
- **Assessment**: We'll investigate and assess the vulnerability within 5 business days
- **Updates**: We'll keep you informed of our progress
- **Resolution**: We'll work on a fix and release it as soon as possible
- **Credit**: We'll credit you in the release notes (unless you prefer to remain anonymous)

## Security Best Practices

### For Extension Users

#### Protecting Your Credentials

1. **Never commit credentials** to version control
   ```bash
   # Bad - Don't do this
   git add firebase-config.json
   ```

2. **Use Firebase Secret Manager** for sensitive configuration
   ```bash
   firebase functions:secrets:set PUSHFIRE_PROJECT_TOKEN
   ```

3. **Rotate tokens regularly**
   - Generate new tokens in PushFire Dashboard
   - Update Firebase configuration
   - Revoke old tokens

4. **Monitor access logs**
   - Review Firebase Functions logs regularly
   - Set up alerts for suspicious activity
   - Monitor PushFire API usage

#### Firestore Security Rules

Protect your subscriber collection with appropriate security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only allow Cloud Functions to read subscriber data
    match /subscribers/{subscriberId} {
      allow read: if false; // Block client reads
      allow write: if request.auth != null; // Only authenticated users
    }
  }
}
```

#### Data Minimization

Only sync necessary data to PushFire:

```json
{
  "metadata": {
    "type": "jsonb",
    "fields": [
      // Only include non-sensitive fields
      { "sourceName": "displayName", "targetName": "name", "type": "text" },
      // Don't include: passwords, payment info, SSN, etc.
    ]
  }
}
```

### For Contributors

#### Code Security

1. **Input Validation**
   - Validate all configuration inputs
   - Sanitize data before processing
   - Handle edge cases gracefully

2. **Error Handling**
   - Never expose sensitive data in error messages
   - Log errors securely
   - Use generic error messages for users

3. **Dependencies**
   - Keep dependencies up to date
   - Run `pnpm audit` regularly
   - Review dependency licenses

4. **Code Review**
   - All code must be reviewed before merging
   - Security-sensitive changes require additional review
   - Test security implications thoroughly

## Known Security Considerations

### API Token Handling

**Issue**: API tokens are stored in Firebase configuration

**Mitigation**:
- Tokens are stored in Firebase's secure configuration system
- Tokens are never logged or exposed in responses
- Tokens are transmitted only via HTTPS
- Firebase restricts access to configuration values

**Best Practice**: Use Firebase Secret Manager for enhanced security:
```bash
firebase functions:secrets:set PUSHFIRE_PROJECT_TOKEN
```

### Data Transmission

**Issue**: Subscriber data is transmitted to external API

**Mitigation**:
- All API calls use HTTPS (TLS 1.2+)
- Data is encrypted in transit
- API authentication required for all requests
- Timeout protection prevents hanging connections

### Firestore Access

**Issue**: Extension needs to read Firestore documents

**Mitigation**:
- Extension only reads from specified collection
- No write permissions required
- Access logged in Firebase Functions logs
- Collection name is configurable

### Error Messages

**Issue**: Error messages could leak sensitive information

**Mitigation**:
- Generic error messages for users
- Detailed errors only in secure logs
- No credential exposure in errors
- Structured error handling

## Security Features

### Built-in Security

- ✅ **HTTPS Only**: All API communications use HTTPS
- ✅ **Token Authentication**: API requests require valid tokens
- ✅ **Timeout Protection**: Requests timeout after 10 seconds
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Minimal Permissions**: Extension requests only necessary permissions
- ✅ **No Data Storage**: Extension doesn't store data locally
- ✅ **Audit Logging**: All operations logged to Firebase

### Compliance

- **GDPR**: Extension supports GDPR-compliant data handling
- **Data Processing**: PushFire acts as a data processor
- **User Rights**: Supports user data deletion and access requests
- **Privacy**: See [Privacy Policy](https://www.pushfire.app/legals/privacy-policy)

## Security Updates

### Update Notifications

We'll notify users of security updates through:
- GitHub Security Advisories
- Firebase Extensions update notifications
- Email to registered contacts
- Release notes in CHANGELOG.md

### Update Process

1. Security fixes are prioritized and released quickly
2. Users are notified of the update
3. Update installation is managed through Firebase
4. Critical updates may require immediate action

### Staying Updated

**Check for updates regularly**:
```bash
firebase ext:update pushfire-subscribers-sync
```

**Monitor releases**:
- Watch the [GitHub repository](https://github.com/FlywheelStudio/pushfire-libs-firebase-extension)
- Subscribe to release notifications
- Follow [@pushfire](https://twitter.com/pushfire) for announcements

## Vulnerability Disclosure Policy

### Our Commitment

- We'll work with you to understand and resolve the issue
- We'll keep you informed throughout the process
- We'll credit you in release notes (with your permission)
- We won't take legal action against responsible disclosure

### Responsible Disclosure

We ask that you:
- Give us reasonable time to fix the issue before public disclosure
- Don't exploit the vulnerability beyond proof-of-concept
- Don't access or modify user data without permission
- Don't perform DoS attacks or other disruptive testing

### Public Disclosure

After we've released a fix:
- We'll publish a security advisory
- We'll update the CHANGELOG with security details
- We'll notify affected users
- We'll credit the reporter (with permission)

## Additional Resources

- [Firebase Security Documentation](https://firebase.google.com/docs/rules/get-started)
- [PushFire Privacy Policy](https://www.pushfire.app/legals/privacy-policy)
- [PushFire Terms of Service](https://www.pushfire.app/legals/terms-of-service)
- [OWASP Security Guidelines](https://owasp.org/)

## Contact

For security concerns:
- **GitHub Security**: [Report a vulnerability](https://github.com/FlywheelStudio/pushfire-libs-firebase-extension/security/advisories/new)
- **Website**: [pushfire.app](https://pushfire.app)

---

Thank you for helping keep PushFire Subscribers Sync secure! 🔒


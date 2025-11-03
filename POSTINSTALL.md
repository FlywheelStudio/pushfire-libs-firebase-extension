# Installation Complete! 🎉

Your PushFire Subscribers Sync extension is now active.

## Verify Installation

1. **Update a document** in your configured Firestore collection
2. **Check the logs**:
   ```bash
   firebase functions:log --only ext-pushfire-subscribers-sync-updateSubscriber
   ```
3. **Verify in PushFire**: Check your [PushFire Dashboard](https://pushfire.app/dashboard) → Subscribers

## Important Notes

- The extension only triggers on document **updates** (not creates)
- For new users, create the document first, then update it to trigger sync

## Configuration

To update your configuration:
- **Firebase Console**: Extensions → PushFire Subscribers Sync → Reconfigure
- **Firebase CLI**: `firebase ext:configure pushfire-subscribers-sync`

## Troubleshooting

- **Not triggering?** Verify collection name matches exactly
- **Authentication errors?** Check your Project Token
- **Field mapping issues?** Use the [Schema Builder](https://pushfire.app/extensions/firebase/schema-builder) to regenerate configuration

## Support

- 📚 [Documentation](https://www.pushfire.app/docs)
- 💬 [Contact Support](mailto:hello@pushfire.app)

---

**Ready to go!** Your subscribers will now sync automatically to PushFire. 🚀

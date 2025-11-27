const pb = new PocketBase()
if (!pb.authStore.isValid || pb.authStore.record.collectionName != 'admins') {
  location.href = 'login'
}
const pb = new PocketBase()
if (!pb.authStore.isValid || pb.authStore.record.collectionName != 'users') {
  location.href = '/home/login'
}
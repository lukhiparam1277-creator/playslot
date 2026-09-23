import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './config';

/**
 * Upload an image/file to Firebase Storage and retrieve the public download URL
 */
export const uploadFileToStorage = async (file, path = 'uploads') => {
  if (!isFirebaseConfigured() || !file) {
    // Return a placeholder or object URL for local preview
    if (typeof file === 'string') return file;
    return URL.createObjectURL(file);
  }

  try {
    const filename = `${Date.now()}_${file.name || 'image.jpg'}`;
    const storageRef = ref(storage, `${path}/${filename}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.error('[Firebase Storage] Upload error:', error);
    throw error;
  }
};

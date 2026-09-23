import {
  COLLECTIONS,
  getCollectionDocs,
  getDocById,
  createFirestoreDoc,
  updateFirestoreDoc,
  deleteFirestoreDoc
} from '../firebase/firestore';
import { defaultUsers } from '../data/initialData';

export const userService = {
  async getAllUsers() {
    const docs = await getCollectionDocs(COLLECTIONS.USERS);
    return docs.length ? docs : defaultUsers;
  },

  async getUserById(id) {
    const user = await getDocById(COLLECTIONS.USERS, id);
    if (user) return user;
    return defaultUsers.find(u => u.id === id) || null;
  },

  async createUser(userData) {
    const userId = userData.id || ('user-' + Date.now());
    return await createFirestoreDoc(COLLECTIONS.USERS, { ...userData, id: userId }, userId);
  },

  async updateUser(id, userData) {
    return await updateFirestoreDoc(COLLECTIONS.USERS, id, userData);
  },

  async deleteUser(id) {
    return await deleteFirestoreDoc(COLLECTIONS.USERS, id);
  }
};

export default userService;

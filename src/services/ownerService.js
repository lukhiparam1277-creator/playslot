import {
  COLLECTIONS,
  getCollectionDocs,
  getDocById,
  createFirestoreDoc,
  updateFirestoreDoc,
  deleteFirestoreDoc
} from '../firebase/firestore';
import { defaultApplications } from '../data/initialData';

export const ownerService = {
  async getAllApplications() {
    const docs = await getCollectionDocs(COLLECTIONS.APPLICATIONS);
    return docs.length ? docs : defaultApplications;
  },

  async getApplicationById(id) {
    const app = await getDocById(COLLECTIONS.APPLICATIONS, id);
    if (app) return app;
    return defaultApplications.find(a => 
      a.applicationId?.toLowerCase() === (id || '').toLowerCase() || 
      a.id === id || 
      a.email?.toLowerCase() === (id || '').toLowerCase()
    ) || null;
  },

  async submitApplication(appData) {
    const appId = 'PS-OWNER-' + Math.floor(10000 + Math.random() * 90000);
    const payload = {
      ...appData,
      applicationId: appId,
      id: 'app-' + Date.now(),
      status: 'Pending',
      submittedDate: new Date().toISOString().split('T')[0]
    };
    return await createFirestoreDoc(COLLECTIONS.APPLICATIONS, payload, payload.id);
  },

  async updateApplicationStatus(id, status, rejectionReason = '') {
    return await updateFirestoreDoc(COLLECTIONS.APPLICATIONS, id, { status, rejectionReason });
  }
};

export default ownerService;

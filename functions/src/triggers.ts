import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { sendWelcomeEmail } from './services/emails';

export const onUserCreated = onDocumentCreated('users/{userId}', async (event) => {
  const snapshot = event.data;
  if (!snapshot) return;

  const user = snapshot.data();
  if (user.email) {
    await sendWelcomeEmail(user.email, user.name || 'Developer');
  }
});

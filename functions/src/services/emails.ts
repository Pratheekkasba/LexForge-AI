import * as admin from 'firebase-admin';

// In a real application, you would initialize an email service here:
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendWelcomeEmail(userEmail: string, userName: string) {
  // Mock sending email
  console.log(`[EMAIL MOCK] Sending Welcome Email to ${userEmail}`);
  
  // Here we could also log it to a Firestore 'mail_queue' collection if using Firebase Extensions
  await admin.firestore().collection('mail_logs').add({
    to: userEmail,
    template: 'welcome',
    status: 'sent',
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });
}

export async function sendTeamInvite(email: string, orgName: string, inviterName: string, inviteToken: string) {
  const joinLink = `https://lexforge.ai/register?invite=${inviteToken}`;
  
  console.log(`[EMAIL MOCK] Sending Invite to ${email} for org ${orgName}`);
  console.log(`[EMAIL MOCK] Link: ${joinLink}`);

  await admin.firestore().collection('mail_logs').add({
    to: email,
    template: 'team_invite',
    orgName,
    status: 'sent',
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });
}

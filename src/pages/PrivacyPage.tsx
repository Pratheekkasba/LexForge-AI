import { LegalPageLayout } from '../components/ui/LegalPageLayout';

export function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="October 24, 2023">
      <h2>1. Introduction</h2>
      <p>
        At LexForge AI, we recognize that privacy is foundational to trust, especially within the legal and compliance sectors. This Privacy Policy describes how LexForge ("we", "our", or "us") collects, uses, and shares your personal information when you use our API, applications, and website (collectively, the "Services").
      </p>

      <h2>2. Data We Do Not Collect</h2>
      <p>
        <strong>Zero Data Retention Inference:</strong> By default, data submitted to the LexForge API for analysis (e.g., contracts, legal briefs) is strictly processed in memory and immediately discarded after a response is returned. It is <strong>not</strong> logged, stored, or used to train our foundational language models.
      </p>

      <h2>3. Information We Collect</h2>
      <p>We only collect the minimum amount of information required to provide and secure our Services:</p>
      <ul>
        <li><strong>Account Information:</strong> Name, email address, billing information, and organization details when you register for an account.</li>
        <li><strong>Usage Data:</strong> API request metadata (timestamps, endpoints hit, latencies, token counts) for billing and rate-limiting purposes. We do not store the payload of these requests.</li>
        <li><strong>Support Communications:</strong> Content of your messages when you contact our support team.</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>
        All data at rest is encrypted using AES-256, and all data in transit is encrypted using TLS 1.3. Access to production systems is strictly limited to authorized personnel via zero-trust VPNs and hardware security keys.
      </p>

      <h2>5. Contact</h2>
      <p>
        For any privacy-related inquiries or to exercise your data rights (e.g., GDPR, CCPA), please contact our Data Protection Officer at <code>privacy@lexforge.ai</code>.
      </p>
    </LegalPageLayout>
  );
}

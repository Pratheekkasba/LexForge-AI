import { LegalPageLayout } from '../components/ui/LegalPageLayout';

export function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="October 24, 2023">
      <h2>1. Agreement to Terms</h2>
      <p>
        By accessing or using the LexForge API, software, and services (the "Services"), you agree to be bound by these Terms of Service. If you do not agree to these Terms, do not use the Services.
      </p>

      <h2>2. Acceptable Use</h2>
      <p>You agree not to use the Services to:</p>
      <ul>
        <li>Generate or disseminate malicious content, malware, or unlawful materials.</li>
        <li>Attempt to reverse engineer, decompile, or extract the source code or underlying models of the LexForge platform.</li>
        <li>Circumvent or exceed API rate limits, pricing tiers, or security mechanisms.</li>
      </ul>

      <h2>3. Intellectual Property</h2>
      <p>
        LexForge retains all rights, title, and interest in the Services, including all intellectual property rights in our foundational models, algorithms, and infrastructure. You retain all rights to the data you submit to the API (your "Payloads").
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        LexForge AI provides tools to assist with legal reasoning and document analysis. However, <strong>LexForge AI is not a law firm and does not provide legal advice.</strong> The outputs of our models must be reviewed by qualified legal counsel. To the maximum extent permitted by law, LexForge shall not be liable for any indirect, incidental, or consequential damages arising from the use of the Services.
      </p>

      <h2>5. Enterprise Agreements</h2>
      <p>
        Customers on the Enterprise tier may have customized Master Services Agreements (MSAs) and Service Level Agreements (SLAs). In the event of a conflict between these Terms and an executed MSA, the MSA will govern.
      </p>
    </LegalPageLayout>
  );
}

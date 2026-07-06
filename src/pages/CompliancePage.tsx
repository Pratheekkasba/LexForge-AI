import { LegalPageLayout } from '../components/ui/LegalPageLayout';

export function CompliancePage() {
  return (
    <LegalPageLayout title="Compliance & SOC" lastUpdated="October 24, 2023">
      <h2>Commitment to Compliance</h2>
      <p>
        LexForge AI is designed to meet the rigorous regulatory and compliance requirements of the global legal, financial, and healthcare sectors.
      </p>

      <h2>SOC 2 Type II</h2>
      <p>
        LexForge AI undergoes annual independent third-party audits to maintain our SOC 2 Type II certification. This audit verifies that our information security practices, policies, procedures, and operations meet the strict SOC 2 standards for security, availability, and confidentiality. 
        <br/><br/>
        <em>Enterprise customers may request our latest SOC 2 report under an NDA.</em>
      </p>

      <h2>GDPR & CCPA Readiness</h2>
      <p>
        We fully support the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). Our zero-data-retention inference architecture inherently minimizes PII exposure. Furthermore, we offer data residency options allowing EU customers to process all data exclusively within European data centers.
      </p>

      <h2>HIPAA Compliance</h2>
      <p>
        For organizations in the healthcare space, LexForge AI can operate as a Business Associate. Enterprise customers can execute a Business Associate Agreement (BAA) to ensure that PHI processed by our API remains strictly compliant with HIPAA regulations.
      </p>

      <h2>Continuous Monitoring</h2>
      <p>
        We utilize continuous compliance monitoring platforms to ensure that our infrastructure never drifts from our established security baselines. Alerts are triaged 24/7 by our security operations center.
      </p>
    </LegalPageLayout>
  );
}

import { LegalPageLayout } from '../components/ui/LegalPageLayout';

export function DPAPage() {
  return (
    <LegalPageLayout title="Data Processing Agreement" lastUpdated="October 24, 2023">
      <h2>1. Purpose and Scope</h2>
      <p>
        This Data Processing Agreement ("DPA") forms part of the Master Services Agreement or Terms of Service between LexForge AI ("Data Processor") and the Customer ("Data Controller"). It reflects the parties' agreement with regard to the processing of Personal Data under applicable Data Protection Laws, including the GDPR and CCPA.
      </p>

      <h2>2. Processing of Personal Data</h2>
      <p>
        LexForge shall process Personal Data only on documented instructions from the Customer, unless required to do so by law. Our zero-data-retention architecture ensures that payload data submitted to our API is processed Ephemerally and is not persisted to disk or used for model training.
      </p>

      <h2>3. Security Measures</h2>
      <p>
        Taking into account the state of the art, the costs of implementation, and the nature of the processing, LexForge shall implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk. This includes AES-256 encryption at rest, TLS 1.3 in transit, and strict role-based access controls.
      </p>

      <h2>4. Subprocessors</h2>
      <p>
        The Customer agrees that LexForge may engage Subprocessors to process Personal Data on the Customer's behalf. LexForge maintains an up-to-date list of its Subprocessors (e.g., AWS, GCP). We will notify the Customer of any intended changes concerning the addition or replacement of Subprocessors.
      </p>

      <h2>5. International Transfers</h2>
      <p>
        Any transfer of Personal Data outside of the EEA, Switzerland, or the UK will be governed by the Standard Contractual Clauses (SCCs) as approved by the European Commission, ensuring adequate safeguards for the data transfer.
      </p>
    </LegalPageLayout>
  );
}

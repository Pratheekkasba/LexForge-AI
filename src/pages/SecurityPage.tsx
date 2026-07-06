import { LegalPageLayout } from '../components/ui/LegalPageLayout';

export function SecurityPage() {
  return (
    <LegalPageLayout title="Security Architecture" lastUpdated="October 24, 2023">
      <h2>1. Overview</h2>
      <p>
        Security is not a feature at LexForge; it is the foundation of our platform. We engineer our systems to protect highly sensitive legal and proprietary corporate data against advanced threats.
      </p>

      <h2>2. Data Encryption</h2>
      <p>
        <strong>At Rest:</strong> All databases, storage buckets, and backups are encrypted using AES-256 with keys managed via AWS KMS / Google Cloud KMS.
      </p>
      <p>
        <strong>In Transit:</strong> All communications between your applications and our API, as well as internal microservice traffic, are encrypted using TLS 1.3.
      </p>

      <h2>3. Infrastructure Security</h2>
      <p>
        Our infrastructure is hosted on top-tier cloud providers (AWS/GCP) in hardened environments.
      </p>
      <ul>
        <li>Strict network segmentation and Virtual Private Clouds (VPCs).</li>
        <li>No public IP addresses for database or inference clusters.</li>
        <li>Continuous vulnerability scanning and automated OS patching.</li>
      </ul>

      <h2>4. Application Security</h2>
      <p>
        LexForge conducts regular static (SAST) and dynamic (DAST) application security testing. We employ an independent, third-party firm to conduct comprehensive penetration testing bi-annually.
      </p>
      
      <h2>5. Responsible Disclosure</h2>
      <p>
        We value the security research community. If you believe you have discovered a vulnerability in the LexForge platform, please report it to <code>security@lexforge.ai</code>. We offer bug bounties for verified critical vulnerabilities.
      </p>
    </LegalPageLayout>
  );
}

import { Activity, Shield, Users, Network } from 'lucide-react';
import { MarketingSection, SectionHeader } from '../components/ui/MarketingSection';
import { BentoGrid, BentoCard } from '../components/ui/BentoGrid';
import { InfrastructureSection } from '../components/marketing/InfrastructureSection';
import { DataPipeline } from '../components/marketing/DataPipeline';
import { AccessControl } from '../components/marketing/AccessControl';

export function PlatformPage() {
  return (
    <div className="pt-20">
      <MarketingSection background="gradient">
        <SectionHeader 
          title="Infrastructure for Legal AI." 
          description="A complete platform for managing organizations, monitoring API usage, enforcing RBAC, and scaling your AI integrations globally."
          badge="Platform"
        />

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
           <div className="p-8 rounded-2xl border bg-black/50 backdrop-blur-md" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
             <Network className="text-primary mb-6" size={32} />
             <h3 className="text-xl font-bold mb-3" style={{ color: '#E1E0CC' }}>Global Edge Network</h3>
             <p className="text-sm leading-relaxed" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
               Requests are routed to the nearest secure inference cluster to minimize latency and ensure compliance with regional data residency requirements (GDPR, CCPA).
             </p>
           </div>
           <div className="p-8 rounded-2xl border bg-black/50 backdrop-blur-md" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
             <Shield className="text-primary mb-6" size={32} />
             <h3 className="text-xl font-bold mb-3" style={{ color: '#E1E0CC' }}>Zero Data Retention</h3>
             <p className="text-sm leading-relaxed" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
               By default, LexForge does not retain, log, or use customer payload data to train our foundational models. Your data remains yours.
             </p>
           </div>
        </div>
      </MarketingSection>

      <MarketingSection background="black" borderTop>
        <SectionHeader title="Platform Capabilities" align="left" />
        
        <BentoGrid>
          <BentoCard 
            title="Organization Management" 
            description="Manage multiple workspaces, invite team members, and strictly enforce SAML/SSO."
            icon={<Users className="text-primary" />}
          />
          <BentoCard 
            title="Real-time Monitoring" 
            description="Audit every request, track token usage, and monitor latencies via the dashboard."
            icon={<Activity className="text-primary" />}
            delay={0.1}
          />
          <BentoCard 
            title="Enterprise Security" 
            description="AES-256 encryption at rest, TLS 1.3 in transit, and continuous SOC2 monitoring."
            icon={<Shield className="text-primary" />}
            delay={0.2}
          />
        </BentoGrid>
      </MarketingSection>

      <InfrastructureSection />
      <DataPipeline />
      <AccessControl />
    </div>
  );
}

import { Building, ShieldCheck, Lock, Headphones, Server } from 'lucide-react';
import { MarketingSection, SectionHeader } from '../components/ui/MarketingSection';
import { DedicatedInfraVisual, ComplianceVisual, FineTuningVisual, SLAVisual, SSOVisual } from '../components/marketing/EnterpriseVisuals';

export function EnterprisePage() {
  const features = [
    {
      title: 'Dedicated Infrastructure',
      description: 'Single-tenant deployment options ensuring absolute isolation of your models, data, and compute resources.',
      icon: Server,
      visual: <DedicatedInfraVisual />
    },
    {
      title: 'Advanced Compliance',
      description: 'HIPAA, SOC 2 Type II, ISO 27001, and GDPR readiness. We support custom Data Processing Agreements (DPAs).',
      icon: ShieldCheck,
      visual: <ComplianceVisual />
    },
    {
      title: 'Custom Model Fine-tuning',
      description: 'Train our base legal models on your firm\'s proprietary playbook and historical contracts for bespoke intelligence.',
      icon: Building,
      visual: <FineTuningVisual />
    },
    {
      title: 'Enterprise SLAs',
      description: '99.99% guaranteed uptime SLA, dedicated technical account manager (TAM), and 24/7 phone support.',
      icon: Headphones,
      visual: <SLAVisual />
    },
    {
      title: 'Single Sign-On (SSO)',
      description: 'Enforce SAML/SSO across your organization with automated SCIM provisioning and role-based access control.',
      icon: Lock,
      visual: <SSOVisual />
    }
  ];

  return (
    <div className="pt-20">
      <MarketingSection background="black">
        <SectionHeader 
          title="LexForge for Enterprise" 
          description="Built for the world's most demanding legal and compliance teams. Deploy secure, scalable AI infrastructure tailored to your strict security requirements."
          badge="Enterprise"
        />

        <div className="mt-12 text-center">
          <button className="px-8 py-4 rounded-xl text-sm font-medium transition-all duration-300 glow-primary bg-[#E1E0CC] text-black hover:bg-white">
            Contact Sales
          </button>
        </div>
      </MarketingSection>

      <MarketingSection background="dark" borderTop>
        <div className="max-w-5xl mx-auto space-y-24">
          
          {features.map((feature, i) => (
            <div key={feature.title} className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-1/2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <feature.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" style={{ color: '#E1E0CC' }}>
                  {feature.title}
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                  {feature.description}
                </p>
              </div>
              <div className="w-full md:w-1/2 aspect-video rounded-2xl">
                 {feature.visual}
              </div>
            </div>
          ))}

        </div>
      </MarketingSection>
    </div>
  );
}

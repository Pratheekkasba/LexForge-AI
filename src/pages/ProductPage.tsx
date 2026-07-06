import { BrainCircuit, ShieldCheck, Zap, Server } from 'lucide-react';
import { MarketingSection, SectionHeader } from '../components/ui/MarketingSection';
import { BentoGrid, BentoCard } from '../components/ui/BentoGrid';
import { DeepExtraction } from '../components/marketing/DeepExtraction';
import { NLPComparison } from '../components/marketing/NLPComparison';
import { Integrations } from '../components/marketing/Integrations';

export function ProductPage() {
  return (
    <div className="pt-20">
      <MarketingSection background="gradient">
        <SectionHeader 
          title="The Intelligence Engine for Modern Law." 
          description="LexForge AI is a suite of specialized models and APIs designed exclusively to parse, analyze, and generate complex legal text with unprecedented accuracy."
          badge="Product Overview"
        />

        <div className="mt-16 max-w-5xl mx-auto rounded-2xl border bg-[#111111] overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="aspect-video relative flex items-center justify-center border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
             {/* Mock UI for Legal Assistant */}
             <div className="absolute inset-0 grid-pattern opacity-30" />
             <div className="relative z-10 w-full max-w-2xl px-6">
                <div className="bg-black/50 border rounded-2xl p-6 backdrop-blur-md" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <BrainCircuit size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#E1E0CC' }}>Analyze Indemnification Clause</p>
                      <p className="text-xs text-white/40">Analyzing Master Services Agreement.pdf</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
                    <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
                  </div>
                </div>
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
            {[
              { stat: '99.9%', label: 'Extraction Accuracy' },
              { stat: '100+', label: 'Pre-trained Clause Types' },
              { stat: '< 200ms', label: 'Average Latency' }
            ].map(s => (
              <div key={s.label} className="p-8 text-center">
                <p className="text-3xl font-bold mb-1" style={{ color: '#E1E0CC' }}>{s.stat}</p>
                <p className="text-sm text-white/40 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </MarketingSection>

      <MarketingSection background="black" borderTop>
        <SectionHeader title="Core Capabilities" align="center" />
        
        <BentoGrid>
          <BentoCard 
            title="Contract Intelligence" 
            description="Automatically extract key terms, obligations, and risks from complex commercial agreements."
            icon={<ShieldCheck className="text-primary" />}
            delay={0.1}
          />
          <BentoCard 
            title="Automated Redlining" 
            description="Compare drafts against your organization's legal playbook in seconds."
            icon={<Zap className="text-primary" />}
            delay={0.2}
          />
          <BentoCard 
            title="Scalable Infrastructure" 
            description="Deploy on-premise or use our highly available cloud APIs with SOC2 compliance."
            icon={<Server className="text-primary" />}
            delay={0.3}
          />
        </BentoGrid>
      </MarketingSection>

      <DeepExtraction />
      <NLPComparison />
      <Integrations />
    </div>
  );
}

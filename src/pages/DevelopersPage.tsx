import { Terminal, Code, Globe2, ArrowRight } from 'lucide-react';
import { MarketingSection, SectionHeader } from '../components/ui/MarketingSection';
import { BentoGrid, BentoCard } from '../components/ui/BentoGrid';
import { SDKEcosystem } from '../components/marketing/SDKEcosystem';
import { DeveloperQuickstart } from '../components/marketing/DeveloperQuickstart';
import { CommunityLinks } from '../components/marketing/CommunityLinks';
import { Link } from 'react-router-dom';

export function DevelopersPage() {
  return (
    <div className="pt-20">
      <MarketingSection background="gradient">
        <SectionHeader 
          title="Build the future of legal." 
          description="Access state-of-the-art legal models through a simple, elegant REST API. Start building in minutes with our official SDKs."
          badge="Developers"
        />

        <div className="mt-12 flex justify-center gap-4">
          <Link to="/register" className="px-8 py-4 rounded-xl text-sm font-medium transition-all duration-300 glow-primary bg-[#E1E0CC] text-black hover:bg-white flex items-center gap-2">
            Get API Key <ArrowRight size={16} />
          </Link>
          <Link to="/documentation" className="px-8 py-4 rounded-xl text-sm font-medium transition-colors border hover:bg-white/5 flex items-center gap-2" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}>
            Read the Docs
          </Link>
        </div>
      </MarketingSection>

      <MarketingSection background="black" borderTop>
        <div className="max-w-5xl mx-auto mb-24 rounded-2xl border bg-[#111111] overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center px-4 py-3 border-b bg-black/50" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="mx-auto text-xs font-mono" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>
              POST /v1/contracts/analyze
            </div>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
            <span style={{ color: '#FF7B72' }}>import</span> LexForge <span style={{ color: '#FF7B72' }}>from</span> <span style={{ color: '#A5D6FF' }}>'lexforge-node'</span>;<br/><br/>
            <span style={{ color: '#FF7B72' }}>const</span> client = <span style={{ color: '#FF7B72' }}>new</span> LexForge(process.env.LEXFORGE_API_KEY);<br/><br/>
            <span style={{ color: '#FF7B72' }}>const</span> response = <span style={{ color: '#FF7B72' }}>await</span> client.contracts.analyze(&#123;<br/>
            &nbsp;&nbsp;documentId: <span style={{ color: '#A5D6FF' }}>'doc_123'</span>,<br/>
            &nbsp;&nbsp;focus: [<span style={{ color: '#A5D6FF' }}>'indemnification'</span>, <span style={{ color: '#A5D6FF' }}>'liability_cap'</span>]<br/>
            &#125;);<br/><br/>
            console.log(response.findings);
          </div>
        </div>

        <BentoGrid>
          <BentoCard 
            title="REST API" 
            description="Predictable, resource-oriented URLs, accepting and returning JSON."
            icon={<Globe2 className="text-primary" />}
          />
          <BentoCard 
            title="Official SDKs" 
            description="Available for Node.js, Python, Go, and Java. Fully typed and documented."
            icon={<Code className="text-primary" />}
            delay={0.1}
          />
          <BentoCard 
            title="API Playground" 
            description="Test queries, inspect responses, and generate code snippets instantly."
            icon={<Terminal className="text-primary" />}
            delay={0.2}
          />
        </BentoGrid>
      </MarketingSection>

      <SDKEcosystem />
      <DeveloperQuickstart />
      <CommunityLinks />
    </div>
  );
}

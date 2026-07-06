import { Terminal, Book, Box } from 'lucide-react';
import { MarketingSection, SectionHeader } from '../components/ui/MarketingSection';

export function SDKsPage() {
  return (
    <div className="pt-20">
      <MarketingSection background="black">
        <SectionHeader 
          title="Official SDKs" 
          description="Build faster with officially supported client libraries for your favorite languages. Fully typed, documented, and open source."
          badge="Libraries"
        />

        <div className="mt-16 max-w-4xl mx-auto space-y-6">
          
          <div className="p-6 md:p-8 rounded-2xl border bg-[#111111] flex flex-col md:flex-row md:items-center justify-between gap-6" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Box className="text-yellow-400" size={24} />
                <h3 className="text-xl font-bold" style={{ color: '#E1E0CC' }}>Node.js / TypeScript</h3>
              </div>
              <p className="text-sm text-white/60">The official Node.js library for the LexForge API.</p>
            </div>
            <div className="flex items-center gap-4">
              <code className="px-4 py-2 rounded-lg bg-black/50 text-sm border font-mono" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                npm install lexforge-node
              </code>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-2xl border bg-[#111111] flex flex-col md:flex-row md:items-center justify-between gap-6" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Terminal className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold" style={{ color: '#E1E0CC' }}>Python</h3>
              </div>
              <p className="text-sm text-white/60">Python client for seamless integration with data pipelines.</p>
            </div>
            <div className="flex items-center gap-4">
              <code className="px-4 py-2 rounded-lg bg-black/50 text-sm border font-mono" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                pip install lexforge-ai
              </code>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-2xl border bg-[#111111] flex flex-col md:flex-row md:items-center justify-between gap-6" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Book className="text-cyan-400" size={24} />
                <h3 className="text-xl font-bold" style={{ color: '#E1E0CC' }}>Go</h3>
              </div>
              <p className="text-sm text-white/60">High-performance Go client for enterprise microservices.</p>
            </div>
            <div className="flex items-center gap-4">
              <code className="px-4 py-2 rounded-lg bg-black/50 text-sm border font-mono" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                go get github.com/lexforge/go-sdk
              </code>
            </div>
          </div>

        </div>
      </MarketingSection>
    </div>
  );
}

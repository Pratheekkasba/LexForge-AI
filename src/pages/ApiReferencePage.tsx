import { MarketingSection, SectionHeader } from '../components/ui/MarketingSection';

export function ApiReferencePage() {
  return (
    <div className="pt-20">
      <MarketingSection background="black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
          
          <aside className="w-full md:w-64 shrink-0 border-r" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
             <div className="sticky top-32 space-y-8 pr-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>API Reference</h3>
                  <ul className="space-y-3 text-sm">
                    <li><a href="#authentication" className="text-white/60 hover:text-white transition-colors">Authentication</a></li>
                    <li><a href="#rate-limits" className="text-white/60 hover:text-white transition-colors">Rate Limits</a></li>
                    <li><a href="#pagination" className="text-white/60 hover:text-white transition-colors">Pagination</a></li>
                    <li><a href="#errors" className="text-white/60 hover:text-white transition-colors">Errors</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>Endpoints</h3>
                  <ul className="space-y-3 text-sm">
                    <li><a href="#contracts" className="text-white/60 hover:text-white transition-colors">Contracts</a></li>
                    <li><a href="#research" className="text-white/60 hover:text-white transition-colors">Research</a></li>
                    <li><a href="#citations" className="text-white/60 hover:text-white transition-colors">Citations</a></li>
                  </ul>
                </div>
             </div>
          </aside>

          <main className="flex-1 max-w-3xl">
             <SectionHeader 
               title="API Reference" 
               description="The LexForge API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes."
               align="left"
             />

             <div className="space-y-24 mt-16">
               <section id="authentication">
                  <h2 className="text-2xl font-bold mb-4" style={{ color: '#E1E0CC' }}>Authentication</h2>
                  <p className="text-white/60 mb-6 leading-relaxed">
                    Authenticate your API requests by including your secret API key in the Authorization header. Do not share your secret keys in publicly accessible areas such as GitHub or client-side code.
                  </p>
                  <div className="p-4 rounded-xl bg-white/5 border font-mono text-sm mb-6" style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#E1E0CC' }}>
                    Authorization: Bearer lf_live_YOUR_SECRET_KEY
                  </div>
               </section>

               <section id="rate-limits">
                  <h2 className="text-2xl font-bold mb-4" style={{ color: '#E1E0CC' }}>Rate Limits</h2>
                  <p className="text-white/60 mb-6 leading-relaxed">
                    LexForge API uses token bucket algorithms for rate limiting. Limits are applied based on your current subscription tier. Exceeding these limits will result in a <code>429 Too Many Requests</code> response.
                  </p>
                  <div className="overflow-x-auto rounded-xl border bg-black/50" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                          <th className="p-4 font-semibold text-white/60">Tier</th>
                          <th className="p-4 font-semibold text-white/60">Requests / Min</th>
                          <th className="p-4 font-semibold text-white/60">Concurrent</th>
                        </tr>
                      </thead>
                      <tbody style={{ color: '#E1E0CC' }}>
                        <tr className="border-b border-white/5">
                          <td className="p-4">Free</td>
                          <td className="p-4">60</td>
                          <td className="p-4">2</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="p-4">Pro</td>
                          <td className="p-4">600</td>
                          <td className="p-4">10</td>
                        </tr>
                        <tr>
                          <td className="p-4">Enterprise</td>
                          <td className="p-4">10,000+</td>
                          <td className="p-4">Unlimited</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
               </section>

               <section id="contracts">
                  <h2 className="text-2xl font-bold mb-4" style={{ color: '#E1E0CC' }}>Contracts</h2>
                  <div className="pb-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 font-mono text-xs">POST</span>
                      <code className="text-[#E1E0CC]">/v1/contracts/analyze</code>
                    </div>
                    <p className="text-white/60 mb-6 leading-relaxed">Analyzes a legal document against specified focus areas.</p>
                    
                    <h4 className="text-sm font-semibold mb-3 mt-8" style={{ color: '#E1E0CC' }}>Body Parameters</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                        <div>
                          <code className="text-[#E1E0CC] text-sm bg-white/5 px-2 py-1 rounded">document_url</code>
                          <span className="ml-2 text-xs text-red-400">required</span>
                        </div>
                        <span className="text-sm text-white/40">string</span>
                      </div>
                      <div className="flex justify-between border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                        <div>
                          <code className="text-[#E1E0CC] text-sm bg-white/5 px-2 py-1 rounded">extraction_schema</code>
                          <span className="ml-2 text-xs text-white/40">optional</span>
                        </div>
                        <span className="text-sm text-white/40">object</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-semibold mb-3 mt-12" style={{ color: '#E1E0CC' }}>Example Request</h4>
                    <div className="rounded-xl border bg-black overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                      <div className="flex px-4 py-2 border-b bg-[#111111]" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                        <span className="text-xs font-mono text-white/60">Node.js</span>
                      </div>
                      <pre className="p-4 text-xs font-mono overflow-x-auto text-primary">
{`import { LexForge } from '@lexforge/sdk';

const lf = new LexForge({
  apiKey: process.env.LEXFORGE_API_KEY
});

const analysis = await lf.contracts.analyze({
  document_url: 'https://example.com/msa.pdf',
  extraction_schema: {
    indemnification: 'boolean',
    liability_cap: 'number'
  }
});

console.log(analysis);`}
                      </pre>
                    </div>
                  </div>
               </section>
             </div>
          </main>
        </div>
      </MarketingSection>
    </div>
  );
}

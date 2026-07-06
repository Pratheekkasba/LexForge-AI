import { Book, Code, Lock } from 'lucide-react';

export function DocumentationPage() {
  const endpoints = [
    {
      path: '/chat',
      method: 'POST',
      description: 'Stream conversational responses from LexForge LLM.',
      body: '{\n  "model": "lexforge-legal-v1",\n  "stream": true,\n  "messages": [\n    { "role": "user", "content": "..." }\n  ]\n}'
    },
    {
      path: '/contracts/analyze',
      method: 'POST',
      description: 'Extract risks and summaries from a legal contract.',
      body: '{\n  "model": "lexforge-legal-v1",\n  "document": "THIS AGREEMENT..."\n}'
    },
    {
      path: '/contracts/draft',
      method: 'POST',
      description: 'Draft standard legal clauses or full contracts from instructions.',
      body: '{\n  "model": "lexforge-legal-v1",\n  "instructions": "Draft a standard mutual NDA..."\n}'
    },
    {
      path: '/legal/summarize',
      method: 'POST',
      description: 'Summarize dense legal text for quick review.',
      body: '{\n  "model": "lexforge-legal-v1",\n  "text": "Long legal passage..."\n}'
    },
    {
      path: '/citations/extract',
      method: 'POST',
      description: 'Extract and validate legal citations from a brief.',
      body: '{\n  "model": "lexforge-legal-v1",\n  "document": "In Roe v. Wade..."\n}'
    },
    {
      path: '/research',
      method: 'POST',
      description: 'Perform deep legal research across precedents.',
      body: '{\n  "model": "lexforge-legal-v1",\n  "query": "What is the precedent for..."\n}'
    }
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-12">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight mb-4" style={{ color: '#E1E0CC' }}>API Documentation</h1>
        <p className="text-base" style={{ color: 'rgba(225, 224, 204, 0.7)' }}>
          Integrate LexForge AI directly into your applications using our secure REST API. 
          All endpoints support Server-Sent Events (SSE) for low-latency streaming.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Lock size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#E1E0CC' }}>Authentication</h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
            Authenticate your requests by including your API key in the Authorization header.
          </p>
          <pre className="p-4 rounded-xl bg-black/50 border text-xs font-mono overflow-x-auto" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}>
            Authorization: Bearer sk_live_...
          </pre>
        </div>

        <div className="p-6 rounded-2xl border" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Book size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#E1E0CC' }}>Base URL</h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
            All API requests should be made to our secure cloud functions gateway.
          </p>
          <pre className="p-4 rounded-xl bg-black/50 border text-xs font-mono overflow-x-auto" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}>
            https://api.lexforge.ai/v1
          </pre>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight border-b pb-4" style={{ color: '#E1E0CC', borderColor: 'rgba(255,255,255,0.08)' }}>Endpoints</h2>
        
        {endpoints.map((ep, i) => (
          <div key={i} className="rounded-2xl border overflow-hidden" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-bold font-mono">
                    {ep.method}
                  </span>
                  <span className="font-mono text-sm font-semibold" style={{ color: '#E1E0CC' }}>
                    {ep.path}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>{ep.description}</p>
              </div>
            </div>
            
            <div className="p-6 bg-black/30">
              <div className="flex items-center gap-2 mb-3">
                <Code size={14} style={{ color: 'rgba(225, 224, 204, 0.4)' }} />
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>Example Request</span>
              </div>
              <pre className="p-4 rounded-xl border border-white/5 text-xs font-mono overflow-x-auto" style={{ background: '#0a0a0a', color: '#DEDBC8' }}>
                {`curl -X POST https://api.lexforge.ai/v1${ep.path} \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '${ep.body}'`}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

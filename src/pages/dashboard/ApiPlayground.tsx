import { useState } from 'react';
import { Play, Loader2, Key, Server, TerminalSquare, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function ApiPlayground() {
  const {} = useAuth(); // Keeping hook if needed later, or remove entirely if not.
  const [endpoint, setEndpoint] = useState('/v1/chat/completions');
  const [requestBody, setRequestBody] = useState('{\n  "model": "gemini-2.5-flash",\n  "stream": false,\n  "messages": [\n    { "role": "user", "content": "What are the key elements of an NDA?" }\n  ]\n}');
  const [response, setResponse] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const endpoints = [
    { path: '/v1/chat/completions', name: 'Chat Completion', method: 'POST' },
    { path: '/contracts/analyze', name: 'Contract Analysis', method: 'POST' },
    { path: '/contracts/draft', name: 'Contract Drafting', method: 'POST' },
    { path: '/legal/summarize', name: 'Legal Summarization', method: 'POST' },
    { path: '/citations/extract', name: 'Citation Extraction', method: 'POST' },
    { path: '/research', name: 'Legal Research', method: 'POST' },
  ];

  const handleTest = async () => {
    try {
      setIsLoading(true);
      setError('');
      setResponse('');
      
      // Validate JSON
      let parsedBody;
      try {
        parsedBody = JSON.parse(requestBody);
      } catch (e) {
        throw new Error('Invalid JSON body');
      }

      if (!apiKey.trim()) {
        throw new Error('Please enter an API Key to test the engine.');
      }
      
      setResponse('Connecting to LexForge API Gateway...\n\n');
      
      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify(parsedBody)
      });
      
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
      
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: '#E1E0CC' }}>API Playground</h1>
        <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
          Test the LexForge API Gateway directly from your dashboard using your session token.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>
                  Endpoint
                </label>
                <div className="relative">
                  <Server size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                  <select
                    value={endpoint}
                    onChange={(e) => {
                      setEndpoint(e.target.value);
                      if (e.target.value === '/contracts/analyze') {
                        setRequestBody('{\n  "model": "gemini-2.5-flash",\n  "document": "THIS AGREEMENT is made this 1st day of..."\n}');
                      } else if (e.target.value === '/v1/chat/completions') {
                        setRequestBody('{\n  "model": "gemini-2.5-flash",\n  "stream": false,\n  "messages": [\n    { "role": "user", "content": "What are the key elements of an NDA?" }\n  ]\n}');
                      } else {
                        setRequestBody('{\n  "model": "gemini-2.5-flash"\n}');
                      }
                    }}
                    className="w-full pl-9 pr-4 py-2.5 bg-black/50 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors appearance-none"
                    style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}
                  >
                    {endpoints.map(ep => (
                      <option key={ep.path} value={ep.path}>{ep.method} {ep.path} - {ep.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>
                API Key
              </label>
              <input
                type="text"
                placeholder="sk_live_..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/50 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>
                  Request Body (JSON)
                </label>
                <span className="text-xs" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>Application/JSON</span>
              </div>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="w-full h-64 p-4 bg-black/50 border rounded-xl text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors resize-none"
                style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}
                spellCheck={false}
              />
            </div>

            <button
              onClick={handleTest}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 glow-primary disabled:opacity-50"
              style={{ background: '#E1E0CC', color: '#000' }}
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <><Play size={16} className="fill-black" /> Send Request</>}
            </button>
          </div>
          
          <div className="p-4 rounded-xl border flex items-start gap-3" style={{ borderColor: 'rgba(222, 219, 200, 0.1)', background: 'rgba(222, 219, 200, 0.03)' }}>
            <Key size={18} className="mt-0.5" style={{ color: 'rgba(225, 224, 204, 0.6)' }} />
            <div>
              <h4 className="text-sm font-medium mb-1" style={{ color: '#E1E0CC' }}>API Key Authentication</h4>
              <p className="text-xs" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                Paste the API key you generated from the API Keys page. The request will be sent securely to the local Gateway Engine (localhost:3000).
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border flex flex-col overflow-hidden" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="p-4 border-b flex items-center gap-2" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <TerminalSquare size={16} style={{ color: 'rgba(225, 224, 204, 0.6)' }} />
            <h3 className="text-sm font-medium" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>Response</h3>
          </div>
          <div className="flex-1 p-4 bg-black/50 overflow-y-auto min-h-[400px]">
            {error ? (
              <div className="flex items-center gap-2 text-red-400 text-sm p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                <AlertCircle size={16} />
                {error}
              </div>
            ) : response ? (
              <pre className="text-xs font-mono whitespace-pre-wrap" style={{ color: '#E1E0CC' }}>
                {response}
              </pre>
            ) : (
              <div className="h-full flex items-center justify-center text-sm" style={{ color: 'rgba(225, 224, 204, 0.3)' }}>
                Hit Send Request to see the Gateway response
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

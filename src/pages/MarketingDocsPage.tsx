import { MarketingSection } from '../components/ui/MarketingSection';
import { Link } from 'react-router-dom';

export function MarketingDocsPage() {
  const sections = [
    { id: 'quickstart', label: 'Quick Start' },
    { id: 'authentication', label: 'Authentication' },
    { id: 'endpoints', label: 'API Endpoints' },
    { id: 'rate-limits', label: 'Rate Limits' },
    { id: 'response-format', label: 'Response Format' },
    { id: 'error-handling', label: 'Error Handling' },
    { id: 'api-keys', label: 'API Keys' },
    { id: 'organizations', label: 'Organizations' },
    { id: 'usage-analytics', label: 'Usage Analytics' },
    { id: 'webhooks', label: 'Webhooks' },
    { id: 'security', label: 'Security' },
    { id: 'sdks', label: 'SDKs' },
    { id: 'best-practices', label: 'Best Practices' },
    { id: 'support', label: 'Support' }
  ];

  return (
    <div className="pt-20">
      <MarketingSection background="black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
          
          <aside className="w-full md:w-64 shrink-0 border-r" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
             <div className="sticky top-32 space-y-8 pr-6 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>Documentation</h3>
                  <ul className="space-y-3 text-sm">
                    {sections.map(sec => (
                      <li key={sec.id}>
                        <a href={'#' + sec.id} className="text-white/60 hover:text-white transition-colors">{sec.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
          </aside>

          <main className="flex-1 max-w-3xl pb-24">
             <div className="mb-16">
               <h1 className="text-4xl font-bold tracking-tight mb-4" style={{ color: '#E1E0CC' }}>
                 Build Intelligent Legal Applications
               </h1>
               <p className="text-xl leading-relaxed" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                 Welcome to the official documentation for LexForge AI. This guide helps developers integrate enterprise-grade legal AI into their applications using a secure, scalable API. Whether you're building legal assistants, contract analysis tools, compliance automation, or document intelligence systems, LexForge AI provides the infrastructure to get started quickly.
               </p>
             </div>

             <div className="space-y-16">
               <section id="quickstart">
                 <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ color: '#E1E0CC', borderColor: 'rgba(255,255,255,0.1)' }}>
                   Quick Start
                 </h2>
                 <p className="mb-4" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>
                   Getting started takes only a few minutes.
                 </p>
                 <h3 className="text-lg font-bold mb-3 mt-6" style={{ color: '#E1E0CC' }}>Step 1 — Create an Account</h3>
                 <p className="mb-4 text-sm" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>
                   Sign up for a LexForge AI account and create your first organization.
                 </p>
                 <h3 className="text-lg font-bold mb-3 mt-6" style={{ color: '#E1E0CC' }}>Step 2 — Generate an API Key</h3>
                 <p className="mb-4 text-sm" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>
                   Navigate to <strong>Dashboard → API Keys</strong>. Create a new secret key. Keep this key private.
                 </p>
                 <pre className="p-4 rounded-xl border bg-[#111111] font-mono text-sm mb-6" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(225, 224, 204, 0.8)' }}>
                   lf_live_xxxxxxxxxxxxxxxxxxxxxxxxx
                 </pre>
                 <h3 className="text-lg font-bold mb-3 mt-6" style={{ color: '#E1E0CC' }}>Step 3 — Install an SDK</h3>
                 <p className="mb-2 text-sm" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>JavaScript</p>
                 <pre className="p-4 rounded-xl border bg-[#111111] font-mono text-sm mb-4" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(225, 224, 204, 0.8)' }}>
                   npm install @lexforge/sdk
                 </pre>
                 <p className="mb-2 text-sm" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>Python</p>
                 <pre className="p-4 rounded-xl border bg-[#111111] font-mono text-sm mb-6" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(225, 224, 204, 0.8)' }}>
                   pip install lexforge
                 </pre>
                 <h3 className="text-lg font-bold mb-3 mt-6" style={{ color: '#E1E0CC' }}>Step 4 — Send Your First Request</h3>
                 <pre className="p-4 rounded-xl border bg-[#111111] font-mono text-sm mb-4" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(225, 224, 204, 0.8)' }}>
                   POST /v1/chat
                 </pre>
                 <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>
                   Congratulations! You've successfully integrated LexForge AI.
                 </p>
               </section>

               <section id="authentication">
                 <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ color: '#E1E0CC', borderColor: 'rgba(255,255,255,0.1)' }}>
                   Authentication
                 </h2>
                 <p className="mb-4 text-sm" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>
                   Every API request must include an Authorization header.
                 </p>
                 <pre className="p-4 rounded-xl border bg-[#111111] font-mono text-sm mb-4" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(225, 224, 204, 0.8)' }}>
                   Authorization: Bearer YOUR_API_KEY
                 </pre>
                 <p className="mb-4 text-sm" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>
                   Requests without authentication will return <code>401 Unauthorized</code>.
                 </p>
                 <h3 className="text-lg font-bold mb-3 mt-6" style={{ color: '#E1E0CC' }}>Base URL</h3>
                 <pre className="p-4 rounded-xl border bg-[#111111] font-mono text-sm" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(225, 224, 204, 0.8)' }}>
                   https://api.lexforge.ai/v1
                 </pre>
               </section>
               
               <section id="endpoints">
                 <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ color: '#E1E0CC', borderColor: 'rgba(255,255,255,0.1)' }}>
                   API Endpoints
                 </h2>
                 <div className="space-y-6">
                   {[
                     { name: 'AI Chat', desc: 'Generate conversational legal responses.', ep: 'POST /chat' },
                     { name: 'Contract Analysis', desc: 'Analyze legal agreements and identify risks.', ep: 'POST /contracts/analyze' },
                     { name: 'Contract Drafting', desc: 'Generate legal contracts from structured inputs.', ep: 'POST /contracts/draft' },
                     { name: 'Legal Summarization', desc: 'Summarize lengthy legal documents into concise insights.', ep: 'POST /legal/summarize' },
                     { name: 'Citation Extraction', desc: 'Extract legal citations and references from documents.', ep: 'POST /citations/extract' },
                     { name: 'Case Research', desc: 'Search and summarize relevant case information.', ep: 'POST /research' },
                     { name: 'Compliance Review', desc: 'Review documents against regulatory or organizational requirements.', ep: 'POST /compliance/check' }
                   ].map(endpoint => (
                     <div key={endpoint.name} className="p-6 rounded-xl border bg-black" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                       <h3 className="font-bold text-lg mb-2" style={{ color: '#E1E0CC' }}>{endpoint.name}</h3>
                       <p className="text-sm mb-4" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>{endpoint.desc}</p>
                       <pre className="p-3 rounded-lg border bg-[#111111] font-mono text-xs text-primary inline-block" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                         {endpoint.ep}
                       </pre>
                     </div>
                   ))}
                 </div>
               </section>

               <section id="rate-limits">
                 <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ color: '#E1E0CC', borderColor: 'rgba(255,255,255,0.1)' }}>
                   Rate Limits
                 </h2>
                 <p className="mb-6 text-sm" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>
                   Every plan includes request limits to ensure platform stability. When a limit is exceeded, the API returns <code>429 Too Many Requests</code>.
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className="p-6 rounded-xl border bg-[#111111]" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                     <h3 className="font-bold mb-3" style={{ color: '#E1E0CC' }}>Starter</h3>
                     <ul className="text-sm space-y-2" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                       <li>• Standard request limits</li>
                       <li>• Basic throughput</li>
                     </ul>
                   </div>
                   <div className="p-6 rounded-xl border bg-[#111111]" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                     <h3 className="font-bold mb-3 text-primary">Professional</h3>
                     <ul className="text-sm space-y-2" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                       <li>• Higher throughput</li>
                       <li>• Priority processing</li>
                     </ul>
                   </div>
                   <div className="p-6 rounded-xl border bg-[#111111]" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                     <h3 className="font-bold mb-3" style={{ color: '#E1E0CC' }}>Enterprise</h3>
                     <ul className="text-sm space-y-2" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                       <li>• Custom limits</li>
                       <li>• Dedicated infrastructure</li>
                       <li>• SLA support</li>
                     </ul>
                   </div>
                 </div>
               </section>

               <section id="response-format">
                 <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ color: '#E1E0CC', borderColor: 'rgba(255,255,255,0.1)' }}>
                   Response Format
                 </h2>
                 <p className="mb-4 text-sm" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>
                   Every successful response follows a consistent JSON structure.
                 </p>
                 <pre className="p-4 rounded-xl border bg-[#111111] font-mono text-sm overflow-x-auto text-primary" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
{`{
  "success": true,
  "requestId": "...",
  "data": {},
  "usage": {},
  "model": "...",
  "createdAt": "..."
}`}
                 </pre>
               </section>

               <section id="error-handling">
                 <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ color: '#E1E0CC', borderColor: 'rgba(255,255,255,0.1)' }}>
                   Error Handling
                 </h2>
                 <p className="mb-4 text-sm" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>
                   Standard HTTP status codes are used to indicate the success or failure of an API request.
                 </p>
                 <div className="overflow-x-auto rounded-xl border bg-black/50" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <table className="w-full text-left text-sm">
                      <tbody style={{ color: '#E1E0CC' }}>
                        {[
                          ['400', 'Bad Request'], ['401', 'Unauthorized'], ['403', 'Forbidden'],
                          ['404', 'Not Found'], ['409', 'Conflict'], ['422', 'Validation Error'],
                          ['429', 'Rate Limit Exceeded'], ['500', 'Internal Server Error'], ['503', 'Service Unavailable']
                        ].map(([code, desc]) => (
                          <tr key={code} className="border-b border-white/5 last:border-0">
                            <td className="p-4 font-mono text-primary w-24">{code}</td>
                            <td className="p-4" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>{desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
               </section>

               <section id="api-keys">
                 <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ color: '#E1E0CC', borderColor: 'rgba(255,255,255,0.1)' }}>
                   API Keys & Security
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                     <h3 className="font-bold text-lg mb-3" style={{ color: '#E1E0CC' }}>API Keys</h3>
                     <p className="mb-4 text-sm" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>
                       Each organization can create multiple API keys.
                     </p>
                     <ul className="text-sm space-y-2 list-disc pl-5" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                       <li>Rotate keys regularly.</li>
                       <li>Never expose keys in client-side code.</li>
                       <li>Use different keys for development and production.</li>
                       <li>Revoke compromised keys immediately.</li>
                     </ul>
                   </div>
                   <div>
                     <h3 className="font-bold text-lg mb-3" style={{ color: '#E1E0CC' }}>Platform Security</h3>
                     <p className="mb-4 text-sm" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>
                       Security is built into every layer of the platform.
                     </p>
                     <ul className="text-sm space-y-2 list-disc pl-5" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                       <li>Encrypted communication</li>
                       <li>Secure authentication</li>
                       <li>Role-based access control</li>
                       <li>Audit logging</li>
                       <li>Secret key management</li>
                       <li>Continuous monitoring</li>
                     </ul>
                   </div>
                 </div>
               </section>

               <section id="organizations">
                 <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ color: '#E1E0CC', borderColor: 'rgba(255,255,255,0.1)' }}>
                   Organizations & Analytics
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                     <h3 className="font-bold text-lg mb-3" style={{ color: '#E1E0CC' }}>Organizations</h3>
                     <p className="mb-4 text-sm" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>
                       Organizations allow teams to collaborate securely. Features include:
                     </p>
                     <ul className="text-sm space-y-2 list-disc pl-5" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                       <li>Team members</li>
                       <li>Role-based permissions</li>
                       <li>Shared billing & API usage</li>
                       <li>Centralized analytics & Audit logs</li>
                     </ul>
                   </div>
                   <div>
                     <h3 className="font-bold text-lg mb-3" style={{ color: '#E1E0CC' }}>Usage Analytics</h3>
                     <p className="mb-4 text-sm" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>
                       The dashboard provides detailed insights including:
                     </p>
                     <ul className="text-sm space-y-2 list-disc pl-5" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                       <li>Total API requests & Token usage</li>
                       <li>Monthly consumption & Usage trends</li>
                       <li>Error rates & Average latency</li>
                     </ul>
                   </div>
                 </div>
               </section>

               <section id="webhooks">
                 <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ color: '#E1E0CC', borderColor: 'rgba(255,255,255,0.1)' }}>
                   Webhooks
                 </h2>
                 <p className="mb-4 text-sm" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>
                   Receive real-time notifications for important events. Examples include:
                 </p>
                 <div className="flex flex-wrap gap-2 mt-4">
                   {['API key created', 'Subscription updated', 'Invoice paid', 'Usage threshold reached', 'Organization invited', 'Team member added'].map(tag => (
                     <span key={tag} className="px-3 py-1.5 rounded-lg border bg-black text-xs font-medium" style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(225, 224, 204, 0.8)' }}>
                       {tag}
                     </span>
                   ))}
                 </div>
               </section>

               <section id="sdks">
                 <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ color: '#E1E0CC', borderColor: 'rgba(255,255,255,0.1)' }}>
                   SDKs & Best Practices
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                     <h3 className="font-bold text-lg mb-3" style={{ color: '#E1E0CC' }}>Official SDKs</h3>
                     <p className="mb-4 text-sm" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>
                       Each SDK includes examples, typed interfaces, and production-ready helpers.
                     </p>
                     <div className="flex flex-wrap gap-2">
                       {['JavaScript', 'TypeScript', 'Python', 'Go', 'Java', 'C#', 'PHP', 'Ruby'].map(tag => (
                         <span key={tag} className="px-2 py-1 rounded border bg-black text-xs font-mono" style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(225, 224, 204, 0.6)' }}>
                           {tag}
                         </span>
                       ))}
                     </div>
                   </div>
                   <div>
                     <h3 className="font-bold text-lg mb-3" style={{ color: '#E1E0CC' }}>Best Practices</h3>
                     <ul className="text-sm space-y-2 list-disc pl-5" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                       <li>Store API keys securely.</li>
                       <li>Use server-side integrations whenever possible.</li>
                       <li>Implement retry logic with exponential backoff.</li>
                       <li>Monitor API usage regularly.</li>
                       <li>Validate inputs before sending requests.</li>
                       <li>Log request IDs for debugging.</li>
                     </ul>
                   </div>
                 </div>
               </section>

               <section id="support">
                 <div className="p-8 rounded-2xl border bg-[#111111] text-center" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                   <h2 className="text-2xl font-bold mb-4" style={{ color: '#E1E0CC' }}>Support & Updates</h2>
                   <p className="mb-6 text-sm max-w-lg mx-auto" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                     Our engineering team is committed to helping you build reliable legal AI applications with confidence. Stay informed through our changelog.
                   </p>
                   <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                     <Link to="/api" className="text-primary hover:underline">API Reference</Link>
                     <span className="text-white/20">•</span>
                     <Link to="/status" className="text-primary hover:underline">Status Page</Link>
                     <span className="text-white/20">•</span>
                     <Link to="/contact" className="text-primary hover:underline">Contact Sales</Link>
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

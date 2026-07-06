import { Lock, FileKey, ShieldAlert } from 'lucide-react';

export function EnterpriseSecurity() {
  return (
    <section className="py-24 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)', background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6" style={{ color: '#E1E0CC' }}>
              Your Data. Your Rules.<br />Zero Compromise.
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
              LexForge is fundamentally designed around the strict privacy requirements of top-tier legal organizations. We guarantee that your proprietary data is never used to train our base models.
            </p>
            <div className="space-y-6">
              {[
                { icon: Lock, title: 'Zero Data Retention', desc: 'Prompts and completions are immediately discarded after processing.' },
                { icon: FileKey, title: 'Bring Your Own Key (BYOK)', desc: 'Encrypt your fine-tuning datasets using your own KMS keys.' },
                { icon: ShieldAlert, title: 'SOC2 & HIPAA Certified', desc: 'Independently audited infrastructure meeting the highest global standards.' }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <feature.icon size={18} style={{ color: '#E1E0CC' }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-1" style={{ color: '#E1E0CC' }}>{feature.title}</h4>
                    <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-2xl opacity-50 blur-xl" />
             <div className="relative p-8 rounded-2xl border bg-[#111111] overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="absolute top-0 right-0 p-32 opacity-10 blur-3xl rounded-full bg-white/20 pointer-events-none" />
                <div className="flex items-center gap-2 mb-6 pb-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono tracking-widest text-green-400">SOC2 COMPLIANCE ACTIVE</span>
                </div>
                
                <div className="space-y-4 font-mono text-xs" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                  <div className="flex justify-between">
                    <span>Audit Log Status</span>
                    <span style={{ color: '#E1E0CC' }}>Recording</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VPC Peering</span>
                    <span style={{ color: '#E1E0CC' }}>Established</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Retention Policy</span>
                    <span style={{ color: '#E1E0CC' }}>0 Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Encryption at Rest</span>
                    <span style={{ color: '#E1E0CC' }}>AES-256</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

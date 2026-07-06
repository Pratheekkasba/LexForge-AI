import { Users2, Shield, History } from 'lucide-react';

export function AccessControl() {
  return (
    <section className="py-24 bg-black border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: '#E1E0CC' }}>
            Enterprise Governance.
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
            Complete control over your organization's API usage, access permissions, and billing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Role-Based Access (RBAC)', 
              desc: 'Granular permissions for Admins, Developers, and Viewers. Control exactly who can generate keys and view usage.',
              icon: Users2
            },
            { 
              title: 'Granular API Scopes', 
              desc: 'Issue specific API keys limited strictly to inference, fine-tuning, or read-only metrics.',
              icon: Shield
            },
            { 
              title: 'Immutable Audit Logs', 
              desc: 'Every key generation, rotation, and organizational setting change is logged securely for compliance reviews.',
              icon: History
            }
          ].map((feature) => (
            <div key={feature.title} className="p-8 rounded-2xl border bg-[#111111] hover:bg-white/5 transition-colors" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <feature.icon size={28} className="mb-6" style={{ color: '#E1E0CC' }} />
              <h3 className="font-bold text-lg mb-2" style={{ color: '#E1E0CC' }}>{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

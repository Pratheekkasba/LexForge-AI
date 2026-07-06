import { Check, Minus } from 'lucide-react';

export function FeatureMatrix() {
  const features = [
    { name: 'API Requests / Month', free: '10,000', pro: '1,000,000', enterprise: 'Unlimited' },
    { name: 'Max Context Window', free: '8k tokens', pro: '32k tokens', enterprise: '128k tokens' },
    { name: 'Concurrent Requests', free: '2', pro: '10', enterprise: 'Unlimited' },
    { name: 'SOC2 Compliance', free: false, pro: true, enterprise: true },
    { name: 'Zero Data Retention', free: false, pro: true, enterprise: true },
    { name: 'Custom Fine-tuning', free: false, pro: false, enterprise: true },
    { name: 'VPC Peering', free: false, pro: false, enterprise: true },
    { name: 'Dedicated Support SLA', free: false, pro: false, enterprise: true }
  ];

  return (
    <section className="py-24 bg-black border-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-16 text-center" style={{ color: '#E1E0CC' }}>
          Compare Plans
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <th className="p-4 font-semibold text-lg" style={{ color: '#E1E0CC' }}>Features</th>
                <th className="p-4 font-semibold text-lg text-center" style={{ color: '#E1E0CC' }}>Free</th>
                <th className="p-4 font-semibold text-lg text-center" style={{ color: '#E1E0CC' }}>Pro</th>
                <th className="p-4 font-semibold text-lg text-center" style={{ color: '#E1E0CC' }}>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
                <tr key={f.name} className="border-b hover:bg-white/5 transition-colors" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <td className="p-4 font-medium" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>{f.name}</td>
                  
                  {['free', 'pro', 'enterprise'].map((tier) => (
                    <td key={tier} className="p-4 text-center">
                      {typeof f[tier as keyof typeof f] === 'boolean' ? (
                        f[tier as keyof typeof f] ? (
                          <Check size={18} className="mx-auto text-primary" />
                        ) : (
                          <Minus size={18} className="mx-auto text-white/20" />
                        )
                      ) : (
                        <span className="text-sm font-mono" style={{ color: '#E1E0CC' }}>{f[tier as keyof typeof f]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

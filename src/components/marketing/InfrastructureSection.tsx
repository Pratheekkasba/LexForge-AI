import { Server, Activity, Globe2, ShieldCheck } from 'lucide-react';

export function InfrastructureSection() {
  const stats = [
    { title: 'Global Points of Presence', value: '32+', icon: Globe2 },
    { title: 'Inference Latency', value: '<50ms', icon: Activity },
    { title: 'Uptime SLA', value: '99.99%', icon: Server },
    { title: 'Compliance Standards', value: 'SOC2 Type II', icon: ShieldCheck }
  ];

  return (
    <section className="py-24 bg-black border-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold tracking-tight mb-6" style={{ color: '#E1E0CC' }}>
              Global infrastructure, built for legal workloads.
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
              LexForge operates its own dedicated inference clusters optimized specifically for long-context reasoning. We bypass standard cloud providers to ensure zero data retention and maximum performance for massive legal documents.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.title} className="p-4 rounded-xl border bg-[#111111]" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <stat.icon size={20} className="mb-3" style={{ color: '#E1E0CC' }} />
                  <p className="text-2xl font-bold mb-1" style={{ color: '#E1E0CC' }}>{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>{stat.title}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
             <div className="relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
               <img 
                 src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000" 
                 alt="Server Infrastructure" 
                 className="rounded-[23px] grayscale opacity-80"
               />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

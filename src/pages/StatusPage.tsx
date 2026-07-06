import { CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function StatusPage() {
  const systems = [
    { name: 'API Gateway', status: 'operational', uptime: '99.99%' },
    { name: 'LLM Orchestration', status: 'operational', uptime: '99.95%' },
    { name: 'Web Dashboard', status: 'operational', uptime: '99.99%' },
    { name: 'Database & Storage', status: 'operational', uptime: '99.99%' },
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 tracking-tight" style={{ color: '#E1E0CC' }}>System Status</h1>
          <p className="text-lg mb-8" style={{ color: 'rgba(225, 224, 204, 0.7)' }}>
            Real-time information about LexForge AI services.
          </p>
          
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border bg-green-500/10 border-green-500/20">
            <CheckCircle2 size={24} className="text-green-400" />
            <span className="font-medium text-lg text-green-400">All Systems Operational</span>
          </div>
        </div>

        <div className="rounded-2xl border overflow-hidden" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)' }}>
          {systems.map((system, i) => (
            <motion.div 
              key={system.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b last:border-0"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div>
                <h3 className="font-semibold text-lg" style={{ color: '#E1E0CC' }}>{system.name}</h3>
                <p className="text-sm mt-1" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>90 day uptime: {system.uptime}</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                {system.status === 'operational' ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-subtle" />
                    <span className="text-sm font-medium text-green-400">Operational</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={14} className="text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">Degraded</span>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-8 rounded-2xl border text-center" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)' }}>
          <h3 className="font-semibold mb-2" style={{ color: '#E1E0CC' }}>Past Incidents</h3>
          <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>No incidents reported in the last 30 days.</p>
        </div>
      </div>
    </div>
  );
}

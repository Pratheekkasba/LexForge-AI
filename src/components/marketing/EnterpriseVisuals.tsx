import { Network, Server, Shield, Database, Lock } from 'lucide-react';

export function DedicatedInfraVisual() {
  return (
    <div className="w-full h-full bg-[#111111] rounded-2xl relative overflow-hidden flex items-center justify-center border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10 w-3/4">
        <div className="border rounded-xl bg-black p-4 mb-4 flex justify-between items-center shadow-2xl" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="flex items-center gap-3">
            <Server size={18} style={{ color: 'rgba(225, 224, 204, 0.6)' }} />
            <span className="text-sm font-mono" style={{ color: '#E1E0CC' }}>VPC Peering</span>
          </div>
          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">Active</span>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 border rounded-xl bg-black p-4 shadow-2xl flex flex-col items-center justify-center text-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <Network size={20} className="mb-2" style={{ color: 'rgba(225, 224, 204, 0.6)' }} />
            <span className="text-xs font-mono" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>Dedicated Node A</span>
          </div>
          <div className="flex-1 border rounded-xl bg-black p-4 shadow-2xl flex flex-col items-center justify-center text-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <Network size={20} className="mb-2" style={{ color: 'rgba(225, 224, 204, 0.6)' }} />
            <span className="text-xs font-mono" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>Dedicated Node B</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComplianceVisual() {
  return (
    <div className="w-full h-full bg-[#111111] rounded-2xl relative overflow-hidden flex items-center justify-center border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 rounded-full blur-[60px]" />
      <div className="relative z-10 grid grid-cols-2 gap-4 w-3/4">
        {['SOC2 Type II', 'HIPAA', 'GDPR', 'ISO 27001'].map(cert => (
          <div key={cert} className="border rounded-xl bg-black p-4 flex flex-col items-center justify-center text-center shadow-xl" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <Shield size={24} className="mb-2 text-primary" />
            <span className="text-xs font-bold tracking-widest" style={{ color: '#E1E0CC' }}>{cert}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FineTuningVisual() {
  return (
    <div className="w-full h-full bg-[#111111] rounded-2xl relative overflow-hidden flex items-center justify-center border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none z-0" />
      <div className="w-3/4 z-10 flex flex-col items-center relative">
        <div className="flex gap-8 mb-6">
          <div className="w-16 h-16 border rounded-2xl bg-black flex flex-col items-center justify-center shadow-xl z-10" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <Database size={20} className="mb-1" style={{ color: '#E1E0CC' }} />
            <span className="text-[10px] font-mono" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>Data</span>
          </div>
          <div className="w-16 h-16 border rounded-2xl bg-black flex flex-col items-center justify-center shadow-xl z-10" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <Lock size={20} className="mb-1" style={{ color: '#E1E0CC' }} />
            <span className="text-[10px] font-mono" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>KMS Key</span>
          </div>
        </div>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-primary mb-6" />
        <div className="w-48 p-4 border rounded-2xl bg-primary/10 border-primary/30 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 animate-pulse" />
          <span className="text-sm font-bold relative z-10 text-primary mb-1">Custom Model</span>
          <span className="text-xs font-mono relative z-10 text-primary/60">lexforge-custom-v1</span>
        </div>
      </div>
    </div>
  );
}

export function SLAVisual() {
  return (
    <div className="w-full h-full bg-[#111111] rounded-2xl relative overflow-hidden flex items-center justify-center border p-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="w-full h-full flex flex-col justify-end relative">
        <div className="flex justify-between items-end h-full gap-2 opacity-50">
          {[40, 70, 45, 90, 65, 80, 50, 85, 60, 95].map((h, i) => (
            <div key={i} className="w-full bg-white/10 rounded-t-sm" style={{ height: h + '%' }} />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="px-6 py-4 border rounded-2xl bg-black shadow-2xl backdrop-blur-md text-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <span className="block text-4xl font-bold mb-1" style={{ color: '#E1E0CC' }}>99.999%</span>
            <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>Guaranteed Uptime</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SSOVisual() {
  return (
    <div className="w-full h-full bg-[#111111] rounded-2xl relative overflow-hidden flex items-center justify-center border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="relative z-10 w-3/4 max-w-[240px] space-y-3">
        {['Okta', 'Azure AD', 'Google Workspace'].map(provider => (
          <div key={provider} className="p-3 border rounded-xl bg-black flex items-center justify-between shadow-lg hover:border-white/20 transition-colors" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <span className="text-sm font-medium" style={{ color: '#E1E0CC' }}>{provider}</span>
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

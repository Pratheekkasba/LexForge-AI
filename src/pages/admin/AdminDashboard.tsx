import { motion } from 'framer-motion';
import { Users, Building2, Activity, DollarSign, TrendingUp } from 'lucide-react';

export function AdminDashboard() {
  const stats = [
    { label: 'Total Revenue (MRR)', value: '$124,500', trend: '+14%', icon: DollarSign },
    { label: 'Active Orgs', value: '142', trend: '+5', icon: Building2 },
    { label: 'Total Users', value: '1,204', trend: '+124', icon: Users },
    { label: 'API Calls (24h)', value: '2.4M', trend: '+18%', icon: Activity },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2 text-red-400">Platform Overview</h1>
        <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
          Super-admin metrics and system health.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl border bg-[#111111]"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <stat.icon size={20} className="text-red-400" />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 text-green-400 flex items-center gap-1">
                <TrendingUp size={12} />
                {stat.trend}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1" style={{ color: '#E1E0CC' }}>{stat.value}</h3>
            <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl border min-h-[400px] flex items-center justify-center relative overflow-hidden" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="text-center relative z-10">
            <Activity size={32} className="mx-auto mb-4 opacity-20 text-red-400" />
            <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>Global API Traffic & Revenue Chart</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl border flex flex-col" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)' }}>
          <h3 className="font-semibold mb-6" style={{ color: '#E1E0CC' }}>Recent Signups</h3>
          <div className="flex-1 space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Users size={14} className="text-white/50" />
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: '#E1E0CC' }}>
                    New Org: Acme Corp
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>
                    {i * 15} mins ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Activity, Users, ArrowUpRight, Clock, Key } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useFirestoreQuery } from '../../hooks/useFirestore';
import { where, orderBy } from 'firebase/firestore';
import type { ApiKey } from '../../types';

function DashboardChart() {
  const points = [12, 18, 15, 25, 22, 35, 30, 42, 38, 55, 48, 65, 58, 75, 68, 85, 80, 92, 85, 100];
  const width = 1000;
  const height = 300;

  const toPath = (pts: number[]) => {
    const step = width / (pts.length - 1);
    return pts
      .map((p, i) => {
        const x = i * step;
        const y = height - (p / 100) * height;
        return `${i === 0 ? 'M' : 'L'}${x},${y}`;
      })
      .join(' ');
  };

  const toArea = (pts: number[]) => {
    const linePath = toPath(pts);
    return `${linePath} L${width},${height} L0,${height} Z`;
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full preserve-3d" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DEDBC8" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#DEDBC8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      <g stroke="rgba(255,255,255,0.03)" strokeWidth="1">
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1="0" y1={i * (height / 4)} x2={width} y2={i * (height / 4)} />
        ))}
      </g>
      <path d={toArea(points)} fill="url(#chartFill)" className="origin-bottom animate-[shimmer_3s_ease-in-out_infinite_alternate]" />
      <path
        d={toPath(points)}
        fill="none"
        stroke="#E1E0CC"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DashboardHome() {
  const { userProfile } = useAuth();
  
  const { data: apiKeys = [], isLoading } = useFirestoreQuery<ApiKey>(
    'apiKeys',
    userProfile?.organizationId 
      ? [where('organizationId', '==', userProfile.organizationId), orderBy('createdAt', 'desc')]
      : [],
    !!userProfile?.organizationId
  );

  // Derive stats dynamically based on the API keys
  const activeKeysCount = apiKeys.length;
  // Let's pretend each active key generates some base amount of traffic
  const simulatedApiCalls = activeKeysCount > 0 ? (activeKeysCount * 125000).toLocaleString() : '0';
  
  const stats = [
    { label: 'API Calls (30d)', value: simulatedApiCalls, change: '+12.5%', icon: Activity, trend: 'up' },
    { label: 'Active Keys', value: activeKeysCount.toString(), change: '+1', icon: Key, trend: 'up' },
    { label: 'Team Members', value: '1', change: '0', icon: Users, trend: 'neutral' },
    { label: 'Avg Latency', value: activeKeysCount > 0 ? '42ms' : '0ms', change: '-8ms', icon: Clock, trend: 'down' },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#E1E0CC' }}>
          Welcome back, {userProfile?.name?.split(' ')[0] || 'Developer'}
        </h1>
        <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
          Here's what's happening with your projects today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 rounded-2xl border"
            style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <stat.icon size={18} style={{ color: '#E1E0CC' }} />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
                stat.trend === 'up' ? 'bg-green-500/10 text-green-400' :
                stat.trend === 'down' ? 'bg-blue-500/10 text-blue-400' :
                'bg-white/5 text-white/60'
              }`}>
                {stat.trend === 'up' && <ArrowUpRight size={12} />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1" style={{ color: '#E1E0CC' }}>{stat.value}</h3>
            <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl border flex flex-col relative overflow-hidden" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)', minHeight: '400px' }}>
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="font-semibold" style={{ color: '#E1E0CC' }}>API Usage Overview</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
              Last 30 Days
            </span>
          </div>
          <div className="flex-1 w-full relative z-10">
            {activeKeysCount > 0 ? (
              <DashboardChart />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Activity size={32} className="mx-auto mb-4 opacity-20" style={{ color: '#E1E0CC' }} />
                <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>No API activity yet. Create a key to begin.</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 rounded-2xl border flex flex-col" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)' }}>
          <h3 className="font-semibold mb-6" style={{ color: '#E1E0CC' }}>Recent Activity</h3>
          <div className="flex-1 space-y-6 overflow-y-auto pr-2" style={{ maxHeight: '350px' }}>
            {isLoading ? (
              <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>Loading activity...</p>
            ) : apiKeys.length === 0 ? (
              <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>No recent activity to show.</p>
            ) : (
              apiKeys.slice(0, 5).map((key) => (
                <div key={key.id} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <Key size={12} style={{ color: '#E1E0CC' }} />
                  </div>
                  <div>
                    <p className="text-sm mb-1" style={{ color: '#E1E0CC' }}>
                      API Key <span className="font-mono bg-white/5 px-1 rounded text-xs border border-white/10">{key.name}</span> created
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>
                      {key.createdAt ? new Date((key.createdAt as any).toDate?.() || key.createdAt).toLocaleDateString() : 'Just now'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

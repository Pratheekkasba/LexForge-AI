import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Zap, Clock, CheckCircle, BarChart3, Shield, Key, List } from 'lucide-react';
import { WordsPullUp } from './animations';

const dashboardCards = [
  { label: 'API Requests', value: '2.4M', change: '+18.3%', icon: Activity, color: '#4ade80' },
  { label: 'Token Usage', value: '847K', change: '+12.1%', icon: Zap, color: '#facc15' },
  { label: 'Latency', value: '42ms', change: '-8.2%', icon: Clock, color: '#60a5fa' },
  { label: 'Success Rate', value: '99.97%', change: '+0.02%', icon: CheckCircle, color: '#4ade80' },
  { label: 'Monthly Usage', value: '14.2M', change: '+24.6%', icon: BarChart3, color: '#a78bfa' },
  { label: 'Rate Limits', value: '10K/min', change: 'Active', icon: Shield, color: '#f97316' },
  { label: 'API Keys', value: '12', change: '3 Active', icon: Key, color: '#DEDBC8' },
  { label: 'Recent Requests', value: '1,847', change: 'Last 1h', icon: List, color: '#ec4899' },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 md:pt-24"
      id="platform"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Background Subtle Noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay pointer-events-none" />
      
      {/* Soft spotlight, not a giant radial gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border shimmer"
            style={{
              background: 'rgba(222, 219, 200, 0.05)',
              borderColor: 'rgba(222, 219, 200, 0.15)',
              color: '#DEDBC8',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-subtle" />
            Powered by leading large language models
          </div>
        </motion.div>

        {/* Headline */}
        <div className="text-center mb-6">
          <WordsPullUp
            text="Legal AI Infrastructure"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95]"
          />
          <WordsPullUp
            text="Built for Modern Law."
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95] mt-1 md:mt-2"
            delay={0.3}
          />
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-10 text-sm sm:text-base md:text-lg leading-relaxed"
          style={{ color: 'rgba(225, 224, 204, 0.55)' }}
        >
          Deploy enterprise-grade legal intelligence with secure APIs, document analysis, contract review, legal research, compliance workflows, and intelligent automation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 md:mb-20"
        >
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium transition-colors duration-300"
            style={{ background: '#E1E0CC', color: '#000' }}
          >
            Get API Key
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={14} />
            </span>
          </Link>
          <Link
            to="/documentation"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium transition-colors duration-300 border"
            style={{
              color: '#E1E0CC',
              borderColor: 'rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.02)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
            }}
          >
            View Documentation
          </Link>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          id="api"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Dashboard container */}
          <div
            className="relative rounded-2xl md:rounded-3xl overflow-hidden border"
            style={{
              background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 100%)',
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            {/* Top bar */}
            <div
              className="flex items-center justify-between px-4 md:px-6 py-3 border-b"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <span className="text-xs font-medium" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>
                  dashboard.lexforge.ai
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-subtle" />
                <span className="text-[10px]" style={{ color: 'rgba(225, 224, 204, 0.3)' }}>
                  All systems operational
                </span>
              </div>
            </div>

            {/* Dashboard grid */}
            <div className="p-3 md:p-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                {dashboardCards.map((card, i) => (
                  <DashboardCard key={card.label} card={card} index={i} />
                ))}
              </div>

              {/* Chart area */}
              <div
                className="mt-3 md:mt-4 rounded-xl p-4 md:p-5 border"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.04)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium" style={{ color: 'rgba(225, 224, 204, 0.5)' }}>
                    API Request Volume — Last 7 Days
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: '#DEDBC8' }} />
                      <span className="text-[10px]" style={{ color: 'rgba(225, 224, 204, 0.3)' }}>Requests</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(222, 219, 200, 0.3)' }} />
                      <span className="text-[10px]" style={{ color: 'rgba(225, 224, 204, 0.3)' }}>Tokens</span>
                    </div>
                  </div>
                </div>
                <MiniChart />
              </div>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div
            className="absolute -bottom-1 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, #000000 0%, transparent 100%)',
            }}
          />
        </motion.div>
      </div>

      {/* Bottom gradient section divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #000000 0%, transparent 100%)',
        }}
      />
    </section>
  );
}

function DashboardCard({ card, index }: { card: typeof dashboardCards[0]; index: number }) {
  const Icon = card.icon;
  const isPositive = card.change.startsWith('+') || card.change === 'Active' || card.change.includes('Active');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1 + index * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="rounded-xl p-3 md:p-4 border transition-all duration-500 group cursor-default"
      style={{
        background: 'rgba(255,255,255,0.02)',
        borderColor: 'rgba(255,255,255,0.04)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(222, 219, 200, 0.12)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
      }}
    >
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <Icon size={14} style={{ color: card.color }} className="opacity-70 group-hover:opacity-100 transition-opacity" />
        <span
          className="text-[9px] md:text-[10px] font-medium px-1.5 py-0.5 rounded-full"
          style={{
            color: isPositive ? '#4ade80' : '#60a5fa',
            background: isPositive ? 'rgba(74, 222, 128, 0.1)' : 'rgba(96, 165, 250, 0.1)',
          }}
        >
          {card.change}
        </span>
      </div>
      <p className="text-lg md:text-xl font-bold leading-none mb-0.5" style={{ color: '#E1E0CC' }}>
        {card.value}
      </p>
      <p className="text-[10px] md:text-xs" style={{ color: 'rgba(225, 224, 204, 0.35)' }}>
        {card.label}
      </p>
    </motion.div>
  );
}

function MiniChart() {
  const points = [20, 35, 28, 45, 38, 55, 48, 62, 52, 70, 58, 75, 65, 80, 72, 85, 78, 90, 82, 88];
  const points2 = points.map((p) => p * 0.6 + 10);
  const width = 800;
  const height = 80;

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
    const step = width / (pts.length - 1);
    const linePath = pts
      .map((p, i) => {
        const x = i * step;
        const y = height - (p / 100) * height;
        return `${i === 0 ? 'M' : 'L'}${x},${y}`;
      })
      .join(' ');
    return `${linePath} L${width},${height} L0,${height} Z`;
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16 md:h-20">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DEDBC8" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#DEDBC8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="chartGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DEDBC8" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#DEDBC8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={toArea(points)} fill="url(#chartGrad)" />
      <path d={toArea(points2)} fill="url(#chartGrad2)" />
      <path
        d={toPath(points)}
        fill="none"
        stroke="#DEDBC8"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d={toPath(points2)}
        fill="none"
        stroke="#DEDBC8"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.2"
      />
    </svg>
  );
}

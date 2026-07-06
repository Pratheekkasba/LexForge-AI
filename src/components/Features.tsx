import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Shield, Lock, UserCheck, FileText, Search,
  Code2, Webhook, BookOpen, BarChart3,
  Globe, Gauge, AlertTriangle, MonitorCheck,
  Scale, FileSearch, Gavel, ClipboardCheck, Quote,
} from 'lucide-react';
import { WordsPullUpMultiStyle } from './animations';

const features = [
  {
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and compliance infrastructure built for the most demanding legal environments.',
    icon: Shield,
    color: '#4ade80',
    items: [
      { icon: Lock, label: 'Encrypted infrastructure', desc: 'AES-256 encryption at rest and in transit' },
      { icon: UserCheck, label: 'Role-based access', desc: 'Granular RBAC with SSO integration' },
      { icon: Shield, label: 'API authentication', desc: 'OAuth 2.0, API keys, JWT tokens' },
      { icon: FileText, label: 'Audit logs', desc: 'Comprehensive activity tracking' },
    ],
  },
  {
    title: 'Legal Intelligence',
    description: 'AI-powered legal workflows that understand context, precedent, and nuance.',
    icon: Scale,
    color: '#a78bfa',
    items: [
      { icon: FileSearch, label: 'Contract review', desc: 'Automated clause analysis and risk detection' },
      { icon: FileText, label: 'Legal summarization', desc: 'Distill complex documents into key points' },
      { icon: Gavel, label: 'Case research', desc: 'Intelligent precedent and citation discovery' },
      { icon: ClipboardCheck, label: 'Compliance assistance', desc: 'Regulatory compliance checking' },
      { icon: Quote, label: 'Citation extraction', desc: 'Automatic reference identification' },
    ],
  },
  {
    title: 'Developer Experience',
    description: 'First-class developer tooling designed for rapid integration and iteration.',
    icon: Code2,
    color: '#60a5fa',
    items: [
      { icon: Code2, label: 'REST API', desc: 'Clean, intuitive RESTful endpoints' },
      { icon: BookOpen, label: 'SDKs', desc: 'Python, Node.js, Go, Java SDKs' },
      { icon: Webhook, label: 'Webhook support', desc: 'Real-time event notifications' },
      { icon: FileText, label: 'OpenAPI documentation', desc: 'Interactive API explorer' },
      { icon: BarChart3, label: 'Usage analytics', desc: 'Detailed usage and cost tracking' },
    ],
  },
  {
    title: 'Production Reliability',
    description: 'Enterprise-grade infrastructure engineered for critical legal workloads.',
    icon: MonitorCheck,
    color: '#f97316',
    items: [
      { icon: MonitorCheck, label: '99.9% uptime SLA', desc: 'Guaranteed availability with credits' },
      { icon: Globe, label: 'Global edge routing', desc: 'Low-latency worldwide delivery' },
      { icon: Gauge, label: 'Rate limiting', desc: 'Configurable request throttling' },
      { icon: Search, label: 'Monitoring', desc: 'Real-time health dashboards' },
      { icon: AlertTriangle, label: 'Error reporting', desc: 'Automatic alerting and diagnostics' },
    ],
  },
];

export function Features() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="developers">
      {/* Background noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.08] pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(222, 219, 200, 0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Everything your legal team needs.', className: '' },
            ]}
            containerClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-4"
          />
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Secure. Intelligent. Production-ready.', className: 'text-gray-500' },
            ]}
            containerClassName="text-lg sm:text-xl md:text-2xl font-normal leading-[1.2]"
            delay={0.3}
          />
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = feature.icon;

  return (
    <motion.div
      id={feature.title === 'Developer Experience' ? 'docs' : undefined}
      ref={ref}
      initial={{ opacity: 0, y: 25, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative rounded-2xl border p-6 md:p-8 transition-all duration-700 card-glow"
      style={{
        background: '#111111',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.background = '#141414';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.background = '#111111';
      }}
    >
      {/* Icon + Title */}
      <div className="flex items-start gap-4 mb-5">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl transition-transform duration-500 group-hover:scale-110"
          style={{
            background: `${feature.color}10`,
            border: `1px solid ${feature.color}20`,
          }}
        >
          <Icon size={18} style={{ color: feature.color }} />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1" style={{ color: '#E1E0CC' }}>
            {feature.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>
            {feature.description}
          </p>
        </div>
      </div>

      {/* Feature items */}
      <div className="space-y-2.5 ml-14">
        {feature.items.map((item, i) => {
          const ItemIcon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: index * 0.12 + 0.3 + i * 0.06,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-start gap-3 group/item"
            >
              <ItemIcon
                size={14}
                className="mt-0.5 flex-shrink-0 opacity-50 group-hover/item:opacity-80 transition-opacity"
                style={{ color: '#DEDBC8' }}
              />
              <div>
                <span className="text-sm font-medium" style={{ color: 'rgba(225, 224, 204, 0.75)' }}>
                  {item.label}
                </span>
                <span className="text-sm ml-2" style={{ color: 'rgba(225, 224, 204, 0.3)' }}>
                  — {item.desc}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Hover glow accent */}
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle, ${feature.color}08 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

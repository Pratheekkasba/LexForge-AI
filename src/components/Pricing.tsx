import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { WordsPullUpMultiStyle } from './animations';

const plans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/month',
    description: 'For small teams getting started with legal AI.',
    badge: null,
    features: [
      { label: '10,000 monthly requests', included: true },
      { label: 'Email support', included: true },
      { label: '100 req/min rate limit', included: true },
      { label: 'REST API access', included: true },
      { label: 'Basic analytics', included: true },
      { label: 'Single API key', included: true },
    ],
    cta: 'Get Started',
    highlighted: false,
    color: '#DEDBC8',
  },
  {
    name: 'Professional',
    price: '$199',
    period: '/month',
    description: 'For growing teams that need more power and support.',
    badge: 'Most Popular',
    features: [
      { label: '100,000 monthly requests', included: true },
      { label: 'Priority support (24h)', included: true },
      { label: '1,000 req/min rate limit', included: true },
      { label: 'Full API + SDK access', included: true },
      { label: 'Advanced analytics', included: true },
      { label: 'Up to 10 API keys', included: true },
      { label: 'Webhook integrations', included: true },
      { label: 'Custom models', included: true },
    ],
    cta: 'Get API Key',
    highlighted: true,
    color: '#E1E0CC',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with advanced security and compliance needs.',
    badge: null,
    features: [
      { label: 'Unlimited monthly requests', included: true },
      { label: 'Dedicated support + SLA', included: true },
      { label: 'Custom rate limits', included: true },
      { label: 'Full API + SDK + SSO', included: true },
      { label: 'Enterprise analytics', included: true },
      { label: 'Unlimited API keys', included: true },
      { label: 'On-premise deployment', included: true },
      { label: 'Custom model training', included: true },
      { label: 'Audit logs + compliance', included: true },
    ],
    cta: 'Contact Sales',
    highlighted: false,
    color: '#DEDBC8',
  },
];

export function Pricing({ onSubscribe, loadingTier }: { onSubscribe?: (tier: string) => void, loadingTier?: string | null }) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="pricing">
      {/* Subtle top line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(222, 219, 200, 0.1), transparent)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Simple, transparent pricing.', className: '' },
            ]}
            containerClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-4"
          />
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Start free. Scale as you grow.', className: 'text-gray-500' },
            ]}
            containerClassName="text-lg sm:text-xl md:text-2xl font-normal leading-[1.2]"
            delay={0.3}
          />
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-3 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} onSubscribe={onSubscribe} loadingTier={loadingTier} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { Loader2 } from 'lucide-react';

function PricingCard({ plan, index, onSubscribe, loadingTier }: { plan: (typeof plans)[0]; index: number; onSubscribe?: (tier: string) => void; loadingTier?: string | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      id={plan.name.toLowerCase()}
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative rounded-2xl border p-6 md:p-8 flex flex-col transition-all duration-500 ${
        plan.highlighted ? 'card-glow' : ''
      }`}
      style={{
        background: plan.highlighted
          ? 'linear-gradient(180deg, #191919 0%, #111111 100%)'
          : '#111111',
        borderColor: plan.highlighted
          ? 'rgba(222, 219, 200, 0.15)'
          : 'rgba(255,255,255,0.06)',
      }}
    >
      {/* Badge */}
      {plan.badge && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: '#E1E0CC',
            color: '#000',
          }}
        >
          <Sparkles size={10} />
          {plan.badge}
        </div>
      )}

      {/* Plan name */}
      <h3 className="text-base font-medium mb-2" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
        {plan.name}
      </h3>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-4xl md:text-5xl font-bold" style={{ color: '#E1E0CC' }}>
          {plan.price}
        </span>
        {plan.period && (
          <span className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.3)' }}>
            {plan.period}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(225, 224, 204, 0.35)' }}>
        {plan.description}
      </p>

      {/* Divider */}
      <div className="h-px w-full mb-6" style={{ background: 'rgba(255,255,255,0.06)' }} />

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-grow">
        {plan.features.map((feature) => (
          <li key={feature.label} className="flex items-start gap-2.5">
            <Check
              size={14}
              className="mt-0.5 flex-shrink-0"
              style={{ color: plan.highlighted ? '#4ade80' : 'rgba(222, 219, 200, 0.4)' }}
            />
            <span className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
              {feature.label}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      {onSubscribe ? (
        <button
          onClick={() => onSubscribe(plan.name)}
          disabled={loadingTier !== null}
          className={`group w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-500 disabled:opacity-70 ${
            plan.highlighted ? 'glow-primary glow-primary-hover' : ''
          }`}
          style={
            plan.highlighted
              ? { background: '#E1E0CC', color: '#000' }
              : {
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(225, 224, 204, 0.7)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }
          }
        >
          {loadingTier === plan.name ? <Loader2 size={16} className="animate-spin" /> : plan.cta}
          {loadingTier !== plan.name && <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />}
        </button>
      ) : (
        <a
          href="#get-api-key"
          className={`group w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-500 ${
            plan.highlighted ? 'glow-primary glow-primary-hover' : ''
          }`}
          style={
            plan.highlighted
              ? { background: '#E1E0CC', color: '#000' }
              : {
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(225, 224, 204, 0.7)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }
          }
        >
          {plan.cta}
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      )}

      {/* Highlight glow */}
      {plan.highlighted && (
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-40 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(222, 219, 200, 0.06) 0%, transparent 70%)',
          }}
        />
      )}
    </motion.div>
  );
}

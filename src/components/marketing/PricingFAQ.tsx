import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: 'How are tokens counted for pricing?', a: 'We bill based on total tokens processed (input + output). Our proprietary legal tokenizer is roughly 20% more efficient than standard BPE tokenizers on complex legal language.' },
    { q: 'What happens if I exceed my monthly limit?', a: 'For Pro users, we softly cap requests and send email alerts. You can enable automatic overage billing in your dashboard to prevent service interruption.' },
    { q: 'Do you train models on my data?', a: 'No. Paid tiers (Pro and Enterprise) strictly opt-out of data retention and training. Free tier data may be retained for 30 days for abuse monitoring but is never used for training.' },
    { q: 'What is included in the Enterprise SLA?', a: 'Enterprise plans include 99.999% uptime guarantees, 24/7 phone support, a dedicated technical account manager, and prioritized inference routing.' }
  ];

  return (
    <section className="py-24 bg-[#111111]">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center" style={{ color: '#E1E0CC' }}>
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border bg-black overflow-hidden transition-colors hover:border-white/20" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <button 
                className="w-full p-6 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-bold text-lg" style={{ color: '#E1E0CC' }}>{faq.q}</span>
                {openIndex === i ? <Minus size={20} className="text-white/40" /> : <Plus size={20} className="text-white/40" />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm leading-relaxed" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

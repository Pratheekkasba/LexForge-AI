import { X, Check } from 'lucide-react';

export function NLPComparison() {
  return (
    <section className="py-24 bg-[#111111] border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: '#E1E0CC' }}>
            Beyond Traditional NLP.
          </h2>
          <p className="text-lg" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
            Legacy legal tech relies on fragile regular expressions and brittle NLP pipelines. LexForge leverages state-of-the-art transformer architecture for true semantic understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl border bg-black/50" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
            <h3 className="text-xl font-bold mb-6 text-red-400">Legacy Systems</h3>
            <ul className="space-y-4">
              {[
                'Fragile keyword matching',
                'Fails on non-standard phrasing',
                'Requires massive manual training data',
                'Cannot understand context or implied obligations',
                'High false-positive rates'
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <X size={18} className="text-red-400 mt-0.5 shrink-0" />
                  <span className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-2xl border bg-[#111111] relative overflow-hidden" style={{ borderColor: 'rgba(222, 219, 200, 0.2)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <h3 className="text-xl font-bold mb-6" style={{ color: '#E1E0CC' }}>LexForge Intelligence</h3>
            <ul className="space-y-4 relative z-10">
              {[
                'True semantic understanding of legal intent',
                'Adapts to novel phrasing instantly',
                'Zero-shot extraction out of the box',
                'Understands complex multi-party obligations',
                '99.9% accuracy on standard commercial clauses'
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <Check size={18} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-sm" style={{ color: '#E1E0CC' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

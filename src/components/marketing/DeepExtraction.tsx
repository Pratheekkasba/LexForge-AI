import { Code2, Braces, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function DeepExtraction() {
  return (
    <section className="py-24 bg-black border-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: '#E1E0CC' }}>
            Unprecedented Contract Extraction.
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
            LexForge doesn't just keyword match. Our fine-tuned models understand legal nuance, returning structured, typed JSON ready for your database.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="p-8 rounded-2xl border bg-[#111111] flex flex-col" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2 mb-6 text-sm font-medium" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
              <Code2 size={16} /> Raw Unstructured Text (Input)
            </div>
            <p className="font-serif text-lg leading-relaxed mb-8 italic" style={{ color: '#E1E0CC' }}>
              "The Service Provider shall indemnify and hold harmless the Client and its affiliates from and against any and all losses, damages, liabilities, and expenses arising out of any third-party claim alleging that the Services infringe any intellectual property rights. Liability under this section is capped at $5,000,000."
            </p>
            <div className="mt-auto">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary animate-pulse" />
                <span className="text-sm font-medium" style={{ color: '#E1E0CC' }}>Processing via LexForge API</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                <motion.div 
                  className="h-full bg-primary rounded-full"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl border bg-black flex flex-col" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2 mb-6 text-sm font-medium" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
              <Braces size={16} /> Structured JSON (Output)
            </div>
            <pre className="text-xs font-mono p-4 rounded-xl bg-[#111111] border overflow-x-auto flex-1" style={{ borderColor: 'rgba(255,255,255,0.04)', color: '#E1E0CC' }}>
{`{
  "clause_type": "Indemnification",
  "indemnifying_party": "Service Provider",
  "indemnified_party": ["Client", "affiliates"],
  "trigger": "third-party claim alleging intellectual property infringement",
  "liability_cap": {
    "amount": 5000000,
    "currency": "USD"
  },
  "confidence_score": 0.998
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

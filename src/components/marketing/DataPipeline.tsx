import { ArrowRight, Database, Code, FileSearch, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function DataPipeline() {
  const steps = [
    { name: 'Ingestion', desc: 'Securely upload PDFs, DOCX, or raw text.', icon: Database },
    { name: 'OCR & Parsing', desc: 'Structure messy tables and scanned documents.', icon: FileSearch },
    { name: 'Inference', desc: 'Run targeted legal prompts on our custom models.', icon: Code },
    { name: 'Structured Output', desc: 'Receive strict JSON matching your schema.', icon: CheckCircle2 }
  ];

  return (
    <section className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: '#E1E0CC' }}>
          The LexForge Data Pipeline.
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-20" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
          A deterministic, fault-tolerant pipeline that converts messy real-world contracts into clean, actionable intelligence in milliseconds.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 z-0" />
          
          {steps.map((step, i) => (
            <motion.div 
              key={step.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full md:w-64"
            >
              <div className="p-6 rounded-2xl border bg-black shadow-2xl flex flex-col items-center group hover:bg-[#111111] transition-colors" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="w-16 h-16 rounded-full bg-white/5 border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <step.icon size={24} style={{ color: '#E1E0CC' }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#E1E0CC' }}>{step.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>{step.desc}</p>
              </div>
              
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 w-8 h-8 items-center justify-center bg-[#111111] border rounded-full" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <ArrowRight size={14} style={{ color: 'rgba(225, 224, 204, 0.4)' }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

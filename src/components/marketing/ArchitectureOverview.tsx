import { Cpu, Network, Shield, Server } from 'lucide-react';
import { motion } from 'framer-motion';

export function ArchitectureOverview() {
  const steps = [
    {
      title: "Orchestration Layer",
      desc: "Routes incoming requests to the optimal model based on legal task complexity.",
      icon: Network
    },
    {
      title: "Legal Embeddings",
      desc: "Transforms contracts into dense vector representations for semantic search.",
      icon: Cpu
    },
    {
      title: "Secure Inference",
      desc: "Zero-retention inference nodes process data within SOC2-compliant VPCs.",
      icon: Shield
    },
    {
      title: "Dedicated Clusters",
      desc: "Enterprise customers receive isolated compute resources for lowest latency.",
      icon: Server
    }
  ];

  return (
    <section className="py-24 bg-[#111111] border-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: '#E1E0CC' }}>
            Built for Scale and Security.
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
            The LexForge architecture is designed from the ground up to handle millions of complex legal documents with zero data retention and strict isolation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div 
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl border bg-black relative overflow-hidden group"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <step.icon size={64} style={{ color: '#E1E0CC' }} />
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10">
                <step.icon size={20} style={{ color: '#E1E0CC' }} />
              </div>
              <h3 className="text-lg font-bold mb-2 relative z-10" style={{ color: '#E1E0CC' }}>{step.title}</h3>
              <p className="text-sm leading-relaxed relative z-10" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

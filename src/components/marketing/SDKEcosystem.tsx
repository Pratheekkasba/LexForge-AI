import { Package, Terminal, FileCode2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function SDKEcosystem() {
  const sdks = [
    { name: 'Node.js', command: 'npm install @lexforge/sdk', icon: Package },
    { name: 'Python', command: 'pip install lexforge', icon: Terminal },
    { name: 'Go', command: 'go get github.com/lexforge/go-sdk', icon: FileCode2 },
  ];

  return (
    <section className="py-24 bg-[#111111] border-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: '#E1E0CC' }}>
            Native SDKs for your stack.
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
            Fully typed, officially supported SDKs with built-in retry logic, pagination, and error handling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sdks.map((sdk, i) => (
            <motion.div 
              key={sdk.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border bg-black flex flex-col"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <sdk.icon size={24} style={{ color: '#E1E0CC' }} />
                <h3 className="font-bold text-lg" style={{ color: '#E1E0CC' }}>{sdk.name}</h3>
              </div>
              <div className="mt-auto bg-[#111111] p-3 rounded-lg border font-mono text-sm flex justify-between items-center" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                <span style={{ color: 'rgba(225, 224, 204, 0.8)' }}>{sdk.command}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

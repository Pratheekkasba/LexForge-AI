import { motion } from 'framer-motion';

export function TrustedBy() {
  const companies = [
    'AZB & Partners', 'Cyril Amarchand Mangaldas', 'Shardul Amarchand Mangaldas', 'Khaitan & Co', 'JSA Advocates', 'Trilegal', 'Nishith Desai Associates', 'S&R Associates'
  ];

  return (
    <section className="py-24 border-y overflow-hidden relative" style={{ borderColor: 'rgba(255,255,255,0.04)', background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>
          Trusted by India's leading law firms and legal teams
        </p>
      </div>
      
      <div className="relative flex whitespace-nowrap">
        <div className="absolute top-0 bottom-0 left-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent" />
        
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
          className="flex items-center gap-16 px-8"
        >
          {[...companies, ...companies, ...companies].map((company, i) => (
            <div key={i} className="flex items-center justify-center grayscale opacity-40 hover:opacity-100 transition-opacity duration-300">
              <span className="text-xl font-bold tracking-tighter" style={{ color: '#E1E0CC' }}>{company}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

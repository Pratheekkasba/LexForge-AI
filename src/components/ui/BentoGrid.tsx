import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 ${className}`}>
      {children}
    </div>
  );
}

interface BentoCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  delay?: number;
}

export function BentoCard({ title, description, icon, children, className = '', delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative p-8 rounded-2xl border bg-[#111111] overflow-hidden group hover:bg-[#181818] transition-colors duration-500 ${className}`}
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="relative z-10 flex flex-col h-full">
        {icon && (
          <div className="mb-6 w-12 h-12 rounded-xl flex items-center justify-center border bg-white/5 transition-transform duration-500 group-hover:scale-110" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            {icon}
          </div>
        )}
        
        <h3 className="text-xl font-semibold mb-3" style={{ color: '#E1E0CC' }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(225, 224, 204, 0.5)' }}>{description}</p>
        
        {children && (
          <div className="mt-8 flex-1 flex flex-col justify-end">
            {children}
          </div>
        )}
      </div>
      
      {/* Subtle hover glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle at 50% 0%, rgba(225, 224, 204, 0.03) 0%, transparent 60%)' 
        }}
      />
    </motion.div>
  );
}
